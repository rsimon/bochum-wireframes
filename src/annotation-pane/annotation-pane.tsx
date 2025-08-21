import { useEffect, useRef } from 'react';

interface AnnotationPaneProps {

  tei?: Element;

  onLoad?(element: Element): void;

}

export const AnnotationPane = (props: AnnotationPaneProps) => {

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!props.tei || !ref.current) return;

    ref.current.appendChild(props.tei);

    // Apply not-annotatable
    Array.from(props.tei.querySelectorAll('tei-orig')).forEach(el => el.setAttribute('class', 'not-annotatable'));

    if (props.onLoad)
      props.onLoad(ref.current);
  }, [props.tei]);

  return (
    <div ref={ref} />
  )

}