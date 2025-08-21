import { useEffect, useState } from "react";
import { ToCLevel } from "./toc-level";
import { buildTableOfContents } from "./build-toc";
import { TableOfContents } from "../types";

interface NavigationPaneProps {

  tei?: Element;

}

export const NavigationPane = (props: NavigationPaneProps) => {

  const [toc, setToC] = useState<TableOfContents | undefined>();

  useEffect(() => {
    if (!props.tei) return;
    setToC(buildTableOfContents(props.tei));
  }, [props.tei]);

  return toc ? (
    <div>
      <h3>{toc.root.label}</h3>
      <ToCLevel nodes={toc.root.childNodes} />
    </div>
  ) : null;

}