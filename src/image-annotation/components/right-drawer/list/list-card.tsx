import { formatDistanceToNow } from 'date-fns';
import { ImageAnnotation, Store, useAnnotationStore } from '@annotorious/react';
import { CozyCanvas } from 'cozy-iiif';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getAvatarColor } from '@/utils';
import { MessagesSquare, Shapes } from 'lucide-react';
import { useMemo } from 'react';
import { AnnotationSnippet } from '../../shared/annotation-snippet';
import { getCategoryColor } from '@/image-annotation/colors';

interface ListCardProps {

  annotation: ImageAnnotation;

  canvas?: CozyCanvas;

  emphasize: boolean;

  deemphasize: boolean;

}

export const ListCard = (props: ListCardProps) => {

  const store = useAnnotationStore<Store<ImageAnnotation>>();

  const category = useMemo(() => 
    props.annotation.bodies.find(b => b.purpose === 'classifying')?.value, [props.annotation]);

  const timestamp =
    formatDistanceToNow(props.annotation.target.created, { addSuffix: true });

  const messages = useMemo(() => Math.floor(Math.random() * 4), []);

  // const connections = useConnections();

  const links = useMemo(() => {
    if (!store) return [];

    const { id } = props.annotation;

    return []; /*connections.filter(c => {
      const { from, to } = c.target.selector;
      return from === id || to === id;
    });*/
  }, [store, props.annotation]) //, connections])

  return (
    <Card className={cn(
      'p-1 mt-4 rounded',
      props.deemphasize && 'opacity-25',
      props.emphasize && 'ring-4 ring-offset-0 ring-blue-500/35'
    )}>
      <CardContent className="p-2 leading-relaxed relative">
        <div className="flex text-xs">
          {category ? (
            <div className={cn(
              'text-white py-1 px-2 rounded mb-2',
              getCategoryColor(category))}>
              {category}
            </div>
          ) : (
            <div className="border flex gap-1 py-1 px-2 bg-muted border-muted-foreground/30 text-muted-foreground/70 rounded">
              <Shapes className="size-3.5" /> No class
            </div>
          )}
        </div>

        {(props.canvas && links.length > 0) && (
          <div className="mt-3 space-y-2">
            {links.map(l => (
              <div 
                key={`${l.target.selector.from}:${l.target.selector.to}`}
                className="flex justify-between items-center gap-2">
                <AnnotationSnippet 
                  annotation={l.target.selector.from} 
                  canvas={props.canvas} />

                <span className="grow border-t border-slate-400 border-dashed h-[1px]" />

                <AnnotationSnippet 
                  annotation={l.target.selector.to} 
                  canvas={props.canvas} />
              </div>
            ))}
          </div>
        )}

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