import { useWizardSetup } from '@hooks/contextHook';
import React from 'react';

import styles from './EnterpriseSetup.module.scss';

const WizardSetupGroupDetails: React.FC = () => {
  const { title, overviewPercentages, activeGroupIndex } = useWizardSetup();
  if (activeGroupIndex === null) {
    return null;
  }
  const percentage = overviewPercentages[activeGroupIndex] ? overviewPercentages[activeGroupIndex] : 0;
  return (
    <div className="d-flex flex-column justify-content-center text-center">
      <div className={styles.setupImageContainer}>
        <img src="/setup.svg" className={styles.setupImage} alt="..." />
      </div>
      <div className={styles.setupContent}>
        <h5 className={styles.setupComplete}>
          <span>{title}</span>
          <span className={styles.percentage}> {percentage}% </span>
          <span>Complete</span>
        </h5>
        <p>To complete setup, select from the above sections, and edit.</p>
      </div>
    </div>
  );
};

export default WizardSetupGroupDetails;
