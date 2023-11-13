'use client';

import { useState } from 'react';
import { Heading } from '@/components/Text/Heading';
import { Button } from '@/components/Button';
import { DecoderText } from '@/components/DecoderText';
import { Text } from '@/components/Text';
import styles from './styles.module.scss';

const Page = () => {
  const [key, setKey] = useState(0);
  return (
    <>
      <Heading as="h2" level={3}>
        Decoder Text
      </Heading>

      <Button
        style={{ marginTop: '4rem', display: 'block' }}
        secondary
        onClick={() => {
          setKey(Math.random());
        }}
      >
        Play Animation
      </Button>
      <div style={{ padding: '1rem 0' }} />

      <Text size="xl">
        <DecoderText text="Decoder Text" start delay={100} key={key} />
      </Text>
    </>
  );
};

export default Page;
