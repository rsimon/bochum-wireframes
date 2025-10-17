import { useMemo } from 'react';
import { X } from 'lucide-react';
import { createBody, ImageAnnotation, useAnnotationStore } from '@annotorious/react';
import { AddProperty } from './add-property';
import { Button } from '@/components/ui/button';

interface ImageAnnotationPropertiesProps {

  annotation: ImageAnnotation;

}

export const ImageAnnotationProperties = (props: ImageAnnotationPropertiesProps) => {

  const store = useAnnotationStore();

  const properties = useMemo(() => 
    props.annotation.bodies.filter(b => b.purpose === 'tagging' && b.value), [props.annotation]);

  const onAddProperty = (value: string) =>
    store.addBody(createBody(props.annotation, {
      purpose: 'tagging',
      value
    }));
  
  return (
    <div className="mb-4">
      {properties.length > 0 && (
        <ul className="space-x-2">
          {properties.map(body => (
            <li 
              key={body.id}
              className="text-sm border rounded-full inline-flex gap-2 px-2.5 py-1.5 bg-muted text-muted-foreground items-center">
              {body.value} 
              <Button
                variant="ghost"
                size="icon"
                className="h-auto w-auto"
                onClick={() => store.deleteBody(body)}>
                <X className="size-3.5" />
              </Button>
            </li>
          ))}
        </ul>
      )}

      <div className="text-muted-foreground flex justify-end">
        <AddProperty 
          onAddProperty={onAddProperty} />
      </div>
    </div>
  )

}