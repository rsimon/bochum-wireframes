import type { ImageAnnotation } from '@annotorious/react';
import { getCategoryColor } from '@/image-annotation/colors';
import { isArrowAnnotation } from '@annotorious/plugin-arrows-react';

export const HoverTooltip = ({ annotation }: { annotation: ImageAnnotation }) => {

  const category = annotation.bodies.find(b => b.purpose === 'classifying')?.value;

  const color = (category && !(isArrowAnnotation(annotation))) ? getCategoryColor(category) : 'bg-white';

  return category ? (
    <div className="text-xs backdrop-blur-xs p-2 relative">
      <div className={`w-full h-full absolute rounded-md top-0 left-0 ${color} opacity-35`} />
      <div className="relative">{category}</div>
    </div>
  ) : null;

}