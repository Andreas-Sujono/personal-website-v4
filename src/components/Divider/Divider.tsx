import React from 'react';
import { classes, cssProps, numToMs } from '@/utils/styles';
import styles from './Divider.module.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  lineWidth?: string | number;
  lineHeight?: string | number;
  notchWidth?: string | number;
  notchHeight?: string | number;
  collapseDelay?: number;
  collapsed?: boolean;
}
export const Divider = ({
  lineWidth,
  lineHeight,
  notchWidth,
  notchHeight,
  collapseDelay,
  collapsed,
  className,
  style,
  ...rest
}: Props) => (
  <div
    className={classes(styles.divider, className)}
    style={cssProps(
      {
        lineWidth: lineWidth || '100%',
        lineHeight: lineHeight || '2px',
        notchWidth: notchWidth || '90px',
        notchHeight: notchHeight || '10px',
        collapseDelay: numToMs(collapseDelay || 0),
      },
      style,
    )}
    {...rest}
  >
    <div className={styles.line} data-collapsed={collapsed} />
    <div
      className={styles.notch}
      data-collapsed={collapsed}
      style={cssProps({ collapseDelay: numToMs((collapseDelay || 0) + 160) })}
    />
  </div>
);
