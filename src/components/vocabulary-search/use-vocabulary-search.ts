import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { VOCABULARY, VocabularyTerm } from './dummy-vocabulary';

const fuse = new Fuse<VocabularyTerm>(VOCABULARY, { 
  keys: ['label', 'altLabels'],
  shouldSort: true,
  threshold: 0.6,
  includeScore: true,
  useExtendedSearch: true
});

export const useVocabularySearch = (query?: string) => {

  const [matches, setMatches] = useState<VocabularyTerm[]>([]);

  useEffect(() => {
    if (query) {
      const matches = fuse.search(query).map(r => r.item);
      setMatches(matches);
    } else {
      setMatches([]);
    }
  }, [query]);

  return matches;

}