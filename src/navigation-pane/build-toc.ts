import { TableOfContents, TableOfContentsNode } from '../types';

export const buildTableOfContents = (div: Element) => {
  const walkChildren = (parent: Element): TableOfContentsNode[] => {
    const childDivs = Array.from(parent.children).filter(e => e.nodeName.toLowerCase() === 'tei-div');
    return childDivs.map(teiDiv => ({
      label: `${teiDiv.getAttribute('type')} ${teiDiv.getAttribute('n')}`,
      element: teiDiv,
      childNodes: walkChildren(teiDiv)
    } as TableOfContentsNode));
  }

  return { 
    root: {
      label: `${div.getAttribute('type')} ${div.getAttribute('n')}`,
      element: div, 
      childNodes: walkChildren(div)
    } as TableOfContentsNode
  } as TableOfContents;

}