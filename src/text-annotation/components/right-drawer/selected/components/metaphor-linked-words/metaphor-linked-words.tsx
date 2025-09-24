import { useMemo } from 'react';
import { Pencil } from 'lucide-react';
import { TEIAnnotation } from '@recogito/react-text-annotator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useIntersectingAnnotations } from '@/text-annotation/hooks';
import { getQuote } from '@/text-annotation/utils';
import { CheckedState } from '@radix-ui/react-checkbox';
import { createBody, useAnnotator } from '@annotorious/react';
import { Button } from '@/components/ui/button';

interface MetaphorLinkedWordsProps {

  annotation: TEIAnnotation;

  linked: string[];

}

export const MetaphorLinkedWords = (props: MetaphorLinkedWordsProps) => {

  const anno = useAnnotator();

  const { getIntersecting } = useIntersectingAnnotations();

  const intersecting = useMemo(() => getIntersecting(props.annotation), [props.annotation]);

  const setLinked = (ids: string[]) => {
    if (!anno) return;

    const updated = {
      ...props.annotation,
      bodies: [
        ...props.annotation.bodies.filter(b => b.purpose !== 'linking'),
        ...ids.map(value => createBody(props.annotation, { purpose: 'linking', value }))
      ]
    } as TEIAnnotation;

    anno.state.store.updateAnnotation(updated);
  }

  const onCheckedChange = (annotationId: string, checked: CheckedState) => {
    const filtered = props.linked.filter(id => id !== annotationId);
    const next = checked ? [...filtered, annotationId] : filtered;
    setLinked(next);
  }

  const onToggleAll = () => {
    if (props.linked.length === intersecting.length)
      setLinked([])
    else 
      setLinked(intersecting.map(a => a.id));
  }

  const onSelectWord = (annotation: TEIAnnotation) => {
    if (!anno) return; // Should never happen
    anno.setSelected(annotation.id);
  }

  return intersecting.length === 0 ? (
    <div className="py-4 text-center text-muted-foreground font-light">
      No intersecting annotations
    </div>
  ) : (
    <div className="space-y-3 py-2 px-0.5">
      <div 
        className="flex items-center gap-3 font-light border-b pb-2">
        <Checkbox 
          checked={props.linked.length === 0 ? false : props.linked.length === intersecting.length ? true : 'indeterminate'}
          onCheckedChange={onToggleAll}
          id="all" />
        <Label htmlFor="all">All</Label>
      </div>

      <div className="space-y-0.5">
        {intersecting.map(annotation => (
          <div 
            key={annotation.id}
            className="flex items-center gap-3 font-serif italic overflow-hidden">
            <Checkbox 
              checked={props.linked.includes(annotation.id)}
              onCheckedChange={checked => onCheckedChange(annotation.id, checked)}
              id={annotation.id} />

            <div className="flex items-center gap-1">
              <Label 
                htmlFor={annotation.id}
                className="whitespace-nowrap overflow-hidden">
                <span className="truncate">{getQuote(annotation)}</span>
              </Label>

              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => onSelectWord(annotation)}>
                <Pencil className="size-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

}