import React from 'react';
import { Nav } from 'react-bootstrap';
import clsx from 'clsx';
import { INavData } from '@helpers';
import NavBarOverflowWrapper from './NavBarOverflowWrapper';

export interface NavItemProps {
  href: string;
  title: string;
}

export interface NavBarProps {
  navItems: INavData[];
  Component?: any;
  aditionalComponentProps?: Record<string, unknown>;
  activeRoute?: string;
}

const formatToCamelCase = (input: string) =>
  input.toLowerCase().replace(/\s+(\w)?/gi, (match, letter) => {
    return letter.toUpperCase();
  });

const NavBar: React.FC<NavBarProps> = ({ navItems, Component, aditionalComponentProps }) => {
  if (navItems.length === 0) {
    return null;
  }
  return (
    <NavBarOverflowWrapper component={Component} aditionalComponentProps={aditionalComponentProps}>
      {navItems.map(({ title, href, active }) => {
        const formattedTitle = formatToCamelCase(title);
        return Component ? (
          <Component href={href} key={formattedTitle} {...aditionalComponentProps}>
            <Nav.Link data-targetid={formattedTitle} className={clsx('nav-item me-3', active && 'active')}>
              {title}
            </Nav.Link>
          </Component>
        ) : (
          <Nav.Link key={formattedTitle} data-targetid={formattedTitle} className={clsx('nav-item me-3', active && 'active')} href={href}>
            {title}
          </Nav.Link>
        );
      })}
    </NavBarOverflowWrapper>
  );
};

export default NavBar;
