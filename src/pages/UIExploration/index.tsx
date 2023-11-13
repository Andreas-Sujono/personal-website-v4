'use client';

import { Text } from '@/components/Text';
import { Heading } from '@/components/Text/Heading';
import { Link } from '@/components/Text/Link';
import { Loader } from '@/components/Loader';
import { Divider } from '@/components/Divider';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import styles from './UIExploration.module.scss';

export const UIExploration = () => {
  return (
    <>
      <Heading as="h1" level={1}>
        Heading L1
      </Heading>
      <div className={styles.gap} />
      <Heading as="h2" level={2}>
        Heading L2
      </Heading>
      <div className={styles.gap} />
      <Heading as="h3" level={3}>
        Heading L3
      </Heading>
      <div className={styles.gap} />
      <Heading as="h4" level={4}>
        Heading L4
      </Heading>
      <div className={styles.gap} />
      <Heading as="h5" level={5}>
        Heading L5
      </Heading>
      <div className={styles.gap} />

      <Text size="xl">Text XL</Text>
      <div className={styles.gap} />

      <Text size="l">Text L</Text>
      <div className={styles.gap} />

      <Text size="m">Text M</Text>
      <div className={styles.gap} />

      <Text size="s">Text S</Text>
      <div className={styles.gap} />

      <Text size="m">Link </Text>
      <Divider />
      <div className={styles.gap} />
      <div className={styles.gap} />

      <div className={styles.row}>
        <Link href="#">Primary Link</Link>
        <Link href="#" secondary>
          Secondary Link
        </Link>
      </div>
      <div className={styles.gap} />
      <div className={styles.gap} />

      <Text size="m">Loader </Text>
      <Divider />
      <div className={styles.gap} />
      <div className={styles.gap} />

      <div className={styles.row}>
        <Loader size={32} text="Loading" data-visible />
        <Loader size={64} text="Loading" data-visible />
        <Loader size={128} text="Loading" data-visible />
      </div>
      <div className={styles.gap} />

      <Text size="m">Button </Text>
      <Divider />
      <div className={styles.gap} />
      <div className={styles.gap} />

      <div className={styles.row}>
        <Button
          href="#"
          // icon="chevronRight"
        >
          Primary button
        </Button>
        <Button
          secondary
          href="#"
          // icon="chevronRight"
        >
          Secondary button
        </Button>
        <Button
          href="#"
          loading
          // icon="chevronRight"
        >
          Loading button
        </Button>
      </div>
      <div className={styles.gap} />
      <div className={styles.gap} />
      <div className={styles.gap} />

      <Text size="m">Input </Text>
      <Divider />
      <div className={styles.gap} />
      <div className={styles.gap} />

      <Input
        required
        label="Label"
        type="text"
        maxLength={512}
        placeholder="input your text here"
      />
    </>
  );
};
