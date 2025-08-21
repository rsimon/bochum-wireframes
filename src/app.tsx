import { useEffect, useState } from 'react';
import CETEI from 'CETEIcean';
import { TEIAnnotator } from '@recogito/react-text-annotator';
import { AnnotationPane } from './annotation-pane';
import { NavigationPane } from './navigation-pane';
import { MockStorage } from './mock-storage';

import '@recogito/react-text-annotator/react-text-annotator.css';

interface AppProps {

  url: string;

  isRTL?: boolean;

}

export const App = (props: AppProps) => {

  const [tei, setTEI] = useState<Element | undefined>();

  useEffect(() => {
    const CETEIcean = new CETEI({ ignoreFragmentId: true });

    CETEIcean.getHTML5(props.url, (data: DocumentFragment) => {
      if (!(data.firstChild instanceof Element))
        throw new Error('Error parsing TEI');

      const firstDiv = (data.firstChild as Element).getElementsByTagName('tei-div')[0];
      if (!firstDiv)
        throw new Error('Error parsing TEI');

      setTEI(firstDiv);
    });
  }, [props.url]);

  return (
    <div className="container">
      <div className="toc">
        <NavigationPane tei={tei}  />
      </div>

      <div className="reading" dir={props.isRTL ? 'rtl': undefined}>
        <TEIAnnotator>
          <AnnotationPane tei={tei} />

          <MockStorage />
        </TEIAnnotator>
      </div>
    </div>
  )

}