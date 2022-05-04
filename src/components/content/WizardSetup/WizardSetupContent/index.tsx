import React from 'react';
import LayoutContentBody from '@layout/LayoutContentBody';
import EnterpriseSetupToolbar from '@content/WizardSetup/WizardSetupToolbar';
import { IWizardMappedGroup } from '@content/WizardSetup/models';

import { FormContextProvider } from 'context/FormContext';
import { ContentLoadingSpinnerProvider } from 'context/ContentLoadingSpinnerContext';
import { useContentLoadingSpinner } from '@hooks/contextHook';
import WizardSetupSections from '../WizardSetupSections';
import WizardSetupSteps from '../WizardSetupSteps';
import WizardSetupStepContent from '../WizardSetupStepContent';

interface WizardSetupContentProps {
  groups: IWizardMappedGroup[];
}
/* Pass data down to children */
const WizardSetupContent: React.FC<WizardSetupContentProps> = ({ groups }) => {
  return (
    <WizardSetupSections groups={groups}>
      <WizardSetupSteps>
        <WizardSetupStepContent />
      </WizardSetupSteps>
    </WizardSetupSections>
  );
};

export default WizardSetupContent;
