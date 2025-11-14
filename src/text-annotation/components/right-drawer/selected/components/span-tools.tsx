import { Replace, ReplaceAll } from 'lucide-react';
import { AnnotatingMode } from '@recogito/react-text-annotator';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SpanToolsProps {

  mode: AnnotatingMode;

  onChangeMode(mode: AnnotatingMode): void;

}

export const SpanTools = (props: SpanToolsProps) => {

  return (
    <div className="flex">
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Toggle 
              pressed={props.mode === 'REPLACE_CURRENT'}
              onPressedChange={pressed => props.onChangeMode(pressed ? 'REPLACE_CURRENT' : 'CREATE_NEW')}>
              <Replace className="size-4" />
            </Toggle>
          </div>
        </TooltipTrigger>

        <TooltipContent>
          <p>Re-select & replace span</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Toggle
              pressed={props.mode === 'ADD_TO_CURRENT'}
              onPressedChange={pressed => props.onChangeMode(pressed ? 'ADD_TO_CURRENT' : 'CREATE_NEW')}>
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