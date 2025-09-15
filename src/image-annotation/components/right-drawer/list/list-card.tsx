import { formatDistanceToNow } from 'date-fns';
import { ImageAnnotation } from '@annotorious/react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getAvatarColor } from '@/utils';
import { MessagesSquare, Shapes } from 'lucide-react';
import { useMemo } from 'react';

const CLASSES = [
  undefined,
  'MyConcept',
  'AnotherConcept',
  'SomeConcept'
];

const COLORS = [
  undefined,
  'bg-fuchsia-500',
  'bg-amber-500',
  'bg-emerald-500'
]

interface ListCardProps {

  annotation: ImageAnnotation;

  emphasize: boolean;

  deemphasize: boolean;

}

export const ListCard = (props: ListCardProps) => {

  const clazz = useMemo(() => CLASSES[Math.floor(Math.random() * 4)], []);

  const timestamp =
    formatDistanceToNow(props.annotation.target.created, { addSuffix: true });

  const messages = useMemo(() => Math.floor(Math.random() * 4), []);

  return (
    <Card className={cn(
      'p-1 mt-4 rounded',
      props.deemphasize && 'opacity-25',
      props.emphasize && 'ring-4 ring-offset-0 ring-blue-500/35'
    )}>
      <CardContent className="p-2 leading-relaxed relative">
        <div className="flex text-xs">
          {clazz ? (
            <div className={cn(
              'text-white py-1 px-2 rounded mb-2',
              clazz ? COLORS[CLASSES.indexOf(clazz)] : undefined
            )}>
              {clazz}
            </div>
          ) : (
            <div className="border flex gap-1 py-1 px-2 bg-muted border-muted-foreground/30 text-muted-foreground/70 rounded">
              <Shapes className="size-3.5" /> No class
            </div>
          )}
        </div>

        <div className="relative">
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

          {messages > 0 && (
            <div className="absolute -bottom-1.5 right-0.5 flex text-muted-foreground hover:text-primary cursor-pointer gap-1 text-xs items-center font-medium mb-2">
              <MessagesSquare className="size-3.5" /> {messages}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}