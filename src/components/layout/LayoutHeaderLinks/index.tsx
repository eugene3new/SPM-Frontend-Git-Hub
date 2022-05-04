import React from 'react';

import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { Nav } from 'react-bootstrap';
import Link from 'next/link';
import { ILinkProps } from '@constants/headerLinks';
import styles from './headerLinks.module.scss';

interface HeaderProps {
  links?: ILinkProps[];
  vertical?: boolean;
  className?: string;
}

const LayoutHeaderLinks: React.FC<HeaderProps> = ({ vertical, links, className }) => {
  const t = useTranslations('header');
  if (!links) {
    return null;
  }
  return (
    <Nav
      role="navigation"
      aria-label={t('main_navigation')}
      className={clsx(styles.layoutHeaderLinks, vertical && styles.vertical, className)}
    >
      {links.map(({ title, href }) => {
        const isActive = true;
        return (
          <div key={title} className={clsx(styles.link, isActive && styles.isActive, 'me-3')}>
            <Link href={href}>{title}</Link>
          </div>
        );
      })}
    </Nav>
  );
};

export default LayoutHeaderLinks;
