import { useEffect, useRef } from 'react';
import CETEI from 'CETEIcean';
import { buildToC } from '../utils';

interface TEIPaneProps {

  tei: string;

  onLoad?(element: Element): void;

}

export const TEIPane = (props: TEIPaneProps) => {

  const ref = useRef<HTMLDivElement>(null);

  // const [toc, setToC] = useState<ToC | undefined>();

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

      // Apply not-annotatable
      Array.from(firstDiv.querySelectorAll('tei-orig')).forEach(el => el.setAttribute('class', 'not-annotatable'));

      // Build ToC
      // const toc = buildToC(firstDiv);
      // setToC(toc);

      if (props.onLoad)
        props.onLoad(ref.current);
    });
  }, [props.tei]);

  return (
    <div ref={ref} />
  )

}