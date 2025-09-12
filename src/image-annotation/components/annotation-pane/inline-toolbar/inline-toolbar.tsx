import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PopupProps } from '@annotorious/react';
import { Ellipsis, MessagesSquare, Spline, Trash2 } from 'lucide-react';

export const InlineToolbar = (props: PopupProps) => {

  return (
    <div className="bg-white p-1.5 rounded-md 
      shadow-[0_4px_12px_rgba(0,0,0,0.1),0_20px_40px_rgba(0,0,0,0.06)]">

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative">
            <Spline className="size-3.5" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>Create link</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative">
            <MessagesSquare className="size-3.5" />

            <Badge 
              className="absolute z-10 top-0 -right-[1px] text-[10px] font-semibold rounded-full aspect-square p-1 bg-blue-500 pointer-none:">3</Badge>
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>Comment</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon">
            <Trash2 className="size-3.5 text-destructive" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>Delete annotation</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon">
            <Ellipsis className="size-3.5" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>More</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )

}