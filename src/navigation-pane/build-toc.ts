import { TableOfContents, TableOfContentsNode } from '../types';

export const buildTableOfContents = (div: Element) => {
  const walkChildren = (parent: Element): TableOfContentsNode[] => {
    const childSections = Array.from(parent.children).filter(e => 
      e.nodeName.toLowerCase() === 'tei-div' && e.getAttribute('type'));

    return childSections.map(teiDiv => ({
      label: `${teiDiv.getAttribute('type')} ${teiDiv.getAttribute('n') || ''}`.trim(),
      element: teiDiv,
      childNodes: walkChildren(teiDiv)
    } as TableOfContentsNode));
  }

  return { 
    root: {
      label: `${div.getAttribute('type')} ${div.getAttribute('n') || ''}`.trim(),
      element: div, 
      childNodes: walkChildren(div)
    } as TableOfContentsNode
  } as TableOfContents;

}