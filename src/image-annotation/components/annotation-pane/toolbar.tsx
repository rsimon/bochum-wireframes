import { Redo2, RotateCcwSquare, RotateCwSquare, Undo2, ZoomIn, ZoomOut } from 'lucide-react';
import { useViewer } from '@annotorious/react';
import { Button } from '@/components/ui/button';
import { ToolSelector } from './tool-selector';
import { useState } from 'react';
import { Tool } from '@/image-annotation/types';

export const Toolbar = () => {

  const viewer = useViewer();

  const [drawingEnabled, setDrawingEnabled] = useState(false);

  const [tool, setTool] = useState<Tool>('rectangle');

  const onZoom = (factor: number) => viewer.viewport.zoomBy(factor);

  // @ts-ignore
  const onRotate = (inc: number) => viewer.viewport.rotateBy(inc);

  return viewer ? (
    <div className="flex flex-nowrap items-center">
      <ToolSelector 
        drawingEnabled={drawingEnabled} 
        tool={tool} 
        onSetDrawingEnabled={setDrawingEnabled} 
        onChangeTool={setTool} />

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