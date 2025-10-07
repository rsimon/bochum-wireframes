import { GitCompareArrows } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ArrowsToolProps {

  enabled: boolean;

  onSetEnabled(enabled: boolean): void;

}

export const ArrowsTool = (props: ArrowsToolProps) => {

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <Toggle 
            pressed={props.enabled}
            onPressedChange={props.onSetEnabled}>
            <GitCompareArrows />
          </Toggle>
        </div>
      </TooltipTrigger>

      <TooltipContent>
        <span className="flex gap-1 flex-nowrap">
          <span className="mr-1">Draw Arrows</span>
          <span className="bg-muted/80 text-black size-4 rounded flex items-center justify-center relative z-50">
            A
          </span>
        </span>
      </TooltipContent>
    </Tooltip>
  )

}