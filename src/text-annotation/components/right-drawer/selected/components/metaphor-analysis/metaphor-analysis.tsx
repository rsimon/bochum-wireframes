import { Statement } from './statement';

export const MetaphorAnalysis = () => {

  return (
    <div className="space-y-2">
      <Statement 
        source="digging"
        sourceLinks={[{
          prefLabel: 'Dig',
          parentPrefLabel: 'Divide into pieces'
        }]}
        target="understand"
        targetLinks={[{
          prefLabel: 'Understand',
          parentPrefLabel: 'Think'
        }]} />

      <Statement 
        source="mountain"
        sourceLinks={[{
          prefLabel: 'Mountain',
          parentPrefLabel: 'Land'
        }]}
        target="bible"
        targetLinks={[{
          prefLabel: 'Theology',
          parentPrefLabel: 'Religion'
        }]} />

      <Statement 
        source="miner"
        sourceLinks={[{
          prefLabel: 'Mining',
          parentPrefLabel: 'Working with minerals'
        },{
          prefLabel: 'Worker',
          parentPrefLabel: 'Work'
        }]}
        target="believer"
        targetLinks={[]} />
    </div>
  );

}