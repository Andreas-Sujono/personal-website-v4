import React, { HTMLAttributes } from 'react';
import { classes } from '@/utils/styles';
import styles from './styles.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement | string;
  size?: 's' | 'm' | 'l' | 'xl';
  as?: React.ElementType;
  align?: string;
  weight?: string;
  secondary?: boolean;
  className?: string;
}

export const Text = ({
  children,
  size = 'm',
  as: Component = 'span',
  align = 'auto',
  weight = 'auto',
  secondary,
  className,
  ...rest
}: Props) => {
  return (
    <Component
      className={classes(styles.text, className)}
      data-align={align}
      data-size={size}
      data-weight={weight}
      data-secondary={secondary}
      {...rest}
    >
      {children}
    </Component>
  );
};
