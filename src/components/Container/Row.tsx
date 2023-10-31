import React, { forwardRef } from 'react';
import { classes } from '@/utils/styles';
import styles from './styles.module.scss';

interface Props {
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
}

export const Row = forwardRef<any, Props>(function _Row(
  { as: Component = 'div', children, className, ...rest },
  ref,
) {
  return (
    <Component className={classes(styles.row, className)} ref={ref} {...rest}>
      {children}
    </Component>
  );
});
