'use client';
import { Text } from '@/components/Text';
import { Link } from '@/components/Text/Link';
import { classes } from '@/utils/styles';
import styles from './Footer.module.css';

export const Footer = ({ className }: { className?: string }) => (
  <footer className={classes(styles.footer, className)}>
    <Text size="s" align="center">
      <>
        <span className={styles.date}>
          {`© ${new Date().getFullYear()} Andreas Sujono.`} Design Inspired by
        </span>
        <Link
          secondary={true}
          className={styles.link}
          href="/humans.txt"
          target="_self"
        >
          Hamish William
        </Link>
      </>
    </Text>
  </footer>
);
