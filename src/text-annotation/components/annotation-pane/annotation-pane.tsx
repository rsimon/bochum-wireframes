import { useEffect, useMemo, useRef, useState } from 'react';
import { FolderCheck, FolderSync, PanelLeft, PanelRight, Redo2, Undo2 } from 'lucide-react';
import { AnnotoriousPlugin } from '@annotorious/react';
import { mountPlugin as LocalStoragePlugin } from '@annotorious/plugin-localstorage';
import { BroadcastChannelSync } from '@/components/broadcast-channel-sync';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { PrivacySelector } from '@/components/privacy-selector';
import { AvatarStack } from '@/components/avatar-stack';
import { MyAccount } from '@/components/my-account';
import { InlineToolbar } from './inline-toolbar';

import '@recogito/react-text-annotator/react-text-annotator.css';

interface AnnotationPaneProps {

  tei?: Element;

  saving: boolean;

  leftDrawerOpen: boolean;

  setLeftDrawerOpen(open: boolean): void;

  rightDrawerOpen: boolean;

  setRightDrawerOpen(open: boolean): void;

  onFocusRightDrawer(): void;

  onLoad?(element: Element): void;

}

export const AnnotationPane = (props: AnnotationPaneProps) => {

  const ref = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState<string | undefined>();

  const storageOpts = useMemo(() => ({ storeName: title }), [title]);

  useEffect(() => {
    if (!props.tei || !ref.current) return;

    ref.current.appendChild(props.tei);

    // Apply not-annotatable
    Array.from(props.tei.querySelectorAll('tei-orig')).forEach(el => el.setAttribute('class', 'not-annotatable'));

    const title = props.tei.getAttribute('n');
    setTitle(title ? title : 'Text Annotation Interface')

    if (props.onLoad)
      props.onLoad(ref.current);
  }, [props.tei]);

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      <div className="flex gap-4 items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Button
          variant="outline"
          size="icon"
          onClick={() => props.setLeftDrawerOpen(!props.leftDrawerOpen)}
          className={props.leftDrawerOpen ? 'opacity-50' : ''}>
          <PanelLeft className="h-4 w-4" />
        </Button>

        <div className="flex gap-1.5 items-center grow">
          <Button 
            size="sm"
            variant="secondary"
            className="h-9">
            SFB1475
          </Button>

          <span className="text-muted-foreground">/</span>

          <Button 
            size="sm"
            variant="ghost"
            className="h-9 -mx-0.5 px-1.5">
            Assignment A
          </Button>

          <span className="text-muted-foreground">/</span>

          <h1 className="text-lg font-semibold ml-1">
            {title ? title : (
              <Skeleton className="h-6 w-52" />
            )}
          </h1>

          {props.saving ? (
            <div className="text-xs flex gap-1 items-center w-20 mt-0.5">
              <FolderSync className="size-4" /> Saving
            </div>
          ) : (
            <div className="w-20">
              <FolderCheck className="size-4 mt-0.5" />
            </div>
          )}
        </div>

        <div className="flex gap-1.5 items-center">
          <AvatarStack />

          <Separator orientation="vertical" />

          <PrivacySelector />

          <div className="whitespace-nowrap">
            <Button variant="ghost">
              <Undo2 />
            </Button>

            <Button variant="ghost">
              <Redo2 />
            </Button>
          </div>
        </div>

        <MyAccount />

        <Button
          variant="outline"
          size="icon"
          onClick={() => props.setRightDrawerOpen(!props.rightDrawerOpen)}
          className={props.rightDrawerOpen ? 'opacity-50' : ''}>
          <PanelRight className="h-4 w-4" />
        </Button>
      </div>

      <main className="flex-1 p-8 overflow-auto scroll-smooth">
        <div 
          className="max-w-4xl mx-auto prose prose-lg dark:prose-invert"
          ref={ref}>
        </div>

        <InlineToolbar 
          onClickAdvanced={props.onFocusRightDrawer} />
      </main>

      {title && (
        <BroadcastChannelSync channelName={title} />
      )}

      {title && (
        <AnnotoriousPlugin
          plugin={LocalStoragePlugin} 
          opts={storageOpts} />
      )}
    </div>
  )
}