import { useEffect, useState } from 'react';
import { TableOfContents } from '@/types';
import { ToCLevel } from './toc-level';
import { buildTableOfContents } from './build-toc';

interface ToCProps {

  tei?: Element;

}

export const ToC = (props: ToCProps) => {

  const [toc, setToC] = useState<TableOfContents | undefined>();

  useEffect(() => {
    if (!props.tei) return;
    setToC(buildTableOfContents(props.tei));
  }, [props.tei]);

  return toc ? (
    <div className="leading-relaxed">
      <h3 className="pl-2 font-semibold capitalize mb-2">{toc.root.label}</h3>
      <ToCLevel nodes={toc.root.childNodes} />
    </div>
  ) : null;

}