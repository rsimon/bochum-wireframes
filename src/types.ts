export interface ToC {

  root: ToCNode;

}

export interface ToCNode {

  label: string;

  element: Element;

  childNodes: ToCNode[];

}