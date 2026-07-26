import { sceneSVG } from '../data/scenes';

/** Renderar en lugn illustration (inline SVG, inga externa bilder). */
export default function Illustration({ name, className }: { name: string; className?: string }) {
  return (
    <div
      className={'illus' + (className ? ' ' + className : '')}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: sceneSVG(name) }}
    />
  );
}
