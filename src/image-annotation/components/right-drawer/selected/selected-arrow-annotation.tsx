import { Trash2 } from 'lucide-react';
import { useAnnotationStore } from '@annotorious/react';
import { ArrowAnnotation } from '@annotorious/plugin-arrows-react';
import { Button } from '@/components/ui/button';
import { RelationPreview } from '@/image-annotation/components/shared';
import { SelectedAnnotationDetailsProps } from './selected';

export const SelectedArrowAnnotationDetails = (props: SelectedAnnotationDetailsProps<ArrowAnnotation>) => {

  const store = useAnnotationStore();

  const onDeleteRelation = () =>
    store?.deleteAnnotation(props.annotation.id);
  
  return (
    <div className="grow bg-muted flex flex-col pt-6">
      <div className="grow px-2 pt-0">
        <RelationPreview 
          arrow={props.annotation} 
          className="bg-white" />
      </div>
        
      <div className="shrink-0 p-4">
        <Button 
          variant="destructive"
          size="lg"
          className="w-full"
          onClick={onDeleteRelation}>
          <Trash2 /> Delete Relation
        </Button>
      </div>
    </div>
  )

}