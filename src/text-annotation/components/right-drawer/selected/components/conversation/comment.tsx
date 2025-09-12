import { useState } from 'react';

interface CommentProps {

  children: string;

}

const CHAR_LIMIT = 140;

export const Comment = (props: CommentProps) => {

  const [isExpanded, setIsExpanded] = useState(false);
    
  const shouldTruncate = props.children.length > CHAR_LIMIT;

  const truncatedText = props.children.slice(0, CHAR_LIMIT);

  return (
    <div className="p-0.5">
      <div className="relative">
        <p className="font-light pt-2 pb-1 leading-relaxed">
          {isExpanded ? props.children : (shouldTruncate ? `${truncatedText}...` : props.children)}
        </p>
        
        {!isExpanded && shouldTruncate && (
          <div className="absolute bottom-2 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-white pointer-events-none" />
        )}
      </div>
      
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="hover:underline text-xs font-medium transition-colors duration-200 cursor-pointer">
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  )

}