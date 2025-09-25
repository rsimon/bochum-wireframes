import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getAnnotationType, getQuote, interleaveLinkedAnnotations } from '@/text-annotation/utils';
import { TEIAnnotation } from '@recogito/react-text-annotator';
import { getAvatarColor } from '@/utils';
import { MessagesSquare } from 'lucide-react';

interface ListCardProps {

  annotation: TEIAnnotation;

  linked: TEIAnnotation[];

  hasPresence?: boolean;

  emphasize: boolean;

  deemphasize: boolean;

}

export const ListCard = (props: ListCardProps) => {

  const type = getAnnotationType(props.annotation);

  const renderQuote = () => {
    const tokens = interleaveLinkedAnnotations(props.annotation, props.linked);
    return (
      <div className="text-sm">
        {tokens.map(({ value, type }) => (
          <span className={cn(
            type === 'word' ? 'bg-pink-200 py-0.5 px-1 rounded-xs' : ''
          )}>{value}</span>
        ))}
      </div>
    )
  }

  const timestamp =
    formatDistanceToNow(props.annotation.target.created, { addSuffix: true });

  return (
    <Card className={cn(
      'p-0.5 mt-4 rounded',
      type === 'metaphor' ? undefined : 'bg-green-600/15 border-green-600/30 opacity-50',
      props.deemphasize && 'opacity-25',
      props.emphasize && 'ring-4 ring-offset-0 ring-blue-500/35'
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

        {props.linked.length > 0 && (
          <div className="text-xs p-0.5 flex gap-2 items-center text-muted-foreground font-light mb-2">
            <div className="flex gap-1 items-center">
              <div className="size-2 bg-purple-500 rounded-full" /> God
            </div>

            <div className="flex gap-1 items-center">
              <div className="size-2 bg-emerald-500 rounded-full" /> Husbandry
            </div>
          </div>
        )}

        <div className="font-serif font-light italic p-2.5 bg-muted rounded">
          {renderQuote()}
          </div>

        <div className="relative p-0.5">
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

          <div className="absolute -bottom-1.5 right-0.5 text-muted-foreground cursor-pointer hover:text-primary flex gap-1 text-xs items-center font-medium mb-2">
            <MessagesSquare className="size-3.5" /> 2
          </div>
        </div>
      </CardContent>
    </Card>
  )

}