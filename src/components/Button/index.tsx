/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import Link from 'next/link';
import { Transition } from '@/components/Transition';
import { classes } from '@/utils/styles';
import { Loader } from '@/components/Loader';
import styles from './styles.module.scss';

function isExternalLink(href?: string) {
  return href?.includes('://');
}

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  href?: string;
  disabled?: boolean;
  target?: '_blank' | '_self';
  as?: React.ElementType;
  secondary?: boolean;
  loading?: boolean;
  loadingText?: string;
  Icon?: React.FC<any>;
  iconEnd?: boolean;
  iconHoverShift?: boolean;
  iconOnly?: boolean;
  type?: string;
}

export const Button = forwardRef<any, ButtonProps>(({ href, ...rest }, ref) => {
  if (isExternalLink(href) || !href) {
    return <ButtonContent href={href} ref={ref} {...rest} />;
  }

  return (
    <Link passHref href={href} scroll={false} legacyBehavior>
      <ButtonContent href={href} ref={ref} {...rest} />
    </Link>
  );
});

interface ButtonContentProps extends React.HTMLAttributes<HTMLButtonElement> {
  href?: string;
  disabled?: boolean;
  target?: '_blank' | '_self';
  as?: React.ElementType;
  secondary?: boolean;
  loading?: boolean;
  loadingText?: string;
  Icon?: React.FC<any>;
  iconEnd?: boolean;
  iconHoverShift?: boolean;
  iconOnly?: boolean;
}

const ButtonContent = forwardRef<any, ButtonContentProps>(
  (
    {
      className,
      as,
      secondary,
      loading,
      loadingText = 'loading',
      Icon,
      iconEnd,
      iconHoverShift,
      iconOnly,
      children,
      rel,
      target,
      href,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const isExternal = isExternalLink(href);
    const defaultComponent = href ? 'a' : 'button';
    const Component = as || defaultComponent;

    return (
      <Component
        className={classes(styles.button, className)}
        data-loading={loading}
        data-icon-only={iconOnly}
        data-secondary={secondary}
        // data-icon={icon}
        href={href}
        rel={rel || isExternal ? 'noopener noreferrer' : undefined}
        target={target || isExternal ? '_blank' : undefined}
        disabled={disabled}
        ref={ref}
        {...rest}
      >
        {!!Icon && (
          <Icon
            className={styles.icon}
            data-start={!iconOnly}
            data-shift={iconHoverShift}
            // icon={icon}
          />
        )}
        {!!children && <span className={styles.text}>{children}</span>}
        {!!iconEnd && Icon && (
          <Icon
            className={styles.icon}
            data-end={!iconOnly}
            data-shift={iconHoverShift}
            // icon={iconEnd}
          />
        )}
        <Transition unmount in={loading}>
          {(visible) => (
            <Loader
              className={styles.loader}
              size={32}
              text={loadingText}
              data-visible={visible}
            />
          )}
        </Transition>
      </Component>
    );
  },
);
