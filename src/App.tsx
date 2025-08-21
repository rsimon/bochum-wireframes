import { useEffect, useRef, useState } from 'react';
import CETEI from 'CETEIcean';
import { buildToC } from './utils';
import { TableOfContents } from './annotation-pane';
import { ToC } from './types';

interface AppProps {

  tei: string;

}

export const App = (props: AppProps) => {

  const ref = useRef<HTMLDivElement>(null);

  const [toc, setToC] = useState<ToC | undefined>();

  useEffect(() => {
    const CETEIcean = new CETEI({ ignoreFragmentId: true });

    CETEIcean.getHTML5(props.tei, (data: DocumentFragment) => {
      if (!(data.firstChild instanceof Element))
        throw new Error('Error parsing TEI');

      if (!ref.current) 
        throw new Error('Error rendering TEI');

      const firstDiv = (data.firstChild as Element).getElementsByTagName('tei-div')[0];
      if (!firstDiv)
        throw new Error('Error parsing TEI');

      ref.current.appendChild(data);

      // Build ToC
      const toc = buildToC(firstDiv);
      setToC(toc);
    });
  }, [props.tei]);

  return (
    <div className="container">
      <div className="toc">
        {toc && (
          <TableOfContents toc={toc} />
        )}
      </div>

      <div className="reading">
        <div ref={ref} />
      </div>
    </div>
  )

}