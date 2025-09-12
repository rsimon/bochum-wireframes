import { useState } from 'react';
import { RightDrawer, RightDrawerTab } from './components/right-drawer';
import { LeftDrawer } from './components/left-drawer';
import { AnnotationPane } from './components/annotation-pane';
import { MockStorage } from '@/components/mock-storage';

interface ImageAnnotationProps {

  url: string;

}

export const ImageAnnotation = (props: ImageAnnotationProps) => {

  const [leftDrawerOpen, setLeftDrawerOpen] = useState(true);

  const [rightDrawer, setRightDrawer] = useState<RightDrawerTab | undefined>();

  const [saving, setSaving] = useState(false);

  const onFocusRightDrawer = () => {
    setRightDrawer('selected');
  }

  return (
    <div className="flex h-screen bg-background">
      <LeftDrawer
        open={leftDrawerOpen} 
        onOpenChange={setLeftDrawerOpen} />

      <AnnotationPane
        iiifUrl={props.url}
        saving={saving}
        leftDrawerOpen={leftDrawerOpen}
        setLeftDrawerOpen={setLeftDrawerOpen}
        rightDrawerOpen={Boolean(rightDrawer)}
        setRightDrawerOpen={open => open ? setRightDrawer('selected') : setRightDrawer(undefined)} 
        onFocusRightDrawer={onFocusRightDrawer} />

      <RightDrawer 
        tab={rightDrawer}
        onStateChange={setRightDrawer} />

      <MockStorage
        onChangeSaveStatus={setSaving} />
    </div>
  )

}