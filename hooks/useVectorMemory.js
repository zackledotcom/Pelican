import { useState, useEffect } from 'react';
import { queryQdrant } from './vectorAPI';

export default function useVectorMemory(query = "") {
  const [memories, setMemories] = useState([]);
  useEffect(() => {
    queryQdrant(query).then(setMemories).catch(() => setMemories([]));
  }, [query]);
  return { memories };
}
