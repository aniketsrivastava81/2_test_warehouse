import { useEffect, useRef } from 'react';

export default function LegacyHtmlBlock({ as: Tag = 'main', className = '', html, onReady, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return undefined;
    if (typeof onReady === 'function') {
      const cleanup = onReady(ref.current);
      return cleanup;
    }
    return undefined;
  }, [onReady, html]);

  return <Tag ref={ref} className={className} dangerouslySetInnerHTML={{ __html: html }} {...props} />;
}
