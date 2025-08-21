import { useEffect, useState } from 'react';
import CETEI from 'CETEIcean';
import { TEIAnnotator } from '@recogito/react-text-annotator';
import { MockStorage } from './annotation-pane';
import { TEIPane } from './annotation-pane/TEIPane';

import '@recogito/react-text-annotator/react-text-annotator.css';
import { NavigationPane } from './navigation-pane';

interface AppProps {

  url: string;

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

      <div className="reading">
        <TEIAnnotator>
          {/*
          <TEIPane tei={props.tei} />

          <MockStorage />
          */}
        </TEIAnnotator>
      </div>
    </div>
  )

}