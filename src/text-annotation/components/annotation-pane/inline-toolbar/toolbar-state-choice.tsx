import { Ellipsis, MessagesSquare } from 'lucide-react';
import { TEIAnnotation, TextAnnotationPopupContentProps } from '@recogito/react-text-annotator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { getAvatarColor } from '@/utils';
import { getQuote } from '@/text-annotation/utils';

interface ToolbarStateChoiceProps extends TextAnnotationPopupContentProps {

  onOpenList(): void;

  onSelect(annotation: TEIAnnotation): void;

}

export const ToolbarStateChoice = (props: ToolbarStateChoiceProps) => {

  return (
    <div className="bg-white p-1.5 rounded-xl text-sm relative
      border border-[#e5e5e5] shadow-[0_4px_12px_rgba(0,0,0,0.1),0_20px_40px_rgba(0,0,0,0.06)]"
      onFocusCapture={evt => evt.stopPropagation()}>
      <div className="pl-2.5 pb-1.5 font-medium border-b flex justify-between items-center">
        {props.selected.length} Annotations

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={props.onOpenList}>
              <Ellipsis className="size-3.5" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>More</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="py-1">
        {props.selected.map(({ annotation }) => (
          <button 
            className="relative p-2 w-full hover:bg-muted rounded-md cursor-pointer flex justify-between items-center"
            onClick={() => props.onSelect(annotation as TEIAnnotation)}>
            <div className="flex gap-1.5 text-xs items-center">
              <Avatar className="size-5">
                <AvatarFallback
                  className="text-white font-medium text-[9px]"
                  style={{ backgroundColor: getAvatarColor('rainersimon') }}>
                  RS
                </AvatarFallback>
              </Avatar>

              <span className="font-medium font-serif text-sm italic max-w-48 text-muted-foreground truncate">
                {getQuote(annotation as TEIAnnotation)}
              </span>
            </div>

            <div className="text-muted-foreground/80 cursor-pointer hover:text-primary text-xs font-medium flex gap-1 items-center">
              {Math.random() > 0.7 && (<><MessagesSquare className="size-3" /> 2</>)}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}