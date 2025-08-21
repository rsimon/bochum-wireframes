import type { ToC, ToCNode } from '../types';

interface ToCProps {

  toc: ToC;

}

const TocLevel = ({ nodes }: { nodes: ToCNode[]}) => {

  return (
    <ul>
      {nodes.map((node, index) => (
        <li key={node.element.getAttribute('id') || `${node.label}::${index}`}>
          {node.element.getAttribute('id') ? (
            <a href={`#${node.element.getAttribute('id')}`}>{node.label}</a>
          ) : node.label}

          {node.childNodes.length > 0 && (
            <TocLevel nodes={node.childNodes} />
          )}
        </li>
      ))}
    </ul>
  )

}

export const TableOfContents = (props: ToCProps) => {

  const { root } = props.toc;

  return (
    <div>
      <h3>{root.label}</h3>
      <TocLevel nodes={root.childNodes} />
    </div>
  )

}