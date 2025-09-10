import { Replace, ReplaceAll } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const SpanTools = () => {

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
          <Button 
            variant="ghost"
            size="icon">
            <ReplaceAll className="size-4" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>Add span</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )

}