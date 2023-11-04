import { Fragment, useState } from 'react';
import { media } from '@/utils/styles';
import { Button } from '@/components/Button';
import { DecoderText } from '@/components/DecoderText';
import { Divider } from '@/components/Divider';
import { Heading } from '@/components/Text/Heading';
import { Link } from '@/components/Text/Link';
import { Section } from '@/components/Container/Section';
import { Text } from '@/components/Text';
import { Transition } from '@/components/Transition';
import { Image } from '@/components/Image';
import KatakanaProfile from '@/../public/katakana-profile.svg';
import styles from './Profile.module.scss';

const ProfileText = ({
  visible,
  titleId,
}: {
  visible: boolean;
  titleId: string;
}) => (
  <Fragment>
    <Heading
      className={styles.title}
      data-visible={visible}
      level={3}
      id={titleId}
    >
      <DecoderText text="Hi there" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I&apos;m Andreas Sujono, currently I live in Singapore working as a Full
      Stack Engineer at Native Finance. I have 6+ years of working experience as
      a full time, part time, and freelancer in more than 7 different companies
      with diverse industries such as Robotics, Ed-tech, Gaming, Cybersecurity,
      and Blockchain.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      In my free time, I enjoy writing about Frontend, Backend, and Blockchain
      stuffs. Read more in the articles section. A lot of projects are coming
      up, so stay tuned and feel free to drop me a message.
    </Text>
  </Fragment>
);

export const Profile = ({
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
      className={styles.profile}
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
          <div className={styles.content}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="/contact"
                // icon="send"
              >
                Send me a message
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About Me
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  src={{
                    src: '/profile.jpg',
                    width: 300,
                    height: 400,
                  }}
                  // placeholder={profileImgPlaceholder}
                  // srcSet={[profileImg, profileImgLarge]}
                  // sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Andreas Sujono Profile Image"
                />
                <KatakanaProfile
                  className={styles.svg}
                  data-visible={visible}
                  aria-hidden="true"
                  width={135}
                  height={765}
                />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
