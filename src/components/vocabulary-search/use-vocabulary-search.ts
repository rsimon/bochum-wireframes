import { useEffect, useState } from 'react';
import { VocabularyTerm } from './dummy-vocabulary';

export const useVocabularySearch = (query?: string) => {

  const [matches, setMatches] = useState<VocabularyTerm[]>([]);

  useEffect(() => {
    // TODO
  }, [query]);

}