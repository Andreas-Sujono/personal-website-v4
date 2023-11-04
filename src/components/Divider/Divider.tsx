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
        lineWidth: lineWidth || 0,
        lineHeight: lineHeight || 0,
        notchWidth: notchWidth || 0,
        notchHeight: notchHeight || 0,
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

Divider.defaultProps = {
  lineWidth: '100%',
  lineHeight: '2px',
  notchWidth: '90px',
  notchHeight: '10px',
  collapsed: false,
  collapseDelay: 0,
};
