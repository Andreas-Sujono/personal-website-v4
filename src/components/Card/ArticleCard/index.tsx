import parse from 'html-react-parser';
import moment from 'moment';
import Image from 'next/image';
import { classes } from '@/utils/styles';
import { Heading } from '@/components/Text/Heading';
import { Text } from '@/components/Text';
import { Divider } from '@/components/Divider';
import { Button } from '@/components/Button';
import { Article } from '@/api/articles';
import styles from './styles.module.scss';

export const ArticleCard = ({
  visible = true,
  data,
}: {
  visible?: boolean;
  data: Article;
}) => {
  return (
    <article data-visible={visible} className={classes(styles.post)}>
      <div className={styles.postLink}>
        <div className={styles.postDetails}>
          <div className={styles.postDate}>
            <Divider notchWidth="64px" notchHeight="8px" />
            Frontend
          </div>
          <Heading as="h2" level={4} style={{ width: '80%' }}>
            {data.title}
          </Heading>
          <Text
            size="s"
            as="p"
            style={{ height: 60, width: '100%', marginTop: '0' }}
          >
            <>{parse(data.description)}</>
          </Text>
          <div className={styles.postFooter}>
            <Button secondary iconHoverShift href={data.link} target="_blank">
              Read more
            </Button>
            <Text className={styles.timecode} size="s">
              {moment(new Date(data.pubDate)).format('DD/MM/YYYY')}
            </Text>
          </div>
        </div>
      </div>
      <div>
        <Image
          src={data.thumbnail}
          width={400}
          height={300}
          alt=""
          style={{
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            padding: '1rem',
            maxHeight: '300px',
            flex: '0 1 300px',
          }}
        />
      </div>
    </article>
  );
};
