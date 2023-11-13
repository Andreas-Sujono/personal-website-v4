'use client';

import { usePathname } from 'next/navigation';
import { Transition } from '@/components/Transition';
import { DecoderText } from '@/components/DecoderText';
import { Divider } from '@/components/Divider';
import { Heading } from '@/components/Text/Heading';
import { Section } from '@/components/Container/Section';
import { tokens } from '@/components/ThemeProvider/theme';
import { cssProps, msToNum, numToMs } from '@/utils/styles';
import { Link } from '@/components/Text/Link';
import styles from './UIExploration.module.scss';
import { navData } from './data';

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  const initDelay = tokens.base.durationS;
  const path = usePathname();

  return (
    <Section className={styles.page}>
      <Transition unmount in timeout={1600}>
        {(visible, status) => (
          <>
            <Heading
              className={styles.title}
              data-status={status}
              level={4}
              as="h1"
              style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
            >
              <DecoderText
                text="UI Exploration"
                start={status !== 'exited'}
                delay={300}
              />
            </Heading>
            <Divider
              className={styles.divider}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
            />
            <div className={styles.row}>
              <ul className={styles.nav}>
                {navData.map((item) => (
                  <li key={item.label}>
                    <Link
                      secondary={path !== item.pathname}
                      // className={styles.link}
                      href={item.pathname}
                      target="_self"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className={styles.verticalLine}></div>
              <div className={styles.uiContent}>{children}</div>
            </div>
          </>
        )}
      </Transition>
    </Section>
  );
};

function getDelay(delayMs: string, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  const finalDelay = (msToNum(offset) + numDelay).toFixed(0);
  return cssProps({ delay: numToMs(finalDelay) });
}
