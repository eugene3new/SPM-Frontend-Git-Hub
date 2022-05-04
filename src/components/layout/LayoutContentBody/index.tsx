import Spinner from '@common/Spinner';
import React from 'react';
import { Col } from 'react-bootstrap';
import styles from './contentBody.module.scss';

interface LayoutContentBodyProps {
  title: string;
  actions?: string;
  isLoading?: boolean;
  isError?: boolean;
}

const LayoutContentBody: React.FC<LayoutContentBodyProps> = ({ children, title, actions, isLoading, isError }) => {
  return (
    <Col xs={12}>
      <div className={styles.contentBodyContainer}>
        <div className={styles.contentBodyHeader}>
          <h1>{title}</h1>
          <div>{actions}</div>
        </div>
        <hr />
        {isLoading || isError ? (
          <div className={styles.requestContainer}>
            {isError ? <div>Error! please try to reload the page</div> : <Spinner text="Loading" showSpinner stylingBlock />}
          </div>
        ) : (
          <>{children}</>
        )}
      </div>
    </Col>
  );
};
export default LayoutContentBody;
