import { Button } from '@/components/ui/button';

export const ToolbarInitial = () => {

  return (
    <div>
      <Button 
        value="metaphor"
        variant="ghost"
        className="gap-1.5 px-2.5 rounded-sm cursor-pointer">
        <div className="text-xs h-5 flex items-center justify-center underline underline-offset-2 mb-[1px]">M</div>
        <div className="font-normal">Metaphor</div> 
      </Button>

      <Button 
        value="mrw"
        variant="ghost"
        className="gap-1.5 px-2.5 rounded-sm cursor-pointer">
        <div className="text-[10px] bg-lime-200 text-lime-700 rounded-xs size-5 flex items-center justify-center">W</div>
        <div className="font-normal">Word</div> 
      </Button>
    </div>
  )

}