import { Replace, ReplaceAll } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Toggle } from '@/components/ui/toggle';

interface SpanToolsProps {

  extendEnabled: boolean;

  onSetExtendEnabled(enabled: boolean): void;

}

export const SpanTools = (props: SpanToolsProps) => {

  return (
    <div className="flex">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost"
            size="icon">
            <Replace className="size-4" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>Re-select & replace span</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Toggle
              pressed={props.extendEnabled}
              onPressedChange={props.onSetExtendEnabled}>
              <ReplaceAll className="size-4" />
            </Toggle>
          </div>
        </TooltipTrigger>

        <TooltipContent>
          <p>Add or extend span</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )

}