import { useMemo } from 'react';
import { AnnotationBody, createBody, useAnnotationStore } from '@annotorious/react';
import { TEIAnnotation } from '@recogito/react-text-annotator';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface WordTagsProps {

  annotation: TEIAnnotation;

}

const isMRWTypeBody = (b: AnnotationBody) =>
  b.purpose === 'classifying' && 'conformsTo' in b && b.conformsTo === 'mrw_type' && b.value;

export const WordTags = (props: WordTagsProps) => {

  const store = useAnnotationStore();

  const mrwType = useMemo(() => {
    const typeBody = props.annotation.bodies.find(isMRWTypeBody);
    return typeBody ? typeBody.value as 'direct' | 'indirect' : undefined;
  }, [props.annotation]);

  const onValueChange = (value: string) => {
    if (!store) return;

    const updated = {
      ...props.annotation,
      bodies: [
        ...props.annotation.bodies.filter(b => !isMRWTypeBody(b)),
        createBody(props.annotation, { purpose: 'classifying', conformsTo: 'mrw_type', value })
      ]
    } as TEIAnnotation;

    store.updateAnnotation(updated);
  }
  
  return (
    <div className="space-y-3 pt-4 pb-8 border-b">
      <div>
        <Label>MRW Type</Label>
      </div>
      <div className="w-full">
        <Select
          value={mrwType || ''}
          onValueChange={onValueChange}>
          <SelectTrigger 
            className="w-full bg-muted">
            <SelectValue placeholder="Select MRW type..." />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="direct">
              Direct
            </SelectItem>

            <SelectItem value="indirect">
              Indirect
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

}