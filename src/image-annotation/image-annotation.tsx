import { useEffect, useState } from 'react';
import { RightDrawer, RightDrawerTab } from './components/right-drawer';
import { LeftDrawer } from './components/left-drawer';
import { AnnotationPane } from './components/annotation-pane';
import { MockStorage } from '@/components/mock-storage';
import { useIIIF } from './hooks/use-iiif';
import { CozyCanvas } from 'cozy-iiif';

interface ImageAnnotationProps {

  url: string;

}

export const ImageAnnotation = (props: ImageAnnotationProps) => {

  const [leftDrawerOpen, setLeftDrawerOpen] = useState(true);

  const [rightDrawer, setRightDrawer] = useState<RightDrawerTab | undefined>();

  const [saving, setSaving] = useState(false);

  const manifest = useIIIF(props.url);

  const [currentCanvas, setCurrentCanvas] = useState<CozyCanvas | undefined>();

  useEffect(() => {
    if (!manifest) return;
    setCurrentCanvas(manifest.canvases[0]);
  }, [manifest]);

  const onFocusRightDrawer = () => {
    setRightDrawer('selected');
  }

  return (
    <div className="flex h-screen bg-background">
      <LeftDrawer
        manifest={manifest}
        currentCanvas={currentCanvas}
        open={leftDrawerOpen} 
        onOpenChange={setLeftDrawerOpen} 
        onSelectCanvas={setCurrentCanvas} />

      <AnnotationPane
        canvas={currentCanvas}
        saving={saving}
        leftDrawerOpen={leftDrawerOpen}
        setLeftDrawerOpen={setLeftDrawerOpen}
        rightDrawerOpen={Boolean(rightDrawer)}
        setRightDrawerOpen={open => open ? setRightDrawer('selected') : setRightDrawer(undefined)} 
        onFocusRightDrawer={onFocusRightDrawer} />

      <RightDrawer 
        canvas={currentCanvas}
        tab={rightDrawer}
        onStateChange={setRightDrawer} />

      <MockStorage
        onChangeSaveStatus={setSaving} />
    </div>
  )

}