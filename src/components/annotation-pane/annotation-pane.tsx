import { useEffect, useRef } from 'react';
import { PanelLeft, PanelRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InlineToolbar } from './inline-toolbar';

import '@recogito/react-text-annotator/react-text-annotator.css';

interface AnnotationPaneProps {

  tei?: Element;

  leftDrawerOpen: boolean;

  setLeftDrawerOpen(open: boolean): void;

  rightDrawerOpen: boolean;

  setRightDrawerOpen(open: boolean): void;

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
    <div className="flex-1 flex flex-col min-w-0">
      <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Button
          variant="outline"
          size="icon"
          onClick={() => props.setLeftDrawerOpen(!props.leftDrawerOpen)}
          className={props.leftDrawerOpen ? 'opacity-50' : ''}>
          <PanelLeft className="h-4 w-4" />
        </Button>

        <h1 className="text-lg font-semibold">Text Annotation Interface</h1>

        <Button
          variant="outline"
          size="icon"
          onClick={() => props.setRightDrawerOpen(!props.rightDrawerOpen)}
          className={props.rightDrawerOpen ? 'opacity-50' : ''}>
          <PanelRight className="h-4 w-4" />
        </Button>
      </div>

      <main className="flex-1 p-8 overflow-auto">
        <div 
          className="max-w-4xl mx-auto prose prose-lg dark:prose-invert"
          ref={ref}>
        </div>

        <InlineToolbar />
      </main>
    </div>
  )
}