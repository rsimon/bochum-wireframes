import { formatDistanceToNow } from 'date-fns';
import { ImageAnnotation } from '@annotorious/react';
import { useArrows } from '@annotorious/plugin-arrows-react';
import { CozyCanvas } from 'cozy-iiif';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getAvatarColor } from '@/utils';
import { MessagesSquare } from 'lucide-react';
import { useMemo } from 'react';
import { getCategoryColor } from '@/image-annotation/colors';
import { AnnotationSnippet, RelationPreview } from '@/image-annotation/components/shared';

interface ListCardProps {

  annotation: ImageAnnotation;

  canvas?: CozyCanvas;

  emphasize: boolean;

  deemphasize: boolean;

}

export const ListCard = (props: ListCardProps) => {

  const category = useMemo(() => 
    props.annotation.bodies.find(b => b.purpose === 'classifying')?.value, [props.annotation]);

  const timestamp =
    formatDistanceToNow(props.annotation.target.created, { addSuffix: true });

  const messages = useMemo(() => Math.floor(Math.random() * 4), []);

  const arrows = useArrows(props.annotation.id);

  return (
    <Card className={cn(
      'p-1.5 mt-4 rounded-md bg-white shadow-xs',
      props.deemphasize && 'opacity-25',
      props.emphasize && 'ring-4 ring-offset-0 ring-blue-500/35'
    )}>
      <CardContent className="p-1 leading-relaxed relative">
        <div className="flex gap-1 text-xs items-stretch">
          {props.canvas && (
            <AnnotationSnippet 
              annotation={props.annotation.id} 
              canvas={props.canvas} 
              className="size-7 rounded-md shadow" />
          )}

          {category && (
            <div className={cn(
              'text-white font-medium px-2 flex items-center rounded-md',
              getCategoryColor(category))}>
              {category}
            </div>
          )}
        </div>

        {arrows.length > 0 && (
          <div className="mt-4 space-y-2">
            {arrows.map(arrow => (
              <RelationPreview
                key={arrow.id}
                arrow={arrow}
                canvas={props.canvas}
                referenceAnnotationId={props.annotation.id} />
            ))}
          </div>
        )}

        <div className="relative px-0.5 mt-4">
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