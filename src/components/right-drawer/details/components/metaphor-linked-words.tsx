import { useMemo } from 'react';
import { TEIAnnotation } from '@recogito/react-text-annotator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useIntersectingAnnotations } from '../hooks';
import { getQuote } from '@/utils';
import { CheckedState } from '@radix-ui/react-checkbox';
import { createBody, useAnnotationStore } from '@annotorious/react';

interface MetaphorLinkedWordsProps {

  annotation: TEIAnnotation;

}

export const MetaphorLinkedWords = (props: MetaphorLinkedWordsProps) => {

  const store = useAnnotationStore();

  const { getIntersecting } = useIntersectingAnnotations();

  const intersecting = useMemo(() => getIntersecting(props.annotation), [props.annotation]);

  const linked = useMemo(() => 
    props.annotation.bodies.filter(b => b.purpose === 'linking' && b.value).map(b => b.value)
  , [props.annotation])

  const setLinked = (ids: string[]) => {
    if (!store) return;

    const updated = {
      ...props.annotation,
      bodies: [
        ...props.annotation.bodies.filter(b => b.purpose !== 'linking'),
        ...ids.map(value => createBody(props.annotation, { purpose: 'linking', value }))
      ]
    } as TEIAnnotation;

    store.updateAnnotation(updated);
  }

  const onCheckedChange = (annotationId: string, checked: CheckedState) => {
    const filtered = linked.filter(id => id !== annotationId);
    const next = checked ? [...filtered, annotationId] : filtered;
    setLinked(next);
  }

  const onToggleAll = () => {
    if (linked.length === intersecting.length)
      setLinked([])
    else 
      setLinked(intersecting.map(a => a.id));
  }

  return (
    <div className="space-y-2.5 py-2 px-0.5">
      <div 
        className="flex items-center gap-3 font-light border-b pb-2">
        <Checkbox 
          checked={linked.length === 0 ? false : linked.length === intersecting.length ? true : 'indeterminate'}
          onCheckedChange={onToggleAll}
          id="all" />
        <Label htmlFor="all">All</Label>
      </div>

      {intersecting.map(annotation => (
        <div 
          key={annotation.id}
          className="flex items-center gap-3 font-serif italic overflow-hidden">
          <Checkbox 
            checked={linked.includes(annotation.id)}
            onCheckedChange={checked => onCheckedChange(annotation.id, checked)}
            id={annotation.id} />

          <Label 
            htmlFor={annotation.id}
            className="whitespace-nowrap overflow-hidden">
            <span className="truncate">{getQuote(annotation)}</span>
          </Label>
        </div>
      ))}
    </div>
  )

}