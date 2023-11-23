'use client';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React, { Fragment, createContext, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, tokenStyles } from '@/components/ThemeProvider';
import { tokens } from '@/components/ThemeProvider/theme';
import { VisuallyHidden } from '@/components/VisuallyHidden';
import { msToNum } from '@/utils/styles';
import { useSelectSetThemeId, useSelectThemeId } from '@/store/selectors/theme';
import { useLocalStorage } from '@/hooks';
import { Transition } from '@/components/Transition';
import styles from './App.module.css';

export const AppContext = createContext({});
const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle`
${tokenStyles}`;

const Provider = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const themeId = useSelectThemeId();
  const setThemeId = useSelectSetThemeId();

  const [storedValue] = useLocalStorage('themeId', themeId);

  useEffect(() => {
    if (storedValue) setThemeId(storedValue);
  }, [storedValue, setThemeId]);

  const finalPath = path?.includes('ui-exploration') ? 'ui-exploration' : path;

  return (
    <AppContext.Provider value={{}}>
      <ThemeProvider themeId={themeId}>
        <QueryClientProvider client={queryClient}>
          {/* <LazyMotion features={domAnimation}> */}
          <Fragment>
            <VisuallyHidden
              showOnFocus
              as="a"
              className={styles.skip}
              href="#MainContent"
            >
              Skip to main content
            </VisuallyHidden>
            {/* <Navbar /> */}
            <main className={styles.app} id="MainContent">
              {/* <AnimatePresence mode="wait"> */}
              {/* <m.div
                    key={finalPath}
                    className={styles.page}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: 'tween',
                      ease: 'linear',
                      duration: msToNum(tokens.base.durationS) / 1000,
                      delay: 0.1,
                    }}
                  > */}
              <Transition
                in
                timeout={msToNum(tokens.base.durationS)}
                // key={finalPath}
                unmount
              >
                {(isVisible, status) => {
                  return (
                    <div className={styles.pageTransition} data-status={status}>
                      {children}
                    </div>
                  );
                }}
              </Transition>
              {/* </m.div> */}
              {/* </AnimatePresence> */}
            </main>
          </Fragment>
          {/* </LazyMotion> */}
          <GlobalStyle />
        </QueryClientProvider>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default Provider;
