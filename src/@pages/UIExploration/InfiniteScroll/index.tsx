'use client';

import { Heading } from '@/components/Text/Heading';
import styles from './styles.module.scss';

const items = [
  'HTML',
  'CSS',
  'JS',
  'Typescript',
  'React',
  'NextJs',
  'VueJs',
  'NuxtJs',
  'Redux',
  'React Query',
  'Svelte',
  'SolidJs',
  'Preact',
  'Astro',
  'RemixUI',
  'Blockchain',
  'Solidity',
];

const Page = () => {
  return (
    <>
      <Heading as="h2" level={3}>
        Infinite Scrolling
      </Heading>

      <div className={styles.scroller} data-speed="fast" data-animated="true">
        <ul className="tag-list scroller__inner">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
          {items.map((item) => (
            <li key={item} aria-hidden="true">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Page;
