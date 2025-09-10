import { Circle, MousePointer2, ScissorsLineDashed, Square, Tangent, TriangleRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import { Tool } from '@/image-annotation/types';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { AnnotoriousOpenSeadragonAnnotator, useAnnotator } from '@annotorious/react';

interface ToolSelectorProps {

  drawingEnabled?: boolean;

  tool: Tool;

  onChangeTool(tool: Tool): void;

  onSetDrawingEnabled(enabled: boolean): void;

}

export const ToolSelector = (props: ToolSelectorProps) => {

  const anno = useAnnotator<AnnotoriousOpenSeadragonAnnotator>();

  const onChangeTool = (tool: string) => {
    props.onChangeTool(tool as Tool);
    props.onSetDrawingEnabled(true);
  }

  useEffect(() => {
    if (!anno) return;

    // Toolbar behavior: auto-reset after createaAnnotation 
    const onCreateAnnotation = () => props.onSetDrawingEnabled(false);

    anno.on('createAnnotation', onCreateAnnotation);

    return () => {
      anno.off('createAnnotation', onCreateAnnotation);
    }
  }, [anno, props.drawingEnabled]);

  return (
    <div className="flex gap-2">
      <Toggle 
        className="text-xs h-9 pr-3 gap-1.5 cursor-pointer"
        pressed={!props.drawingEnabled}
        onPressedChange={pressed => props.onSetDrawingEnabled(!pressed)}>
        <MousePointer2 className="size-4" /> Move
      </Toggle>

      <Select
        value={props.tool}
        onValueChange={onChangeTool}>
        <div 
          role="button"
          data-state={props.drawingEnabled ? 'active' : undefined}
          aria-selected={props.drawingEnabled}
          className={cn(
            'flex border h-9 text-xs rounded-md',
            props.drawingEnabled && 'bg-black text-white border-black'
          )}>
          
          <button 
            className={cn(
              'pl-2.5 w-20 font-medium hover:bg-muted pr-[5px] rounded-l-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer',
              props.drawingEnabled && 'hover:bg-neutral-800'
            )}
            onClick={() => props.onSetDrawingEnabled(true)}>
            <SelectValue className="pr-1" />
          </button>
          
          <SelectTrigger 
            className={cn(
              `tool-dropdown-trigger rounded-l-none bg-transparent border-t-0 border-r-0 border-b-0 
              border-l-1 border-none h-auto! py-1.5 pl-[3px] pr-1.5 hover:bg-neutral-200 focus:outline-hidden focus:ring-0 
              focus:ring-ring focus-visible:outline-hidden shadow-none cursor-pointer`,
              props.drawingEnabled && `[&_svg:not([class*='text-'])]:text-white hover:bg-neutral-800`)} />
        </div>

        <SelectContent
          align="end" 
          alignOffset={-14}
          className="tool-dropdown min-w-0">
          <SelectItem value="rectangle">
            <div className="flex items-center text-xs gap-1.5">
              <Square className="size-3.5 shrink-0" /> Box
            </div>
          </SelectItem>

          <SelectItem value="polygon">
            <div className="flex items-center text-xs gap-1.5">
              <TriangleRight className="size-3.5 shrink-0 -rotate-[10deg]" /> Polygon
            </div>
          </SelectItem>

          <SelectItem 
            value="ellipse" 
            disabled>
            <div className="flex items-center text-xs gap-1.5">
              <Circle className="size-3.5 shrink-0" /> Ellipse
            </div>
          </SelectItem>

          <SelectItem 
            value="path"
            disabled>
            <div className="flex items-center text-xs gap-1.5">
              <Tangent className="size-3.5 shrink-0" /> Path
            </div>
          </SelectItem>

          <SelectItem 
            value="intelligent-scissors"
            disabled>
            <div className="flex items-center text-xs gap-1.5">
              <ScissorsLineDashed className="size-3.5 shrink-0" /> Scissors
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )

}