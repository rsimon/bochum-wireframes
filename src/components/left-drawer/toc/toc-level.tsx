import { TableOfContentsNode } from '@/types';

interface ToCLevelProps {

  nodes: TableOfContentsNode[];

}

export const ToCLevel = (props: ToCLevelProps) => {

  return (
    <ul>
      {props.nodes.map((node, index) => (
        <li key={node.element.getAttribute('id') || `${node.label}::${index}`}>
          {node.element.getAttribute('id') ? (
            <a href={`#${node.element.getAttribute('id')}`}>{node.label}</a>
          ) : node.label}

          {node.childNodes.length > 0 && (
            <ToCLevel nodes={node.childNodes} />
          )}
        </li>
      ))}
    </ul>
  )

}