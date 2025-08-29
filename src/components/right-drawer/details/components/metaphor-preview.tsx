import { getQuote } from '@/utils';
import { TEIAnnotation } from '@recogito/react-text-annotator';

interface MetaphorPreviewProps {

  annotation: TEIAnnotation;

}

export const MetaphorPreview = (props: MetaphorPreviewProps) => {

  const quote = getQuote(props.annotation);

  return (
    <div className="font-serif bg-sky-50 text-sky-800 border-sky-700/50 border-l-2 rounded-xs mt-8 mb-4 flex justify-center italic py-4 px-6 min-h-20 items-center leading-relaxed">
      {quote}
    </div>
  )

}