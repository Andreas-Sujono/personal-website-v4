import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useHasMounted } from '@/hooks/useHasMounted';
import { Text } from '@/components/Text';
import { VisuallyHidden } from '@/components/VisuallyHidden';
import { classes, cssProps } from '@/utils/styles';
import styles from './styles.module.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size: number;
  text: string;
}

export const Loader = ({
  className,
  style,
  size = 32,
  text = 'Loading...',
  ...rest
}: Props) => {
  const reduceMotion = useReducedMotion();
  const hasMounted = useHasMounted();

  const renderScreenReaderTextPortal = () => {
    if (!hasMounted) return <></>;

    return createPortal(
      <VisuallyHidden className="loader-announcement" aria-live="assertive">
        {text}
      </VisuallyHidden>,
      document.getElementById('portal-root') as HTMLElement,
    );

    return <></>;
  };

  if (reduceMotion) {
    return (
      <Text
        className={classes(styles.text, className)}
        weight="medium"
        {...rest}
      >
        <>
          {text}
          {renderScreenReaderTextPortal()}
        </>
      </Text>
    );
  }

  const gapSize = Math.round((size / 3) * 0.2);
  const spanSize = Math.round(size / 3 - gapSize * 2 - 1);

  return (
    <div
      className={classes(styles.loader, className)}
      style={cssProps({ size, spanSize, gapSize }, style)}
      {...rest}
    >
      <div className={styles.content}>
        <div className={styles.span} />
        <div className={styles.span} />
        <div className={styles.span} />
      </div>
      {renderScreenReaderTextPortal()}
    </div>
  );
};
