import React, { Fragment } from 'react';
import { classes } from '@/utils/styles';
import styles from './styles.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactElement | React.ReactElement[] | string;
  level?: number;
  as?: React.ElementType;
  align?: string;
  weight?: string;
  className?: string;
}

export const Heading = ({
  children,
  level = 1,
  as,
  align = 'auto',
  weight = 'medium',
  className,
  ...rest
}: Props) => {
  const clampedLevel = Math.min(Math.max(level, 0), 5);
  const Component = (as ||
    `h${Math.max(clampedLevel, 1)}`) as React.ElementType;

  return (
    <Fragment>
      <Component
        className={classes(styles.heading, className)}
        data-align={align}
        data-weight={weight}
        data-level={clampedLevel}
        {...rest}
      >
        {children}
      </Component>
    </Fragment>
  );
};
