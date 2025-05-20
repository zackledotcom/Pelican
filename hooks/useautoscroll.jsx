import { useRef, useEffect, useState } from 'react';

export default function useAutoScroll(deps = []) {
  const containerRef = useRef(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (!locked && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, deps);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const bottom = scrollHeight - scrollTop - clientHeight < 50;
    setLocked(!bottom);
  };

  return [containerRef, locked, handleScroll];
}
