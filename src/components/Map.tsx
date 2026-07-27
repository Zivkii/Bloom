'use client';

import dynamic from 'next/dynamic';
import ErrorBoundary from './ErrorBoundary';
import type { MapExplorerProps } from './MapExplorer';

// MapLibre är webbläsar-/WebGL-beroende → ladda enbart på klienten (ingen SSR).
const MapExplorer = dynamic(() => import('./MapExplorer'), {
  ssr: false,
  loading: () => (
    <div className="mapstage map-fallback">
      <div>
        <strong>Laddar karta…</strong>
      </div>
    </div>
  ),
});

/** MapExplorer inbäddad i en felgräns — kartfel blankar aldrig hela sidan. */
export default function Map(props: MapExplorerProps) {
  return (
    <ErrorBoundary
      fallback={
        <div className="mapstage map-fallback">
          <div>
            <strong>Kartan kunde inte laddas</strong>
            <p>Din webbläsare stöder tyvärr inte kartan just nu. Du kan ändå utforska verksamheterna i listan.</p>
          </div>
        </div>
      }
    >
      <MapExplorer {...props} />
    </ErrorBoundary>
  );
}
