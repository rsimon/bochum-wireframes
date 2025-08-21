import { ToC, ToCNode } from './types';

export const buildToC = (div: Element) => {
  const walkChildren = (parent: Element): ToCNode[] => {
    const childDivs = Array.from(parent.children).filter(e => e.nodeName.toLowerCase() === 'tei-div');
    return childDivs.map(teiDiv => ({
      label: `${teiDiv.getAttribute('type')} ${teiDiv.getAttribute('n')}`,
      element: teiDiv,
      childNodes: walkChildren(teiDiv)
    } as ToCNode));
  }

  return { 
    root: {
      label: `${div.getAttribute('type')} ${div.getAttribute('n')}`,
      element: div, 
      childNodes: walkChildren(div)
    } as ToCNode
  } as ToC;

}