import { Circle, MousePointer2, ScissorsLineDashed, Square, Tangent, TriangleRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import { Tool } from '@/image-annotation/types';
import { cn } from '@/lib/utils';

interface ToolSelectorProps {

  drawingEnabled?: boolean;

  tool: Tool;

  onChangeTool(tool: Tool): void;

  onSetDrawingEnabled(enabled: boolean): void;

}

export const ToolSelector = (props: ToolSelectorProps) => {

  const onChangeTool = (tool: string) => {
    props.onChangeTool(tool as Tool);
    props.onSetDrawingEnabled(true);
  }

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
            <SelectValue className="pr-0" />
          </button>
          
          <SelectTrigger 
            className={cn(
              `tool-dropdown-trigger rounded-l-none bg-transparent border-t-0 border-r-0 border-b-0 
              border-l-1 border-none h-auto! py-1.5 pl-[3px] pr-1.5 hover:bg-neutral-200 focus:outline-hidden focus:ring-0 
              focus:ring-ring focus-visible:outline-hidden shadow-none cursor-pointer`,
              props.drawingEnabled && 'hover:bg-neutral-800')} />
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

          <SelectItem value="ellipse" >
            <div className="flex items-center text-xs gap-1.5">
              <Circle className="size-3.5 shrink-0" /> Ellipse
            </div>
          </SelectItem>

          <SelectItem value="path">
            <div className="flex items-center text-xs gap-1.5">
              <Tangent className="size-3.5 shrink-0" /> Path
            </div>
          </SelectItem>

          <SelectItem value="intelligent-scissors">
            <div className="flex items-center text-xs gap-1.5">
              <ScissorsLineDashed className="size-3.5 shrink-0" /> Scissors
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )

}