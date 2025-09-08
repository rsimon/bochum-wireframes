import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getAnnotationType, getQuote, renderMetaphorQuote } from '@/utils';
import { TEIAnnotation } from '@recogito/react-text-annotator';

interface ListCardProps {

  annotation: TEIAnnotation;

  linked: TEIAnnotation[];

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

  return (
    <Card className={cn(
      'p-1 mb-2 rounded',
      type === 'metaphor' ? 'border-b-black border-b-2' : 'bg-green-600/15 border-green-600/30 opacity-50'
    )}>
      <CardContent className="p-2 leading-relaxed font-serif italic">
        <div>{renderQuote()}</div>
        {props.linked.length > 0 && (
          <div className="space-y-0.5 mt-2">
            {props.linked.map(a => (
              <div className="flex gap-2 items-center text-muted-foreground">
                <div className="size-4 bg-green-600/25 rounded" /> {getQuote(a)}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )

}