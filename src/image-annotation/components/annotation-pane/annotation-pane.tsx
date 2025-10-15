import { useEffect, useMemo, useState } from 'react';
import { FolderCheck, FolderSync, PanelLeft, PanelRight } from 'lucide-react';
import OpenSeadragon from 'openseadragon';
import { CozyCanvas, DynamicImageServiceResource } from 'cozy-iiif';
import { ArrowsPluginMode, OSDArrowsPlugin } from '@annotorious/plugin-arrows-react';
import { mountPlugin as ToolsPlugin } from '@annotorious/plugin-tools';
import { mountPlugin as MagneticOutlinePlugin } from '@annotorious/plugin-magnetic-outline';
import { BroadcastChannelSync } from '@/components/broadcast-channel-sync';
import { Button } from '@/components/ui/button';
import { MyAccount } from '@/components/my-account';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { AvatarStack } from '@/components/avatar-stack';
import { Toolbar } from './toolbar';
import { LinkToolbar } from './link-toolbar';
import { ShapeToolbar } from './shape-toolbar';
import { WiresVisibility } from '@annotorious/plugin-wires-react';
import { LinkLabel } from './link-label';
import { useInfoJson } from './use-info-json';
import { 
  OSDWirePopup, 
  OSDWiresPlugin 
} from '@annotorious/plugin-wires-react';
import { 
  AnnotoriousOpenSeadragonAnnotator, 
  AnnotoriousPlugin, 
  OpenSeadragonAnnotationPopup,
  OpenSeadragonAnnotator, 
  OpenSeadragonHoverTooltip, 
  OpenSeadragonViewer, 
  useAnnotator 
} from '@annotorious/react';

import '@annotorious/react/annotorious-react.css';
import '@annotorious/plugin-arrows-react/annotorious-arrows.css';
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

const OSD_BASE_OPTIONS = {
  crossOriginPolicy: 'Anonymous',
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
  visibilityRatio: 0.2
} as OpenSeadragon.Options;

export const AnnotationPane = (props: AnnotationPaneProps) => {
  
  const anno = useAnnotator<AnnotoriousOpenSeadragonAnnotator>();

  const [title, setTitle] = useState<string | undefined>();

  const [arrowsEnabled, setArrowsEnabled] = useState(false);

  const [arrowsMode, setArrowsMode] = useState<ArrowsPluginMode>('select');

  const [wiresEnabled, setWiresEnabled] = useState(false);

  const [wiresVisibility, setWiresVisibility] = useState<WiresVisibility>('ALWAYS');

  // Patches broken HeidICON info.json (points to HTTTP images)
  const tileSources = useInfoJson((props.canvas?.images[0] as DynamicImageServiceResource)?.serviceUrl);

  useEffect(() => {    
    if (!anno) return;

    const onCreateAnnotation = () => setWiresEnabled(false);
    anno.on('createAnnotation', onCreateAnnotation);

    return () => {
      anno.off('createAnnotation', onCreateAnnotation);
    }
  }, [anno]);

  const options = useMemo(() => tileSources ? ({
    ...OSD_BASE_OPTIONS,
    tileSources: [tileSources]
  } as OpenSeadragon.Options) : OSD_BASE_OPTIONS, [tileSources]);

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
              arrowsEnabled={arrowsEnabled}
              arrowsMode={arrowsMode}
              collapsed={props.rightDrawerOpen || props.leftDrawerOpen} 
              onSetArrowsEnabled={setArrowsEnabled}
              onSetArrowsMode={setArrowsMode}
              wiresVisibility={wiresVisibility}
              onSetWiresVisibility={setWiresVisibility} />
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

          <OpenSeadragonHoverTooltip 
            tooltip={() => (
              <div className="text-xs bg-white/15 backdrop-blur-xs p-2 rounded">
                MyConcept
              </div>
            )}/>

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

          <OSDArrowsPlugin 
            enabled={true} 
            mode={arrowsMode} />

          <OSDWiresPlugin 
            enabled={wiresEnabled}
            showWires={wiresVisibility}
            label={LinkLabel}>
            <OSDWirePopup
              arrow
              popup={popupProps => (
                <LinkToolbar {...popupProps} />
              )} />
          </OSDWiresPlugin>
          
          {title && (
            <BroadcastChannelSync channelName={title} />
          )}
        </main>
      </OpenSeadragonAnnotator>
    </div>
  )

}