import ErrorBoundary from './ErrorBoundary';
import MapExplorer, { type MapExplorerProps } from './MapExplorer';

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
