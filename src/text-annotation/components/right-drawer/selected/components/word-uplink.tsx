import { useAnnotator } from '@annotorious/react';
import { TEIAnnotation } from '@recogito/react-text-annotator';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLinkedMetaphors } from '@/text-annotation/hooks';
import { getQuote } from '@/text-annotation/utils';

interface WordUplinkProps {

  annotation: TEIAnnotation;

}

export const WordUplink = (props: WordUplinkProps) => {

  const anno = useAnnotator();

  const { isLinkedBy } = useLinkedMetaphors();

  const uplinks = isLinkedBy(props.annotation);

  const onSelectUplink = (annotation: TEIAnnotation) => {
    if (!anno) return;
    anno.setSelected(annotation.id);
  }

  return (
    <div>
      {uplinks.map(annotation => (
        <div
          key={annotation.id}
          className="pb-2 border-b mb-4">
          <Button 
            variant="link"
            className="h-auto w-full text-sm font-light text-muted-foreground flex gap-1 px-0! items-center"
            onClick={() => onSelectUplink(annotation)}>
            <Pencil className="size-3" /> 
            <div className="whitespace-nowrap overflow-hidden">
              <div className="truncate">
                {getQuote(annotation)}
              </div>
            </div>
          </Button>
        </div>
      ))}
    </div>
  )

}