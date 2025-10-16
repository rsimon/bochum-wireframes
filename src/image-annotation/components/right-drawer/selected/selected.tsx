import { SquareMousePointer } from 'lucide-react';
import { CozyCanvas } from 'cozy-iiif';
import { ImageAnnotation, useSelection } from '@annotorious/react';
import { ArrowAnnotation, isArrowAnnotation } from '@annotorious/plugin-arrows';
import { SelectedImageAnnotationDetails } from './selected-image-annotation';
import { SelectedArrowAnnotationDetails } from './selected-arrow-annotation';

export interface SelectedAnnotationDetailsProps<T extends ImageAnnotation | ArrowAnnotation> {

  annotation: T;

  canvas?: CozyCanvas;

}

interface SelectedProps {

  canvas?: CozyCanvas;

}

export const Selected = (props: SelectedProps) => {

  const { selected } = useSelection<ImageAnnotation>();

  return selected.length === 0 ? (
    <div className="p-4 h-full flex items-center justify-center">
      <div className="text-center text-muted-foreground">
        <SquareMousePointer 
          className="h-12 w-12 mx-auto mb-4" 
          strokeWidth={1.25} />
        <p className="text-sm">Select Annotation</p>
      </div>
    </div>
  ) : isArrowAnnotation(selected[0].annotation) ? (
    <SelectedArrowAnnotationDetails 
      annotation={selected[0].annotation} 
      canvas={props.canvas} />
  ) : (
    <SelectedImageAnnotationDetails
      annotation={selected[0].annotation} 
      canvas={props.canvas} />
  );

}