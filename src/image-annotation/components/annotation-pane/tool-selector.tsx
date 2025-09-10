import { Circle, MousePointer2, ScissorsLineDashed, Square, Tangent, TriangleRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';

interface ToolSelectorProps {

  drawingEnabled?: boolean;

}

export const ToolSelector = (props: ToolSelectorProps) => {

  return (
    <div className="flex gap-2">
      <Toggle className="text-xs h-9 pr-3 gap-1.5">
        <MousePointer2 className="size-4" /> Move
      </Toggle>

      <Select
        defaultValue="rectangle">
        <div 
          role="button"
          data-state={props.drawingEnabled ? 'active' : undefined}
          aria-selected={props.drawingEnabled}
          className="flex border h-9 text-xs rounded-md cursor-pointer">
          
          <button 
            className="pl-2.5 w-20 font-medium hover:bg-muted pr-[5px] rounded-l-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <SelectValue className="pr-0" />
          </button>
          
          <SelectTrigger 
            className="tool-dropdown-trigger rounded-l-none bg-transparent border-t-0 border-r-0 border-b-0 
              border-l-1 border-white/30 h-auto! py-1.5 pl-[1px] pr-1.5 hover:bg-slate-200 focus:outline-hidden focus:ring-0 
              focus:ring-ring focus-visible:outline-hidden shadow-none" />
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