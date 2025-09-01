import { TableOfContentsNode } from '@/types';

interface ToCLevelProps {

  nodes: TableOfContentsNode[];

}

export const ToCLevel = (props: ToCLevelProps) => {

  return (
    <ul>
      {props.nodes.map((node, index) => (
        <li 
          key={node.element.getAttribute('id') || `${node.label}::${index}`}
          className="pl-2">
          {node.element.getAttribute('id') ? (
            <a  
              href={`#${node.element.getAttribute('id')}`}
              className="hover:underline">
              {node.label}
            </a>
          ) : node.label}

          {node.childNodes.length > 0 && (
            <ToCLevel nodes={node.childNodes} />
          )}
        </li>
      ))}
    </ul>
  )

}