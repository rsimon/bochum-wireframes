import { useEffect, useMemo, useState } from 'react';
import { FolderCheck, FolderSync, PanelLeft, PanelRight } from 'lucide-react';
import OpenSeadragon from 'openseadragon';
import { CozyCanvas, DynamicImageServiceResource } from 'cozy-iiif';
import { mountPlugin as ToolsPlugin } from '@annotorious/plugin-tools';
import { mountPlugin as MagneticOutlinePlugin } from '@annotorious/plugin-magnetic-outline';
import { Button } from '@/components/ui/button';
import { MyAccount } from '@/components/my-account';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { AvatarStack } from '@/components/avatar-stack';
import { Toolbar } from './toolbar';
import { LinkToolbar } from './link-toolbar';
import { ShapeToolbar } from './shape-toolbar';
import { 
  OpenSeadragonAnnotationPopup, 
  OSDWirePopup, 
  OSDWiresPlugin 
} from '@annotorious/plugin-wires-react';
import { 
  AnnotoriousOpenSeadragonAnnotator, 
  AnnotoriousPlugin, 
  OpenSeadragonAnnotator, 
  OpenSeadragonViewer, 
  useAnnotator 
} from '@annotorious/react';

import '@annotorious/react/annotorious-react.css';
import '@annotorious/plugin-tools/annotorious-plugin-tools.css';
import '@annotorious/plugin-magnetic-outline/plugin-magnetic-polyline.css';
import '@annotorious/plugin-wires-react/annotorious-wires-react.css';

interface AnnotationPaneProps {

  canvas?: CozyCanvas;

  saving: boolean;

  leftDrawerOpen: boolean;

  setLeftDrawerOpen(open: boolean): void;

  rightDrawerOpen: boolean;

  setRightDrawerOpen(open: boolean): void;

  onFocusRightDrawer(): void;

}

export const AnnotationPane = (props: AnnotationPaneProps) => {
  
  const anno = useAnnotator<AnnotoriousOpenSeadragonAnnotator>();

  const [title, setTitle] = useState<string | undefined>();

  const [wiresEnabled, setWiresEnabled] = useState(false);

  useEffect(() => {
    if (!anno) return;

    const onCreateAnnotation = () => setWiresEnabled(false);
    anno.on('createAnnotation', onCreateAnnotation);

    return () => {
      anno.off('createAnnotation', onCreateAnnotation);
    }
  }, [anno]);

  const options = useMemo(() => props.canvas ? ({
    gestureSettingsMouse: {
      clickToZoom: false,
      dblClickToZoom: false
    },
    gestureSettingsTouch: {
      pinchRotate: true
    },
    maxZoomLevel: 100,
    minZoomLevel: 0.1,
    preserveImageSizeOnResize: true,
    showNavigationControl: false,
    showRotationControl: true,
    tileSources: (props.canvas.images[0] as DynamicImageServiceResource).serviceUrl,
    visibilityRatio: 0.2
  } as OpenSeadragon.Options) : { showNavigationControl: false }, [props.canvas]);

  useEffect(() => {
    window.setTimeout(() => setTitle('Example'), 500);
  }, []);

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      <OpenSeadragonAnnotator
        autoSave
        drawingMode="drag"
        drawingEnabled={false}>
        <div className="flex gap-4 items-center justify-between p-2.5 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Button
            variant="outline"
            size="icon"
            onClick={() => props.setLeftDrawerOpen(!props.leftDrawerOpen)}
            className={props.leftDrawerOpen ? 'opacity-50' : ''}>
            <PanelLeft className="h-4 w-4" />
          </Button>

          <div className="flex gap-1.5 items-center grow">
            <Button 
              size="sm"
              variant="secondary"
              className="h-9">
              SFB1475
            </Button>

            <span className="text-muted-foreground">/</span>

            <Button 
              size="sm"
              variant="ghost"
              className="h-9 -mx-0.5 px-1.5">
              Assignment A
            </Button>

            <span className="text-muted-foreground">/</span>

            <h1 className="text-lg font-semibold whitespace-nowrap">
              {title ? title : (
                <Skeleton className="h-6 w-52" />
              )}
            </h1>

            {props.saving ? (
              <div className="text-xs flex gap-1 items-center w-20 mt-0.5">
                <FolderSync className="size-4" /> Saving
              </div>
            ) : (
              <div className="w-20">
                <FolderCheck className="size-4 mt-0.5" />
              </div>
            )}
          </div>

          <div className="flex gap-1 items-center">
            <AvatarStack />
            <Separator orientation="vertical" className="mx-2" />
            <Toolbar 
              collapsed={props.rightDrawerOpen || props.leftDrawerOpen} 
              onEnableWires={() => setWiresEnabled(true)} />
          </div>

          <MyAccount />

          <Button
            variant="outline"
            size="icon"
            onClick={() => props.setRightDrawerOpen(!props.rightDrawerOpen)}
            className={props.rightDrawerOpen ? 'opacity-50' : ''}>
            <PanelRight className="h-4 w-4" />
          </Button>
        </div>

        <main className="relative inset-0 h-full w-full bg-muted bg-[radial-gradient(#e2e2e2_1px,transparent_1px)] [background-size:16px_16px]">
          <OpenSeadragonViewer
            options={options} 
            className="h-full w-full" />

          <AnnotoriousPlugin
            plugin={ToolsPlugin} />

          <AnnotoriousPlugin
            plugin={MagneticOutlinePlugin} />

          <OpenSeadragonAnnotationPopup
            arrow
            arrowProps={{
              fill: '#fff'
            }}
            popup={popupProps => (
              <ShapeToolbar 
                {...popupProps} 
                onClickAdvanced={props.onFocusRightDrawer} 
                onEnableWires={() => setWiresEnabled(true)} />
            )} />

          <OSDWiresPlugin 
            enabled={wiresEnabled}>
            <OSDWirePopup
              arrow
              popup={popupProps => (
                <LinkToolbar {...popupProps} />
              )} />
          </OSDWiresPlugin>
        </main>
      </OpenSeadragonAnnotator>
    </div>
  )

}