/* eslint-disable react/display-name */
import React, { forwardRef, useId } from 'react';
import { classes } from '@/utils/styles';
import styles from './styles.module.scss';

interface Props extends React.HTMLAttributes<HTMLOrSVGElement> {
  highlight?: boolean;
  className?: string;
}

export const Monogram = forwardRef<any, Props>(
  ({ highlight = true, className, ...props }, ref) => {
    const id = useId();
    const clipId = `${id}monogram-clip`;

    return (
      <svg
        aria-hidden
        className={classes(styles.monogram, className)}
        width="46"
        height="40"
        viewBox="0 0 46 40"
        ref={ref}
        {...props}
      >
        <defs>
          <clipPath id={clipId}>
            <path d="M31.644 27.56V29H16.74V27.56H20.592L17.568 18.2H7.596L4.536 27.56H8.208V29H0.36V27.56H2.808L11.7 0.2H20.304L29.196 27.56H31.644ZM17.1 16.76L12.564 2.864L8.064 16.76H17.1Z" />
          </clipPath>
        </defs>
        <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
        {highlight && (
          <g clipPath={`url(#${clipId})`}>
            <rect className={styles.highlight} width="100%" height="100%" />
          </g>
        )}
      </svg>
    );
  },
);
