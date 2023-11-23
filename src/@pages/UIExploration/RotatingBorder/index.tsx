'use client';

import { Heading } from '@/components/Text/Heading';
import styles from './styles.module.scss';

const Page = () => {
  return (
    <>
      <Heading as="h2" level={3}>
        Gradient Rotating Border
      </Heading>

      <div className={styles.card}></div>
    </>
  );
};

export default Page;
