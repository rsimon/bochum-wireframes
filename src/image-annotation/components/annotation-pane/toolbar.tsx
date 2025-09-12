import { useEffect, useState } from 'react';
import { Redo2, RotateCcwSquare, RotateCwSquare, Undo2, ZoomIn, ZoomOut } from 'lucide-react';
import { AnnotoriousOpenSeadragonAnnotator, useAnnotator, useViewer } from '@annotorious/react';
import { Button } from '@/components/ui/button';
import { Tool } from '@/image-annotation/types';
import { ToolSelector } from './tool-selector';
import { PrivacySelector } from './privacy-selector';

export const Toolbar = () => {

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
        <PrivacySelector />

        <ToolSelector 
          drawingEnabled={drawingEnabled} 
          tool={tool} 
          onSetDrawingEnabled={setDrawingEnabled} 
          onChangeTool={setTool} />
      </div>

      <Button
        variant="ghost"
        className="ml-1"
        onClick={() => onRotate(-90)}>
        <RotateCcwSquare />
      </Button>

      <Button
        variant="ghost"
        onClick={() => onRotate(90)}>
        <RotateCwSquare />
      </Button>
      
      <Button 
        variant="ghost"
        onClick={() => onZoom(2)}>
        <ZoomIn />
      </Button>

      <Button 
        variant="ghost"
        onClick={() => onZoom(0.5)}>
        <ZoomOut />
      </Button>

      <Button variant="ghost">
        <Undo2 />
      </Button>

      <Button variant="ghost">
        <Redo2 />
      </Button>
    </div>
  ) : null;

}