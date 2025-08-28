import { TextAnnotationPopup } from '@recogito/react-text-annotator';

interface InlineToolbarProps {

}

export const InlineToolbar = (props: InlineToolbarProps) => {

  return (
    <TextAnnotationPopup
      popup={
        props => (
          <div className="bg-white p-2 border shadow-xl rounded-md">
            Hello World
          </div>
        )
      } />
  )

}