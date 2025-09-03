import { CodeXml, ListTree, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToC } from './toc';

interface LeftDrawerProps {

  tei?: Element;

  open: boolean;

  onOpenChange(open: boolean): void;

}

export const LeftDrawer = (props: LeftDrawerProps) => {

  return (
    <div
      className={`bg-card border-r transition-all duration-300 ${props.open ? 'w-80' : 'w-0'} overflow-hidden`}>
      <div className="w-80 h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Navigation</h3>
          <Button variant="ghost" size="icon" onClick={() => props.onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="toc" className="h-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
            <TabsTrigger value="toc" className="flex items-center gap-2">
              <ListTree className="size-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="metadata" className="flex items-center gap-2">
              <CodeXml className="size-4" /> Metadata
            </TabsTrigger>
          </TabsList>

          <TabsContent value="toc" className="mt-0 h-full">
            <ScrollArea className="h-full p-4">
              <ToC tei={props.tei} />
            </ScrollArea>
          </TabsContent>

          <TabsContent value="metadata" className="mt-0 h-full flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="text-lg font-medium">TBD</div>
              <div className="text-sm text-muted-foreground">TEI header vs. DB?</div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )

}