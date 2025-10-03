import { useEffect, useState } from 'react';
import CETEI from 'CETEIcean';
import { TEIAnnotator } from '@recogito/react-text-annotator';
import { LeftDrawer } from '@/text-annotation/components/left-drawer';
import { RightDrawer, RightDrawerTab } from '@/text-annotation/components/right-drawer';
import { AnnotationPane, useAnnotationsStyle } from '@/text-annotation/components/annotation-pane';
import { MockStorage } from '../components/mock-storage';

import './text-annotation.css';

interface TextAnnotationProps {

  url: string;

  theme?: 'ORANGE' | 'CYAN';

  isRTL?: boolean;

}

export const TextAnnotation = (props: TextAnnotationProps) => {

  const [tei, setTEI] = useState<Element | undefined>();

  const [leftDrawerOpen, setLeftDrawerOpen] = useState(true);

  const [rightDrawer, setRightDrawer] = useState<RightDrawerTab | undefined>();

  const [saving, setSaving] = useState(false);

  const style = useAnnotationsStyle(props.theme);

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
    setRightDrawer('selected');
  }

  return (
    <div className="flex h-screen bg-background">
      <LeftDrawer
        tei={tei}
        open={leftDrawerOpen} 
        onOpenChange={setLeftDrawerOpen} />

      <TEIAnnotator 
        style={style}
        mergeHighlights={{ horizontalTolerance: 24 }}>
        <AnnotationPane
          tei={tei}
          saving={saving}
          leftDrawerOpen={leftDrawerOpen}
          setLeftDrawerOpen={setLeftDrawerOpen}
          rightDrawerOpen={Boolean(rightDrawer)}
          setRightDrawerOpen={open => open ? setRightDrawer('selected') : setRightDrawer(undefined)} 
          onFocusRightDrawer={onFocusRightDrawer} />

        <MockStorage 
          onChangeSaveStatus={setSaving} />
      </TEIAnnotator>

      <RightDrawer 
        tab={rightDrawer}
        onStateChange={setRightDrawer} />
    </div>
  )

}