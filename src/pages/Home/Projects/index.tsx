import { useState } from 'react';
import { DecoderText } from '@/components/DecoderText';
import { Heading } from '@/components/Text/Heading';
import { Section } from '@/components/Container/Section';
import { Text } from '@/components/Text';
import { Transition } from '@/components/Transition';
import { SkeletonPost } from '@/components/Card/ArticleSkeleton';
import styles from './Projects.module.scss';

export const Projects = ({
  id,
  visible,
  sectionRef,
}: {
  id: string;
  visible: boolean;
  sectionRef: any;
}) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.projects}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {(visible) => (
          <>
            <Heading
              className={styles.title}
              data-visible={visible}
              level={3}
              id={titleId}
            >
              <DecoderText
                text="What I'm Working on"
                start={visible}
                delay={500}
              />
            </Heading>
            <Text
              className={styles.description}
              data-visible={visible}
              size="m"
              as="p"
            >
              A lot of exciting projects on going, stay tuned for announcements
              soon!
            </Text>
            <div className={styles.content}>
              <div className={styles.column}>
                <SkeletonPost visible={visible} />
              </div>
            </div>
          </>
        )}
      </Transition>
    </Section>
  );
};
