import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getAnnotationType, getAvatarColor, getQuote, renderMetaphorQuote } from '@/utils';
import { TEIAnnotation } from '@recogito/react-text-annotator';

interface ListCardProps {

  annotation: TEIAnnotation;

  linked: TEIAnnotation[];

  hasPresence?: boolean;

}

export const ListCard = (props: ListCardProps) => {

  const type = getAnnotationType(props.annotation);

  const renderQuote = () => {
    const segments = renderMetaphorQuote(props.annotation, props.linked);
    return (
      <div>
        {segments.map(([quote, type]) => (
          <span className={
            type === 'mrw' ? 'bg-green-600/50' : ''
          }>{quote}</span>
        ))}
      </div>
    )
  }

  const timestamp =
    formatDistanceToNow(props.annotation.target.created, { addSuffix: true });

  return (
    <Card className={cn(
      'p-1 mt-4 rounded',
      type === 'metaphor' ? 'border-b-black border-b-2' : 'bg-green-600/15 border-green-600/30 opacity-50'
    )}>
      <CardContent className="p-2 leading-relaxed relative">
        {props.hasPresence && (
          <div className="absolute -top-3.5 left-2 drop-shadow-xs drop-shadow-black/50 flex -space-x-0.5 *:data-[slot=avatar]:ring *:data-[slot=avatar]:ring-background">
            <Avatar className="size-5">
              <AvatarFallback
                className="text-white font-medium text-[9px]"
                style={{ backgroundColor: getAvatarColor('lorinjameson') }}>
                LJ
              </AvatarFallback>
            </Avatar>

            <Avatar className="size-5">
              <AvatarFallback
                className="text-white font-medium text-[9px]"
                style={{ backgroundColor: getAvatarColor('jamiefolsom') }}>
                JF
              </AvatarFallback>
            </Avatar>
          </div>
        )}

        <div className="font-serif italic">{renderQuote()}</div>
        {props.linked.length > 0 && (
          <div className="space-y-0.5 mt-2">
            {props.linked.map(a => (
              <div className="flex gap-2 items-center font-serif italic text-muted-foreground">
                <div className="size-4 bg-green-600/25 rounded" /> {getQuote(a)}
              </div>
            ))}
          </div>
        )}
        <div className="mt-3 flex gap-1.5 text-xs items-center">
          <Avatar className="size-5">
            <AvatarFallback
              className="text-white font-medium text-[9px]"
              style={{ backgroundColor: getAvatarColor('rainersimon') }}>
              RS
            </AvatarFallback>
          </Avatar>

          <span className="font-medium">Rainer</span><span className="text-muted-foreground"> · {timestamp}</span>
        </div>
      </CardContent>
    </Card>
  )

}