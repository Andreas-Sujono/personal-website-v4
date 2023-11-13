'use client';

import { Heading } from '@/components/Text/Heading';
import styles from './styles.module.scss';

//https://codepen.io/kevinpowell/pen/jOXwVVB
//https://codepen.io/hexagoncircle/pen/XWbWKwL
const Page = () => {
  return (
    <>
      <Heading as="h2" level={3}>
        Card Effect
      </Heading>

      <div className={styles.card}></div>
    </>
  );
};

export default Page;
