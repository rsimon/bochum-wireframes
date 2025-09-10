import { Redo2, RotateCcwSquare, RotateCwSquare, Undo2, ZoomIn, ZoomOut } from 'lucide-react';
import { useViewer } from '@annotorious/react';
import { Button } from '@/components/ui/button';

export const Toolbar = () => {

  const viewer = useViewer();

  const onZoom = (factor: number) => viewer.viewport.zoomBy(factor);

  // @ts-ignore
  const onRotate = (inc: number) => viewer.viewport.rotateBy(inc);

  return viewer ? (
    <div className="whitespace-nowrap">
      <Button
        variant="ghost"
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