import React, { forwardRef } from 'react';
import RouterLink from 'next/link';
import { classes } from '@/utils/styles';
import styles from './styles.module.scss';

// File extensions that can be linked to
const VALID_EXT = ['txt', 'png', 'jpg'];

function isAnchor(href?: string) {
  const isValidExtension = VALID_EXT.includes(
    href?.split('.')?.pop() as string,
  );
  return href?.includes('://') || href?.[0] === '#' || isValidExtension;
}

interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  rel?: string;
  target?: string;
  children?: React.ReactNode;
  secondary?: boolean;
  className?: string;
  href?: string;
}
export const Link = forwardRef<any, LinkProps>(function _Link(
  { href, ...rest },
  ref,
) {
  if (isAnchor(href)) {
    return <LinkContent href={href} ref={ref} {...rest} />;
  }

  return (
    <RouterLink passHref href={href as string} scroll={false} legacyBehavior>
      <LinkContent ref={ref} {...rest} />
    </RouterLink>
  );
});

interface LinkContentProps extends React.HTMLAttributes<HTMLAnchorElement> {
  rel?: string;
  target?: string;
  children?: React.ReactNode;
  secondary?: boolean;
  className?: string;
  href?: string;
}
export const LinkContent = forwardRef<any, LinkContentProps>(
  function _LinkContent(
    { rel, target, children, secondary, className, href, ...rest },
    ref,
  ) {
    const isExternal = href?.includes('://');
    const relValue = rel || (isExternal ? 'noreferrer noopener' : undefined);
    const targetValue = target || (isExternal ? '_blank' : undefined);

    return (
      <a
        className={classes(styles.link, className)}
        data-secondary={secondary}
        rel={relValue}
        href={href}
        target={targetValue}
        ref={ref}
        {...rest}
      >
        {children}
      </a>
    );
  },
);
