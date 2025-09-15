import { PrivacySelector } from "@/components/privacy-selector"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ClipboardCopy, EllipsisVertical, GitCompareArrows, Minus, Plus, RotateCcwSquare, RotateCwSquare, ZoomIn, ZoomOut } from "lucide-react"

export const MoreTools = () => {

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
            <Button variant="ghost">
              <GitCompareArrows />
            </Button>
          </TooltipTrigger>
          
          <TooltipContent>
            <span className="flex gap-1 flex-nowrap">
              <span className="mr-1">Create relation</span>
              <span className="bg-muted/80 text-black size-4 rounded flex items-center justify-center relative z-50">
                R
              </span>
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