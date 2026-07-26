import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as maplibregl from 'maplibre-gl';
import { MAP_STYLES, STOCKHOLM_CENTER, type MapMode } from '../lib/map';
import { sceneSVG } from '../data/scenes';
import type { Verksamhet } from '../data/types';

function pinSVG(n: number) {
  return (
    '<svg class="bloom-marker__svg" viewBox="0 0 36 48" aria-hidden="true">' +
    '<path class="bloom-marker__body" d="M18 47C18 47 33 29 33 16A15 15 0 1 0 3 16C3 29 18 47 18 47Z" fill="var(--brand-strong)" stroke="#fff" stroke-width="3"/>' +
    '<circle cx="18" cy="16" r="9" fill="#fff"/>' +
    '<text x="18" y="20.5" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--brand-strong)">' + n + '</text>' +
    '</svg>'
  );
}

function popupHTML(v: Verksamhet) {
  const chips = v.inriktningTaggar.slice(0, 2).map((t) => '<span class="pop2__chip">' + t + '</span>').join('');
  return (
    '<div class="pop2">' +
    '<div class="pop2__media grain">' + sceneSVG(v.scene) + '<span class="pop2__cat">Daglig verksamhet</span></div>' +
    '<div class="pop2__body">' +
    '<p class="pop2__loc"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.4"/></svg>' + v.omrade + ' · ' + v.kommun + '</p>' +
    '<h4 class="pop2__name">' + v.namn + '</h4>' +
    '<div class="pop2__chips">' + chips + '</div>' +
    '<span class="pop2__cta">Visa verksamhet <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>' +
    '</div></div>'
  );
}

export interface MapExplorerProps {
  items: Verksamhet[];
  activeSlug?: string | null;
  onMarkerClick?: (slug: string) => void;
  center?: [number, number];
  zoom?: number;
  fitToItems?: boolean;
  showStyleToggle?: boolean;
  interactive?: boolean;
  /** 'popup' = kort på klick, 'navigate' = gå till profil, 'none' = bara en prick */
  markerMode?: 'popup' | 'navigate' | 'none';
  /** false = mushjulet scrollar sidan i stället för att zooma kartan */
  scrollZoom?: boolean;
  className?: string;
}

export default function MapExplorer({
  items,
  activeSlug = null,
  onMarkerClick,
  center = STOCKHOLM_CENTER,
  zoom = 10.4,
  fitToItems = true,
  showStyleToggle = true,
  interactive = true,
  markerMode = 'none',
  scrollZoom = true,
  className,
}: MapExplorerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Record<string, { marker: maplibregl.Marker; el: HTMLButtonElement }>>({});
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const loadedRef = useRef(false);
  const [mode, setMode] = useState<MapMode>('karta');
  const navigate = useNavigate();

  // keep latest callback without re-initialising the map
  const cbRef = useRef(onMarkerClick);
  cbRef.current = onMarkerClick;

  function clearMarkers() {
    Object.values(markersRef.current).forEach(({ marker }) => marker.remove());
    markersRef.current = {};
  }

  function addMarkers() {
    const map = mapRef.current;
    if (!map) return;
    items.forEach((v, i) => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'bloom-marker';
      el.setAttribute('aria-label', `${v.namn}, ${v.omrade}`);
      el.innerHTML = '<span class="bloom-marker__pulse" aria-hidden="true"></span>' + pinSVG(i + 1);

      const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' }).setLngLat([v.lng, v.lat]);

      if (markerMode === 'popup') {
        // MapLibre sköter klick-för-att-öppna via setPopup (robust även i StrictMode)
        const popup = new maplibregl.Popup({ offset: 30, closeButton: true, maxWidth: '272px', className: 'bloompop', focusAfterOpen: false })
          .setHTML(popupHTML(v));
        popup.on('open', () => {
          cbRef.current?.(v.slug);
          map.easeTo({ center: [v.lng, v.lat], offset: [0, 70], duration: 400 });
          const card = popup.getElement()?.querySelector<HTMLElement>('.pop2');
          if (card) { card.style.cursor = 'pointer'; card.onclick = () => navigate('/verksamhet/' + v.slug); }
        });
        marker.setPopup(popup);
      } else if (markerMode === 'navigate') {
        el.addEventListener('click', () => navigate('/verksamhet/' + v.slug));
      } else {
        el.style.cursor = 'default';
      }

      marker.addTo(map);
      markersRef.current[v.slug] = { marker, el };
    });
  }

  function openPopupForSlug(slug: string) {
    const entry = markersRef.current[slug];
    if (entry && !entry.marker.getPopup()?.isOpen()) entry.marker.togglePopup();
  }

  function fit() {
    const map = mapRef.current;
    if (!map || items.length === 0) return;
    if (items.length === 1) {
      map.easeTo({ center: [items[0].lng, items[0].lat], zoom: 13.5, duration: 600 });
      return;
    }
    const bounds = new maplibregl.LngLatBounds();
    items.forEach((v) => bounds.extend([v.lng, v.lat]));
    map.fitBounds(bounds, { padding: 70, maxZoom: 13, duration: 600 });
  }

  // init once
  useEffect(() => {
    if (!containerRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLES.karta,
      center,
      zoom,
      interactive,
      attributionControl: { compact: true },
    });
    if (interactive) map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    if (interactive && !scrollZoom) map.scrollZoom.disable();
    mapRef.current = map;
    map.on('load', () => {
      loadedRef.current = true;
      map.resize();
      addMarkers();
      if (fitToItems) fit();
    });
    // håll kartan i takt med containerns storlek (reveal-animationer, layoutskiften)
    const ro = new ResizeObserver(() => map.resize());
    ro.observe(containerRef.current);
    return () => {
      ro.disconnect();
      popupRef.current?.remove();
      clearMarkers();
      map.remove();
      mapRef.current = null;
      loadedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // rebuild markers when items change
  useEffect(() => {
    if (!loadedRef.current) return;
    popupRef.current?.remove();
    clearMarkers();
    addMarkers();
    if (fitToItems) fit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // style toggle (DOM markers persist across setStyle)
  useEffect(() => {
    mapRef.current?.setStyle(MAP_STYLES[mode]);
  }, [mode]);

  // highlight active marker + öppna dess kort
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([slug, { el }]) => {
      el.classList.toggle('is-active', slug === activeSlug);
    });
    if (activeSlug && markerMode === 'popup') openPopupForSlug(activeSlug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlug]);

  return (
    <div className={'mapstage' + (className ? ' ' + className : '')}>
      <div className="mapcanvas" ref={containerRef} />
      {showStyleToggle && (
        <div className="mapctl" role="group" aria-label="Kartläge">
          {(['karta', 'satellit', 'hybrid'] as MapMode[]).map((m) => (
            <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)}>
              {m === 'karta' ? 'Karta' : m === 'satellit' ? 'Satellit' : 'Hybrid'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
