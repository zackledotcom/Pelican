import { useState } from 'react';

export default function useUndoStack(initial = []) {
  const [stack, setStack] = useState([initial]);
  const [index, setIndex] = useState(0);

  const current = stack[index];

  const set = (next) => {
    const newStack = stack.slice(0, index + 1);
    newStack.push(next);
    setStack(newStack);
    setIndex(newStack.length - 1);
  };

  const undo = () => {
    if (index > 0) setIndex(index - 1);
  };

  const redo = () => {
    if (index < stack.length - 1) setIndex(index + 1);
  };

  return [current, set, undo, redo];
}
