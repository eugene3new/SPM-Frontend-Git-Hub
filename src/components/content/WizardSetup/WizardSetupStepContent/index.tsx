import { IDynamicFormBuilderItem } from '@common/DynamicForm';
import React from 'react';
import { WizardStepIds } from '../data';
import DynamicContent from './DynamicContent';
import WizardStepContainer from './Form';
import BussinessUnit from './Form/BussinessUnit';
import EnterpriseDetails from './Form/EnterpriseDetails';
import EnterpriseStakeholders from './Form/EnterpriseStakeholders';
import FunctionalDivisions from './Form/FunctionalDivisions';
import TerritoryDefinition from './Form/TerritoryDefinition';

interface WizardSetupStepContentProps {
  config?: IDynamicFormBuilderItem[];
  id?: number;
}
/*



*/
const WizardSetupStepContent: React.FC<WizardSetupStepContentProps> = ({ id, config }) => {
  console.log('active step id: ', id);
  return (
    <WizardStepContainer activeStepId={id}>
      <EnterpriseDetails stepId={WizardStepIds.EnterpriseDetails} />
      <TerritoryDefinition stepId={WizardStepIds.TeritoryDefinition} />
      <BussinessUnit stepId={WizardStepIds.BusinessUnit} />
      <FunctionalDivisions stepId={WizardStepIds.FunctionalDivisions} />
      <EnterpriseStakeholders stepId={WizardStepIds.EnterpriseStakeholders} />
      <DynamicContent stepId={6} config={config} />
      <DynamicContent stepId={7} config={config} />
    </WizardStepContainer>
  );
};
export default WizardSetupStepContent;
