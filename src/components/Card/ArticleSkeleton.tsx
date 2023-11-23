import { classes } from '@/utils/styles';
import { Heading } from '@/components/Text/Heading';
import { Text } from '@/components/Text';
import { Divider } from '@/components/Divider';
import styles from './Card.module.scss';

export const SkeletonPost = ({ visible = true }: { visible?: boolean }) => {
  return (
    <article
      aria-hidden="true"
      data-visible={visible}
      className={classes(styles.post, styles.skeleton)}
    >
      <div className={styles.postLink}>
        <div className={styles.postDetails}>
          <div aria-hidden className={styles.postDate}>
            <Divider notchWidth="64px" notchHeight="8px" />
            Coming soon...
          </div>
          <Heading
            className={styles.skeletonBone}
            as="h2"
            level={4}
            style={{ height: 24, width: '70%' }}
          />
          <Text
            className={styles.skeletonBone}
            size="s"
            as="p"
            style={{ height: 90, width: '100%' }}
          />
          {/* <div className={styles.postFooter}>
            <Button secondary iconHoverShift as="div">
              Read more
            </Button>
            <Text className={styles.timecode} size="s">
              00:00:00:00
            </Text>
          </div> */}
        </div>
      </div>
    </article>
  );
};
