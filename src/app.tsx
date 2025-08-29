import { useEffect, useState } from 'react';
import CETEI from 'CETEIcean';
import { TEIAnnotator } from '@recogito/react-text-annotator';
import { LeftDrawer } from '@/components/left-drawer';
import { RightDrawer } from '@/components/right-drawer';
import { AnnotationPane, AnnotationStyle } from '@/components/annotation-pane';
import { MockStorage } from './mock-storage';

interface AppProps {

  url: string;

  isRTL?: boolean;

}

export const App = (props: AppProps) => {

  const [tei, setTEI] = useState<Element | undefined>();

  const [leftDrawerOpen, setLeftDrawerOpen] = useState(true);

  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

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

  const onFocusRightDrawer = () => {
    // TODO
    setRightDrawerOpen(true);
  }

  return (
    <div className="flex h-screen bg-background">
      <LeftDrawer
        open={leftDrawerOpen} 
        onOpenChange={setLeftDrawerOpen} />

      <TEIAnnotator
        style={AnnotationStyle}>
        <AnnotationPane
          tei={tei}
          leftDrawerOpen={leftDrawerOpen}
          setLeftDrawerOpen={setLeftDrawerOpen}
          rightDrawerOpen={rightDrawerOpen}
          setRightDrawerOpen={setRightDrawerOpen} 
          onFocusRightDrawer={onFocusRightDrawer} />

        <MockStorage />
      </TEIAnnotator>

      <RightDrawer 
        open={rightDrawerOpen}
        onOpenChange={setRightDrawerOpen} />
    </div>
  )

}