import React, { ReactNode } from 'react';
import ProgressStep from '@common/ProgressSteps';
import { useTranslations } from 'next-intl';
import { useWizardSetup } from '@hooks/contextHook';
import NoContent from '@common/NoContent';
import styles from './enterprise.module.scss';
import { IWizardMappedSection } from '../models';

interface WizardSetupStepsProps {
  section?: IWizardMappedSection;
}

const WizardSetupSteps: React.FC<WizardSetupStepsProps> = ({ children, section }) => {
  const { setActiveStep, activeStepIndex } = useWizardSetup();
  const t = useTranslations('enterprise_setup');

  if (section === undefined || section.steps.length === 0) {
    return <NoContent text="There is no content for this group" />;
  }
  return (
    <>
      <div className={styles.progressSteps}>
        {section.steps.map((item, index) => {
          return (
            <ProgressStep
              key={item.id}
              isActive={index === activeStepIndex}
              isFirst={index === 0}
              label={t(item.label)}
              onClick={() => setActiveStep(index)}
              isComplete={item.isComplete}
            />
          );
        })}
      </div>
      {activeStepIndex !== null ? (
        <>
          {React.Children.map<ReactNode, ReactNode>(children, (child) => {
            if (React.isValidElement(child)) {
              const step = section.steps[activeStepIndex];
              return React.cloneElement(child, { config: step.config, url: step.url, id: step.id });
            }
            return child;
          })}
        </>
      ) : (
        <NoContent text="No data for this group" />
      )}
    </>
  );
};

export default WizardSetupSteps;
