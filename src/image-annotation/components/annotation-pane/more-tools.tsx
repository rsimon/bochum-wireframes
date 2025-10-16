import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PrivacySelector } from '@/components/privacy-selector';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowsVisibility } from '@/image-annotation/types';
import { 
  ClipboardCopy, 
  EllipsisVertical, 
  Minus, 
  Plus, 
  RotateCcwSquare, 
  RotateCwSquare, 
  RouteOff, 
  ZoomIn, 
  ZoomOut 
} from 'lucide-react';

interface MoreToolsProps {

  arrowsVisibility: ArrowsVisibility;

  onSetArrowsVisibility(visibility: ArrowsVisibility): void;

}

export const MoreTools = (props: MoreToolsProps) => {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost">
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-1 flex gap-0.5 items-center w-auto">
        <PrivacySelector />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="ml-1">
              <RotateCcwSquare />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Rotate image counterclockwise
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost">
              <RotateCwSquare />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Rotate image clockwise
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost">
              <ZoomIn />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span className="flex gap-2 flex-nowrap">
              Zoom in
              <span className="bg-muted/80 text-black size-4 rounded flex items-center justify-center">
                <Plus className="size-3" />
              </span>
            </span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost">
              <ZoomOut />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span className="flex gap-2 flex-nowrap">
              Zoom out
              <span className="bg-muted/80 text-black size-4 rounded flex items-center justify-center">
                <Minus className="size-3" />
              </span>
            </span>
          </TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="mx-1" />

        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Toggle
                pressed={props.arrowsVisibility !== 'ALWAYS'}
                onPressedChange={p => props.onSetArrowsVisibility(p ? 'HOVER_OR_SELECT' : 'ALWAYS')}>
                <RouteOff />
              </Toggle>
            </div>
          </TooltipTrigger>
          
          <TooltipContent>
            <span className="flex gap-1 flex-nowrap">
              Hide relations
            </span>
          </TooltipContent>
          </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost">
              <ClipboardCopy />
            </Button>
          </TooltipTrigger>
          
          <TooltipContent>
            <span className="flex gap-1 flex-nowrap">
              <span className="mr-1">Copy annotation to clipboard</span>
              <span className="bg-muted/80 text-black size-4 rounded flex items-center justify-center relative z-50">
                ⌘
              </span>
              +
              <span className="bg-muted/80 text-black size-4 rounded flex items-center justify-center">
                C
              </span>
            </span>
          </TooltipContent>
        </Tooltip>
      </PopoverContent>
    </Popover>
  )

}