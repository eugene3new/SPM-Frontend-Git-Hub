import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavBar, { NavItemProps } from '@common/NavBar';
import { INavData } from '@helpers';
import { Col } from 'react-bootstrap';
import styles from './layoutContentHeader.module.scss';

interface LayoutContentHeaderProps {
  navItems?: INavData[];
  actions?: string;
}

const LayoutContentHeader: React.FC<LayoutContentHeaderProps> = ({ navItems, actions }) => {
  return (
    <Col xs={12}>
      <div className={styles.layoutContentHeader}>
        {navItems && <NavBar navItems={navItems} Component={Link} aditionalComponentProps={{ passHref: true }} />}
        {actions && <div className={styles.layoutContentActions}>{actions}</div>}
      </div>
    </Col>
  );
};

export default LayoutContentHeader;
