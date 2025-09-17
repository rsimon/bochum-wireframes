import { useEffect, useState } from 'react';
import { ClipboardCopy, GitCompareArrows, Minus, Plus, Redo2, RotateCcwSquare, RotateCwSquare, Undo2, ZoomIn, ZoomOut } from 'lucide-react';
import { AnnotoriousOpenSeadragonAnnotator, useAnnotator, useViewer } from '@annotorious/react';
import { PrivacySelector } from '@/components/privacy-selector';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tool } from '@/image-annotation/types';
import { ToolSelector } from './tool-selector';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { MoreTools } from './more-tools';

interface ToolbarProps {

  collapsed?: boolean;

  onEnableWires(): void;

}

export const Toolbar = (props: ToolbarProps) => {

  const viewer = useViewer();

  const anno = useAnnotator<AnnotoriousOpenSeadragonAnnotator>();

  const [drawingEnabled, setDrawingEnabled] = useState(false);

  const [tool, setTool] = useState<Tool>('rectangle');

  useEffect(() => {
    if (!anno) return;
    anno.setDrawingTool(tool);
  }, [anno, tool]);

  useEffect(() => {
    if (!anno) return;
    anno.setDrawingEnabled(drawingEnabled);
  }, [drawingEnabled]);

  const onZoom = (factor: number) => viewer.viewport.zoomBy(factor);

  // @ts-ignore
  const onRotate = (inc: number) => viewer.viewport.rotateBy(inc);

  return (anno && viewer) ? (
    <div className="flex flex-nowrap items-center">
      <div className="flex gap-1.5">
        {!props.collapsed && (
          <PrivacySelector />
        )}

        <ToolSelector 
          collapsed={props.collapsed}
          drawingEnabled={drawingEnabled} 
          tool={tool} 
          onSetDrawingEnabled={setDrawingEnabled} 
          onChangeTool={setTool} />
      </div>

      {!props.collapsed && (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="ml-1"
                onClick={() => onRotate(-90)}>
                <RotateCcwSquare />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Rotate image counterclockwise
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => onRotate(90)}>
                <RotateCwSquare />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Rotate image clockwise
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost"
                onClick={() => onZoom(2)}>
                <ZoomIn />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span className="flex gap-2 flex-nowrap">
                Zoom in
                <span className="bg-muted/80 text-black size-4 rounded flex items-center justify-center">
                  <Plus className="size-3" />
                </span>
              </span>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost"
                onClick={() => onZoom(0.5)}>
                <ZoomOut />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span className="flex gap-2 flex-nowrap">
                Zoom out
                <span className="bg-muted/80 text-black size-4 rounded flex items-center justify-center">
                  <Minus className="size-3" />
                </span>
              </span>
            </TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost"
                onClick={props.onEnableWires}>
                <GitCompareArrows />
              </Button>
            </TooltipTrigger>
            
            <TooltipContent>
              <span className="flex gap-1 flex-nowrap">
                <span className="mr-1">Create relation</span>
                <span className="bg-muted/80 text-black size-4 rounded flex items-center justify-center relative z-50">
                  R
                </span>
              </span>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost"
                disabled>
                <ClipboardCopy />
              </Button>
            </TooltipTrigger>
            
            <TooltipContent>
              <span className="flex gap-1 flex-nowrap">
                <span className="mr-1">Copy annotation to clipboard</span>
                <span className="bg-muted/80 text-black size-4 rounded flex items-center justify-center relative z-50">
                  ⌘
                </span>
                +
                <span className="bg-muted/80 text-black size-4 rounded flex items-center justify-center">
                  C
                </span>
              </span>
            </TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="mx-1" />
        </>
      )}

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost">
            <Undo2 />
          </Button>
        </TooltipTrigger>
        
        <TooltipContent>
          <span className="flex gap-1 flex-nowrap">
            <span className="mr-1">Undo</span>
            <span className="bg-muted/80 text-black size-4 rounded flex items-center justify-center relative z-50">
              ⌘
            </span>
            +
            <span className="bg-muted/80 text-black size-4 rounded flex items-center justify-center">
              Z
            </span>
          </span>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost">
            <Redo2 />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <span className="flex gap-1 flex-nowrap">
            <span className="mr-1">Redo</span>
            <span className="bg-muted/80 text-black size-4 rounded flex items-center justify-center relative z-50">
              ⌘
            </span>
            +
            <span className="bg-muted/80 text-black h-4 px-1 rounded flex items-center justify-center">
              Shift
            </span>
            +
            <span className="bg-muted/80 text-black size-4 rounded flex items-center justify-center">
              Z
            </span>
          </span>
        </TooltipContent>
      </Tooltip>

      {props.collapsed && (
        <MoreTools 
          onEnableWires={props.onEnableWires} />
      )}
    </div>
  ) : null;

}