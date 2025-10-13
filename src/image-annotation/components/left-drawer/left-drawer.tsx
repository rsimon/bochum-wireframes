import { CodeXml, LayoutGrid, ListTree, MessagesSquare, Square, X } from 'lucide-react';
import { CozyCanvas, CozyManifest } from 'cozy-iiif';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getAvatarColor } from '@/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
        <div className="flex items-center justify-between p-2.5 border-b">
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
            <div className="h-full p-3">
              <div className="flex justify-end mb-5">
                <ToggleGroup 
                  type="single"
                  defaultValue="thumbnails"
                  className="gap-0.5">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <ToggleGroupItem
                          value="toc" 
                          className="aspect-square h-7 p-0 rounded-sm! cursor-pointer">
                          <ListTree className="size-3" />
                        </ToggleGroupItem>
                      </div>
                    </TooltipTrigger>

                    <TooltipContent>
                      Table of contents
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <ToggleGroupItem 
                          value="thumbnails" 
                          className="aspect-square h-7 rounded-sm! cursor-pointer">
                          <Square  className="size-3" />
                        </ToggleGroupItem>
                      </div>
                    </TooltipTrigger>

                    <TooltipContent>
                      Large thumbnails
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <ToggleGroupItem 
                          value="grid" 
                          className="aspect-square h-7 rounded-sm! cursor-pointer">
                          <LayoutGrid className="size-3" />
                        </ToggleGroupItem>
                      </div>
                    </TooltipTrigger>

                    <TooltipContent>
                      Small thumbnails
                    </TooltipContent>
                  </Tooltip>
                </ToggleGroup>
              </div>
              <div className="flex mx-auto justify-center">
                <div className="space-y-8 p-4">
                  {(props.manifest?.canvases || []).map((canvas, index) => (
                    <div 
                      key={canvas.id}
                      className="flex flex-col gap-3 items-center relative">
                      <button 
                        className="cursor-pointer relative"
                        onClick={() => props.onSelectCanvas(canvas)}>
                        <img
                          className={cn(
                            'aspect-square object-cover size-36 shadow-md border rounded-md',
                            canvas === props.currentCanvas ? 'ring-4 ring-offset-4 ring-muted-foreground' : undefined
                          )}
                          src={canvas.getThumbnailURL(400)} />

                        <div className="absolute right-3 bottom-2 flex items-center gap-1 text-sm text-white text-shadow-2xs whitespace-nowrap">
                          <MessagesSquare className="size-4" /> 2
                        </div>
                      </button>
                      
                      <p className="leading-relaxed text-sm">
                        {canvas.getLabel()}
                      </p>

                      {index === 1 && (
                        <Avatar className="size-6 absolute left-2 top-2 drop-shadow-sm">
                          <AvatarFallback
                            className="text-white font-medium text-[9px] border-2 border-white"
                            style={{ backgroundColor: getAvatarColor('rainersimon') }}>
                            RS
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="metadata">
            <div className="flex justify-end p-2">
              <ToggleGroup 
                type="single"
                className="gap-1"
                defaultValue="iiif">
                <ToggleGroupItem 
                  value="iiif"
                  className="tracking-wide h-7 rounded-sm! text-xs cursor-pointer px-2 flex-none">
                  IIIF
                </ToggleGroupItem>

                <ToggleGroupItem 
                  value="custom"
                  className="h-7 rounded-sm! text-xs cursor-pointer flex-none">
                  Custom Metadata
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div>
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )

}