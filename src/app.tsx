import { useEffect, useState } from 'react';
import CETEI from 'CETEIcean';
import { HighlightStyle, TEIAnnotation, TEIAnnotator } from '@recogito/react-text-annotator';
import { AnnotationPane } from './annotation-pane';
import { NavigationPane } from './navigation-pane';
import { MockStorage } from './mock-storage';

import '@recogito/react-text-annotator/react-text-annotator.css';
import { AnnotationState } from '@annotorious/react';

interface AppProps {

  url: string;

  isRTL?: boolean;

}

const getQuote = (annotation: TEIAnnotation) =>
  annotation.target.selector.map(s => s.quote).join(' ');

const style = (annotation: TEIAnnotation, _: AnnotationState, zIndex?: number): HighlightStyle => 
  getQuote(annotation).includes(' ') 
  ? {
    fillOpacity: 0,
    underlineColor: '#1a1a1a',
    underlineThickness: 1.5,
    underlineOffset: 1 + 2.5 * (zIndex || 1)
  } : {
    fill: '#00ff00',
    fillOpacity: 0.5
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
        <TEIAnnotator
          style={style}>
          <AnnotationPane tei={tei} />

          <MockStorage />
        </TEIAnnotator>
      </div>
    </div>
  )

}