import React from 'react';
import { Col } from 'react-bootstrap';
import styles from './layoutContentFooter.module.scss';

const LayoutContentFooter: React.FC = ({ children }) => {
  return (
    <Col xs={12}>
      <div className={styles.footerContainer}>{children}</div>
    </Col>
  );
};

export default LayoutContentFooter;
