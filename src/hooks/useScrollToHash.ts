import { useReducedMotion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useRef } from 'react';

export function useScrollToHash() {
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const { push } = useRouter();
  const asPath = usePathname() || '';
  const reduceMotion = useReducedMotion();

  const scrollToHash = useCallback(
    (hash: string, onDone?: () => void) => {
      const id = hash.split('#')[1];
      const targetElement = document.getElementById(id);
      const route = asPath.split('#')[0];
      const newPath = `${route}#${id}`;

      targetElement?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
      });

      const handleScroll = () => {
        clearTimeout(scrollTimeout.current as NodeJS.Timeout);

        scrollTimeout.current = setTimeout(() => {
          window.removeEventListener('scroll', handleScroll);

          if (window.location.pathname === route) {
            onDone?.();
            push(newPath, { scroll: false });
          }
        }, 50);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout?.current as NodeJS.Timeout);
      };
    },
    [push, reduceMotion, asPath],
  );

  return scrollToHash;
}
