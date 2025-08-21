export interface TableOfContents {

  root: TableOfContentsNode;

}

export interface TableOfContentsNode {

  label: string;

  element: Element;

  childNodes: TableOfContentsNode[];

}