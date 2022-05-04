import { IWizardGroup } from '@content/WizardSetup/models';
import { WizardActionTypes } from 'state/action-types/wizardActionType';

interface WizardLoadingAction {
  type: WizardActionTypes.WIZARD_GROUP_LOADING;
}

interface WizardGroupSuccessAction {
  type: WizardActionTypes.WIZARD_GROUP_SUCCESS;
  payload: IWizardGroup[];
}

interface WizardErrorAction {
  type: WizardActionTypes.WIZARD_GROUP_ERROR;
  payload: string;
}

interface WizardSetActiveGroupIndexAction {
  type: WizardActionTypes.WIZARD_SET_ACTIVE_GROUP;
  payload: string;
}

interface WizardSetActiveSectionIndexAction {
  type: WizardActionTypes.WIZARD_SET_ACTIVE_SECTION_INDEX;
  payload: number;
}

interface WizardSetActiveStepIndexAction {
  type: WizardActionTypes.WIZARD_SET_ACTIVE_STEP_INDEX;
  payload: number;
}

interface WizardSetActiveStepCompleteAction {
  type: WizardActionTypes.WIZARD_SET_ACTIVE_STEP_COMPLETE;
}

interface WizardSetNextStepAction {
  type: WizardActionTypes.WIZARD_SET_NEXT_STEP;
}

interface WizardSetPreviousStepAction {
  type: WizardActionTypes.WIZARD_SET_PREVIOUS_STEP;
}

export type WizardActions =
  | WizardLoadingAction
  | WizardGroupSuccessAction
  | WizardErrorAction
  | WizardSetActiveGroupIndexAction
  | WizardSetActiveSectionIndexAction
  | WizardSetActiveStepIndexAction
  | WizardSetActiveStepCompleteAction
  | WizardSetNextStepAction
  | WizardSetPreviousStepAction;
