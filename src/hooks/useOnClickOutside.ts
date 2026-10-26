import { useEffect, useRef, type RefObject } from 'react';

export const useOnClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  listenEscape = true
): void => {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const clickListener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handlerRef.current();
    };

    const keyListener = (event: KeyboardEvent) => {
      if (listenEscape && event.key === 'Escape') {
        handlerRef.current();
      }
    };

    document.addEventListener('mousedown', clickListener);
    document.addEventListener('touchstart', clickListener);
    if (listenEscape) document.addEventListener('keydown', keyListener);

    return () => {
      document.removeEventListener('mousedown', clickListener);
      document.removeEventListener('touchstart', clickListener);
      if (listenEscape) document.removeEventListener('keydown', keyListener);
    };
  }, [ref, listenEscape]);
};
