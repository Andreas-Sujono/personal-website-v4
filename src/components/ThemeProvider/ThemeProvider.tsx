import React, { createContext, useEffect } from 'react';
import Head from 'next/head';
import { useHasMounted } from '@/hooks';
import { classes, media } from '@/utils/styles';
import { theme, tokens } from './theme';
import { useTheme } from './useTheme';

type ThemeContextState = (typeof theme)['dark'];

export const ThemeContext = createContext<
  ThemeContextState | Record<string, string>
>({});

interface ThemeProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  themeId?: 'dark' | 'light';
  theme?: (typeof theme)['dark'];
  children?: React.ReactElement;
  className?: string;
  as?: React.ElementType;
}
export const ThemeProvider = ({
  themeId = 'light',
  theme: themeOverrides,
  children,
  className,
  as: Component = 'div',
  ...rest
}: ThemeProviderProps) => {
  const currentTheme = { ...theme[themeId], ...themeOverrides };
  const parentTheme = useTheme();
  const isRootProvider = !parentTheme?.themeId;
  const hasMounted = useHasMounted();

  // Save root theme id to localstorage and apply class to body
  useEffect(() => {
    if (isRootProvider && hasMounted) {
      window.localStorage.setItem('theme', JSON.stringify(themeId));
      document.body.dataset.theme = themeId;
    }
  }, [themeId, isRootProvider, hasMounted]);

  return (
    <ThemeContext.Provider value={currentTheme}>
      {isRootProvider && (
        <>
          <Head>
            <meta
              name="theme-color"
              content={`rgb(${currentTheme.rgbBackground})`}
            />
          </Head>
          {children}
        </>
      )}
      {/* Nested providers need a div to override theme tokens */}
      {!isRootProvider && (
        <Component
          className={classes('theme-provider', className)}
          data-theme={themeId}
          {...rest}
        >
          {children}
        </Component>
      )}
    </ThemeContext.Provider>
  );
};

/**
 * Squeeze out spaces and newlines
 */
export function squish(styles: string) {
  return styles.replace(/\s\s+/g, ' ');
}

/**
 * Transform theme token objects into CSS custom property strings
 */
export function createThemeProperties(theme: Record<string, string | number>) {
  return squish(
    Object.keys(theme)
      .filter((key) => key !== 'themeId')
      .map((key) => `--${key}: ${theme[key]};`)
      .join('\n\n'),
  );
}

/**
 * Transform theme tokens into a React CSSProperties object
 */
export function createThemeStyleObject(theme: Record<string, string | number>) {
  const style = {} as Record<string, string>;

  for (const key of Object.keys(theme)) {
    if (key !== 'themeId') {
      style[`--${key}`] = theme[key] as string;
    }
  }

  return style;
}

/**
 * Generate media queries for tokens
 */
export function createMediaTokenProperties() {
  return squish(
    Object.keys(media)
      .map((key) => {
        return `
        @media (max-width: ${media[key as 'desktop']}px) {
          :root {
            ${createThemeProperties(tokens[key as 'desktop'])}
          }
        }
      `;
      })
      .join('\n'),
  );
}

export const tokenStyles = squish(`
  :root {
    ${createThemeProperties(tokens.base)}
  }

  ${createMediaTokenProperties()}

  [data-theme='dark'] {
    ${createThemeProperties(theme.dark)}
  }

  [data-theme='light'] {
    ${createThemeProperties(theme.light)}
  }
`);
