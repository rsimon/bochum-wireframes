import { useEffect, useState } from 'react';
import { Cozy, CozyManifest } from 'cozy-iiif';

export const useIIIF = (manifestUrl: string) => {

  const [manifest, setManifest] = useState<CozyManifest | undefined>();

  useEffect(() => {
    Cozy.parseURL(manifestUrl).then(result => {
      if (result.type === 'manifest') {
        setManifest(result.resource);
      } else {
        console.error('Unsupported content', result)
      }
    });
  }, [manifestUrl]);

  return manifest;
  
}