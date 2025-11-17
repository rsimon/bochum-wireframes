import { formatDistanceToNow } from 'date-fns';
import { Ellipsis, MessagesSquare } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { getAvatarColor } from '@/utils';
import { 
  TEIAnnotation, 
  TextAnnotation, 
  TextAnnotationPopupContentProps
} from '@recogito/react-text-annotator';

interface ToolbarStateChoiceProps extends TextAnnotationPopupContentProps {

  onOpenList(): void;

  onSelect(annotation: TEIAnnotation): void;

}

export const ToolbarStateChoice = (props: ToolbarStateChoiceProps) => {

  const getTimestamp = (annotation: TextAnnotation) =>
      formatDistanceToNow(annotation.target.created, { addSuffix: true });

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
            className="relative p-2 w-full hover:bg-muted rounded-md cursor-pointer flex gap-8 items-center"
            onClick={() => props.onSelect(annotation as TEIAnnotation)}>
            <div className="flex gap-1.5 text-xs items-center">
              <Avatar className="size-5">
                <AvatarFallback
                  className="text-white font-medium text-[9px]"
                  style={{ backgroundColor: getAvatarColor('rainersimon') }}>
                  RS
                </AvatarFallback>
              </Avatar>

              <span className="font-medium">Rainer</span><span className="text-muted-foreground"> · {getTimestamp(annotation)}</span>
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