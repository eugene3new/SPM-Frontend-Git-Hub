import { IDynamicFormBuilderItem } from '@common/DynamicForm';

export interface IWizardStep {
  id: number;
  url: string;
  isComplete: boolean;
}

export interface IWizardMappedStep {
  id?: number;
  isComplete?: boolean;
  label: string;
  url: string;
  config: IDynamicFormBuilderItem[];
}

export interface IWizardSection {
  id: number;
  steps: IWizardStep[];
}

export interface IWizardMappedSection {
  id?: number;
  details: string;
  label: string;
  percentage: number;
  infoTitle: string;
  steps: IWizardMappedStep[];
}

export interface IWizardMappedOverview {
  id?: number;
  backgroundColor: 'orange' | 'green' | 'purple' | 'blue';
  imageUrl: string;
  description: string;
  route: string;
  percentage: number;
  title: string;
}

export interface IWizardGroup {
  id: number;
  sections: IWizardSection[];
}

export interface IWizardMappedGroup {
  id: number;
  sections: IWizardMappedSection[];
}

export interface IWizardNavigation {
  href: string;
  title: string;
  active?: boolean;
  id?: number;
}

export interface IWizardButtonsText {
  left: string;
  right: string;
}

export interface IWizardButtonsStatus {
  left: boolean;
  right: boolean | null;
}

export interface IStepForm {
  stepId: number;
}

export interface WizardSetupStepContentProps {
  config?: IDynamicFormBuilderItem[];
  url?: string;
  stepId?: number;
}
