import { CodeXml, ListTree, Scroll, X } from 'lucide-react';
import { CozyCanvas, CozyManifest } from 'cozy-iiif';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';

interface LeftDrawerProps {

  currentCanvas?: CozyCanvas;
  
  manifest?: CozyManifest;

  open: boolean;

  onOpenChange(open: boolean): void;

  onSelectCanvas(canvas: CozyCanvas): void;

}

export const LeftDrawer = (props: LeftDrawerProps) => {

  return (
    <div
      className={`bg-card border-r transition-all duration-300 ${props.open ? 'w-68' : 'w-0'} flex flex-col overflow-hidden`}>
      <div className="w-68 min-h-full overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Document</h3>
          <Button variant="ghost" size="icon" onClick={() => props.onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="toc" className="gap-0">
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b sticky top-0 z-10">
            <TabsTrigger value="toc" className="flex items-center gap-2">
              <ListTree className="size-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="metadata" className="flex items-center gap-2">
              <CodeXml className="size-4" /> Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="toc" className="relative mt-0 grow">
            <ScrollArea className="h-full p-4">
              <div className="flex mx-auto justify-center">
                <div className="space-y-8 p-4">
                  {(props.manifest?.canvases || []).map(canvas => (
                    <button 
                      className="flex flex-col gap-3 items-center cursor-pointer"
                      onClick={() => props.onSelectCanvas(canvas)}>
                      <img
                        className={cn(
                          'aspect-square object-cover size-36 shadow-md border rounded-md',
                          canvas === props.currentCanvas ? 'ring-4 ring-offset-4 ring-muted-foreground' : undefined
                        )}
                        src={canvas.getThumbnailURL(400)} />

                      <p className="leading-relaxed text-sm">
                        {canvas.getLabel()}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="metadata">
            {props.manifest ? (
              <div className="space-y-4 p-4 text-sm leading-relaxed">
                {props.manifest.getMetadata().map(entry => (
                  <div>
                    <Label className="font-semibold">{entry.label}</Label>
                    <p className="pl-1">{entry.value}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )

}