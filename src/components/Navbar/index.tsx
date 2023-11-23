'use client';
import React, { useEffect, useId, useRef, useState } from 'react';
import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, ButtonProps } from '@/components/Button';
import { useSelectSetThemeId, useSelectThemeId } from '@/store/selectors/theme';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useScrollToHash } from '@/hooks';
import { classes } from '@/utils/styles';
import { LinkContent } from '../Text/Link';
import styles from './ThemeToggle.module.scss';
import { Monogram } from './Monogram';
import { navLinks } from './navData';

const Navbar = ({
  isMobile,
  ...rest
}: { isMobile?: boolean } & ButtonProps) => {
  const [target, setTarget] = useState<null | string>('');
  const [current, setCurrent] = useState('');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const navRef = useRef<HTMLDivElement | null>(null);

  const id = useId();
  const maskId = `${id}theme-toggle-mask`;

  const themeId = useSelectThemeId();
  const setThemeId = useSelectSetThemeId();
  const currentPathname = usePathname();
  const [storedValue, setStoredValue] = useLocalStorage('themeId', themeId);
  const scrollToHash = useScrollToHash();

  // Handle smooth scroll nav items
  useEffect(() => {
    if (!target || currentPathname !== '/') return;
    setCurrent(`${currentPathname}${target}`);
    scrollToHash(target, () => setTarget(null));
  }, [currentPathname, scrollToHash, target]);

  useEffect(() => {
    const navObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsScrolled(false);
        } else {
          setIsScrolled(true);
        }
      },
      { rootMargin: '0px 0px 0px 0px', threshold: 1 },
    );
    if (navRef.current) navObserver.observe(navRef.current);

    return () => {
      navObserver.disconnect();
    };
  }, []);

  const handleChangeTheme = () => {
    if (themeId === 'light') {
      setThemeId('dark');
      setStoredValue('dark');
    } else {
      setThemeId('light');
      setStoredValue('light');
    }
  };

  // Check if a nav item should be active
  const getCurrent = (url = '') => {
    const nonTrailing = currentPathname?.endsWith('/')
      ? currentPathname?.slice(0, -1)
      : currentPathname;

    if (url === nonTrailing) {
      return true;
    }

    return false;
  };

  // Store the current hash to scroll to
  const handleNavItemClick = (event: any) => {
    const hash = event.currentTarget.href.split('#')[1];
    setTarget(null);

    if (hash && currentPathname === '/') {
      setTarget(`#${hash}`);
      event.preventDefault();
    }
  };

  return (
    <>
      <nav className={styles.navbar} data-navscroll={isScrolled}>
        <div className={styles.navcontent}>
          <div className={styles.row}>
            <RouterLink href="/">
              <Monogram />
            </RouterLink>
            <div className={styles.navList}>
              {navLinks.map(({ label, pathname }) => (
                <RouterLink
                  href={pathname}
                  scroll={false}
                  key={label}
                  data-navbar-item
                  className={styles.navLink}
                  aria-current={getCurrent(pathname)}
                >
                  <LinkContent
                    href={pathname}
                    secondary
                    className="link-content"
                    onClick={handleNavItemClick}
                    as="span"
                  >
                    {label}
                  </LinkContent>
                </RouterLink>
              ))}
            </div>
          </div>

          <Button
            iconOnly
            className={styles.toggle}
            data-mobile={isMobile}
            aria-label="Toggle theme"
            onClick={handleChangeTheme}
            {...rest}
          >
            <svg
              aria-hidden
              className={styles.svg}
              width="38"
              height="38"
              viewBox="0 0 38 38"
            >
              <defs>
                <mask id={maskId}>
                  <circle
                    className={styles.circle}
                    data-mask={true}
                    cx="19"
                    cy="19"
                    r="13"
                  />
                  <circle className={styles.mask} cx="25" cy="14" r="9" />
                </mask>
              </defs>
              <path
                className={styles.path}
                d="M19 3v7M19 35v-7M32.856 11l-6.062 3.5M5.144 27l6.062-3.5M5.144 11l6.062 3.5M32.856 27l-6.062-3.5"
              />
              <circle
                className={styles.circle}
                mask={`url(#${maskId})`}
                cx="19"
                cy="19"
                r="12"
              />
            </svg>
          </Button>
        </div>
      </nav>
      <nav
        className={classes(styles.navbar, styles.navbarMobile)}
        data-navscroll={isScrolled}
      >
        <div className={styles.navcontent}>
          <div className={styles.row}>
            <RouterLink href="/">
              <Monogram />
            </RouterLink>
          </div>

          <Button
            iconOnly
            className={styles.toggle}
            data-mobile={isMobile}
            aria-label="Toggle theme"
            onClick={handleChangeTheme}
            {...rest}
          >
            <svg
              aria-hidden
              className={styles.svg}
              width="38"
              height="38"
              viewBox="0 0 38 38"
            >
              <defs>
                <mask id={maskId}>
                  <circle
                    className={styles.circle}
                    data-mask={true}
                    cx="19"
                    cy="19"
                    r="13"
                  />
                  <circle className={styles.mask} cx="25" cy="14" r="9" />
                </mask>
              </defs>
              <path
                className={styles.path}
                d="M19 3v7M19 35v-7M32.856 11l-6.062 3.5M5.144 27l6.062-3.5M5.144 11l6.062 3.5M32.856 27l-6.062-3.5"
              />
              <circle
                className={styles.circle}
                mask={`url(#${maskId})`}
                cx="19"
                cy="19"
                r="12"
              />
            </svg>
          </Button>
        </div>
      </nav>
      <div ref={navRef}></div>
    </>
  );
};

export default Navbar;
