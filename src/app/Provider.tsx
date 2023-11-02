'use client';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React, { Fragment, createContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider, tokenStyles } from '@/components/ThemeProvider';
import { tokens } from '@/components/ThemeProvider/theme';
import { VisuallyHidden } from '@/components/VisuallyHidden';
import { msToNum } from '@/utils/styles';
import styles from './App.module.css';

export const AppContext = createContext({});

const GlobalStyle = createGlobalStyle`
${tokenStyles}`;

const Provider = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();

  return (
    <AppContext.Provider value={{}}>
      <ThemeProvider themeId={'dark'}>
        <>
          <LazyMotion features={domAnimation}>
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
                <AnimatePresence mode="wait">
                  <m.div
                    key={path}
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
                  >
                    {children}
                  </m.div>
                </AnimatePresence>
              </main>
            </Fragment>
          </LazyMotion>
          <GlobalStyle />
        </>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default Provider;
