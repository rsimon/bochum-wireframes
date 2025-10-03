import { useEffect, useState } from 'react';

export const useInfoJson = (url?: string) => {

  const [info, setInfo] = useState<any | undefined>();

  useEffect(() => {
    if (!url) return;
    
    fetch(url).then(res => res.json()).then(data => {
      if (data['@id'])
        data['@id'] = data['@id'].replace(/^http:/, 'https:');

      if (data.id)
        data.id = data.id.replace(/^http:/, 'https:');
      
      setInfo(data);
    });
  }, [url]);

  return info;

}