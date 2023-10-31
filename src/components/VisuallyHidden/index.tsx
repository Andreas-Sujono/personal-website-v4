import React, { forwardRef } from 'react';
import { classes } from '@/utils/styles';
import styles from './styles.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  showOnFocus?: boolean;
  as?: React.ElementType;
  children?: React.ReactElement | string;
  visible?: boolean;
  href?: string;
}

export const VisuallyHidden = forwardRef<any, Props>(function _VisuallyHidden(
  {
    className,
    showOnFocus,
    as: Component = 'span',
    children,
    visible,
    ...rest
  },
  ref,
) {
  return (
    <Component
      className={classes(styles.hidden, className)}
      data-hidden={!visible && !showOnFocus}
      data-show-on-focus={showOnFocus}
      ref={ref}
      {...rest}
    >
      {children}
    </Component>
  );
});
