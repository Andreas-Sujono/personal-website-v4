'use client';

import { Transition } from '@/components/Transition';
import { DecoderText } from '@/components/DecoderText';
import { Heading } from '@/components/Text/Heading';
import { Section } from '@/components/Container/Section';
import { tokens } from '@/components/ThemeProvider/theme';
import { cssProps, msToNum, numToMs } from '@/utils/styles';
import { Divider } from '@/components/Divider';
import { useGetAllArticles } from '@/api/articles';
import { ArticleCard } from '@/components/Card/ArticleCard';
import styles from './Articles.module.scss';

export const Articles = () => {
  const initDelay = tokens.base.durationS;
  const { data } = useGetAllArticles();

  const articles = data?.articles || [];

  return (
    <Section className={styles.page}>
      <Transition unmount in timeout={1600}>
        {(visible, status) => (
          <>
            <Heading
              className={styles.title}
              data-status={status}
              level={3}
              as="h1"
              style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
            >
              <DecoderText
                text="Articles"
                start={status !== 'exited'}
                delay={300}
              />
            </Heading>
            <Divider
              className={styles.divider}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
            />
            {articles.map((item) => (
              <ArticleCard key={item.title} data={item} />
            ))}
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
