import React, { Fragment, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import RouterLink from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { Section } from '@/components/Container/Section';
import { useInterval, usePrevious, useScrollToHash } from '@/hooks';
import { Transition } from '@/components/Transition';
import { VisuallyHidden } from '@/components/VisuallyHidden';
import { DecoderText } from '@/components/DecoderText';
import { cssProps } from '@/utils/styles';
import { tokens, useTheme } from '@/components/ThemeProvider';
import { Heading } from '@/components/Text/Heading';
import { socialLinks } from '@/components/Navbar/navData';
import styles from './Intro.module.scss';

const DisplacementSphere = dynamic(() =>
  import('./DisplacementSphere').then((mod) => mod.DisplacementSphere),
);

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  disciplines: string[];
  id: string;
  sectionRef: any;
  scrollIndicatorHidden: boolean | string;
}

export function Intro({
  id,
  sectionRef,
  disciplines,
  scrollIndicatorHidden,
  ...rest
}: Props) {
  const theme = useTheme();
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const prevTheme = usePrevious(theme);
  const introLabel = [
    disciplines.slice(0, -1).join(', '),
    disciplines.slice(-1)[0],
  ].join(', and ');
  const currentDiscipline = disciplines.find(
    (item, index) => index === disciplineIndex,
  );
  const titleId = `${id}-title`;
  const scrollToHash = useScrollToHash();

  useInterval(
    () => {
      const index = (disciplineIndex + 1) % disciplines.length;
      setDisciplineIndex(index);
    },
    5000,
    theme.themeId,
  );

  useEffect(() => {
    if (prevTheme && prevTheme.themeId !== theme.themeId) {
      setDisciplineIndex(0);
    }
  }, [theme.themeId, prevTheme]);

  const handleScrollClick = (event: any) => {
    event.preventDefault();
    scrollToHash(event.currentTarget.href);
  };

  return (
    <Section
      className={styles.intro}
      as="section"
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      {...rest}
    >
      <Transition in key={theme.themeId} timeout={2000}>
        {(visible, status) => (
          <Fragment>
            <DisplacementSphere />
            <header className={styles.text}>
              <h1 className={styles.name} data-visible={visible} id={titleId}>
                <DecoderText text="Andreas Sujono" delay={300} />
              </h1>
              <Heading level={0} as="h2" className={styles.title}>
                <VisuallyHidden className={styles.label}>
                  {`Designer + ${introLabel}`}
                </VisuallyHidden>
                <span aria-hidden className={styles.row}>
                  <span
                    className={styles.word}
                    data-status={status}
                    style={cssProps({ delay: tokens.base.durationXS })}
                  >
                    Developer
                  </span>
                  <span />
                  <span className={styles.line} data-status={status} />
                </span>
                <div
                  className={styles.row}
                  style={{
                    marginTop: '16px',
                  }}
                >
                  <AnimatePresence>
                    {disciplines.map((item) => {
                      return (
                        <Transition
                          unmount={true}
                          in={item === currentDiscipline}
                          timeout={{ enter: 3000, exit: 2000 }}
                          key={item}
                        >
                          {(visible, status) => (
                            <span
                              aria-hidden
                              className={styles.word}
                              data-plus={true}
                              data-status={status}
                              style={cssProps({ delay: tokens.base.durationL })}
                            >
                              {item}
                            </span>
                          )}
                        </Transition>
                      );
                    })}
                  </AnimatePresence>
                </div>
                <NavbarIcons status={status} />
              </Heading>
            </header>
            <RouterLink
              href="/#about-me"
              className={styles.scrollIndicator}
              data-status={status}
              data-hidden={scrollIndicatorHidden}
              onClick={handleScrollClick}
            >
              <VisuallyHidden>Scroll to projects</VisuallyHidden>
            </RouterLink>
          </Fragment>
        )}
      </Transition>
    </Section>
  );
}

const NavbarIcons = ({
  desktop,
  status,
}: {
  desktop?: boolean;
  status?: string;
}) => (
  <div className={styles.icons} data-status={status}>
    {socialLinks.map(({ label, url, Icon }) => (
      <a
        key={label}
        data-navbar-item={desktop || undefined}
        className={styles.iconLink}
        aria-label={label}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className={styles.navIcon} />
      </a>
    ))}
  </div>
);
