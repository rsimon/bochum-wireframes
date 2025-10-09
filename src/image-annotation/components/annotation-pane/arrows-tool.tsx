import { GitCompareArrows } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowsPluginMode } from '@/image-annotation/types';

interface ArrowsToolProps {

  enabled: boolean;

  mode: ArrowsPluginMode;

  onSetEnabled(enabled: boolean): void;

  onSetMode(mode: 'select' | 'draw'): void;

}

export const ArrowsTool = (props: ArrowsToolProps) => {

  const onToggle = (enabled: boolean) =>
    props.onSetMode(enabled ? 'draw' : 'select');

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <Toggle 
            pressed={props.mode === 'draw'}
            onPressedChange={onToggle}>
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