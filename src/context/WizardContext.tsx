import { API_ROUTES } from '@constants/apiRoutes';
import {
  IWizardButtonsText,
  IWizardButtonsStatus,
  IWizardGroup,
  IWizardMappedGroup,
  IWizardMappedOverview,
  IWizardNavigation,
} from '@content/WizardSetup/models';
import { getPercentage } from '@helpers';
import { useRouter } from 'next/router';
import React from 'react';
import { WizardActionTypes } from 'state/action-types/wizardActionType';
import wizardReducer, { wizardInitialState } from 'state/reducers/wizardReducer';
import useSWR from 'swr';

export const EnterpriseContext = React.createContext<{
  title: string;
  navigation: IWizardNavigation[];
  overviews: IWizardMappedOverview[];
  groups: IWizardMappedGroup[];
  setActiveSection: (index: number) => void;
  setActiveStep: (index: number) => void;
  setActiveStepComplete: () => void;
  setNextStep: () => void;
  setPreviousStep: () => void;
  activeGroupIndex: number | null;
  activeSectionIndex: number | null | undefined;
  overviewPercentages: number[];
  sectionPercentages: number[][];
  activeStepIndex: number | null;
  buttonText: IWizardButtonsText;
  buttonStatus: IWizardButtonsStatus;
  isLoading: boolean;
  error: any;
}>({
  groups: [],
  navigation: [],
  overviews: [],
  sectionPercentages: [],
  overviewPercentages: [],
  title: '',
  setActiveSection: () => undefined,
  setActiveStep: () => undefined,
  setActiveStepComplete: () => undefined,
  setNextStep: () => undefined,
  setPreviousStep: () => undefined,
  activeGroupIndex: null,
  activeSectionIndex: null,
  activeStepIndex: null,
  buttonText: {
    left: '',
    right: '',
  },
  buttonStatus: {
    left: false,
    right: false,
  },
  isLoading: true,
  error: undefined,
});

EnterpriseContext.displayName = 'WizardContext';

export const WizardSetupProvider: React.FC = ({ children }) => {
  const { data, error } = useSWR<IWizardGroup[]>(API_ROUTES.wizardGroup);
  const [overviewPercentages, setOverviewPercentages] = React.useState<number[]>([]);
  const [sectionPercentages, setSectionPercentages] = React.useState<number[][]>([]);
  const [buttonText, setButtonText] = React.useState<IWizardButtonsText>({ left: '', right: '' });
  const [buttonStatus, setButtonStatus] = React.useState<IWizardButtonsStatus>({ left: false, right: false });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const [state, dispatch] = React.useReducer(wizardReducer, wizardInitialState);
  const { groups, navigation, overviews, activeSectionIndex, activeStepIndex, activeGroupIndex } = state;

  React.useEffect(() => {
    setIsLoading(!data);
  }, [data]);

  React.useEffect(() => {
    if (groups.length > 0) {
      const tempOverviewPercentages: number[] = [];
      const tempSectionPercantages: number[][] = [];
      groups.forEach((group, groupIndex) => {
        let numberOfSectionsComplete = 0;
        tempSectionPercantages[groupIndex] = [];
        group.sections.forEach((section, sectionIndex) => {
          let numberOfStepsComplete = 0;
          section.steps.forEach((step) => {
            numberOfStepsComplete += step.isComplete ? 1 : 0;
          });
          const sectionCompletePercentage = numberOfStepsComplete / groups[groupIndex].sections[sectionIndex].steps.length;
          numberOfSectionsComplete += sectionCompletePercentage === 1 ? 1 : 0;
          tempSectionPercantages[groupIndex][sectionIndex] = getPercentage(sectionCompletePercentage);
        });
        const groupPercentageDecimal = numberOfSectionsComplete / groups[groupIndex].sections.length;
        tempOverviewPercentages[groupIndex] = getPercentage(groupPercentageDecimal);
      });
      setOverviewPercentages(tempOverviewPercentages);
      setSectionPercentages(tempSectionPercantages);
    }
  }, [groups]);

  React.useEffect(() => {
    const buttonTextTemp: IWizardButtonsText = {
      left: '',
      right: '',
    };
    const buttonStatusTemp: IWizardButtonsStatus = {
      left: false,
      right: false,
    };
    if (groups.length > 0) {
      if (activeGroupIndex !== null && activeSectionIndex !== undefined && activeSectionIndex !== null && activeStepIndex !== null) {
        const activeSection = groups[activeGroupIndex].sections[activeSectionIndex];
        const previousStep = activeSection.steps[activeStepIndex - 1] ? activeSection.steps[activeStepIndex - 1] : undefined;
        if (previousStep) {
          buttonStatusTemp.left = false;
          buttonTextTemp.left = activeSection.steps[activeStepIndex - 1].label;
        } else {
          buttonStatusTemp.left = true;
        }
        const nextStep = activeSection.steps[activeStepIndex + 1] ? activeSection.steps[activeStepIndex + 1] : undefined;
        if (nextStep) {
          buttonStatusTemp.right = false;
          buttonTextTemp.right = nextStep.label;
        } else if (activeSection.steps.length === activeStepIndex + 1 && groups[activeGroupIndex].sections[activeSectionIndex + 1]) {
          buttonStatusTemp.right = false;
          buttonTextTemp.right = groups[activeGroupIndex].sections[activeSectionIndex + 1].label;
        } else if (
          activeSection.steps.length === activeStepIndex + 1 &&
          groups[activeGroupIndex].sections.length === activeSectionIndex + 1
        ) {
          buttonStatusTemp.right = null;
        } else {
          buttonStatusTemp.right = true;
        }
      } else {
        buttonStatusTemp.left = true;
        buttonStatusTemp.right = true;
      }
      setButtonText(buttonTextTemp);
      setButtonStatus(buttonStatusTemp);
    }
  }, [groups, activeGroupIndex, activeSectionIndex, activeStepIndex]);

  React.useEffect(() => {
    if (data) {
      dispatch({
        type: WizardActionTypes.WIZARD_GROUP_SUCCESS,
        payload: data,
      });
    }
  }, [data]);

  React.useEffect(() => {
    if (data) {
      dispatch({
        type: WizardActionTypes.WIZARD_SET_ACTIVE_GROUP,
        payload: router.asPath,
      });
    }
  }, [router.asPath, data]);

  const setActiveSection = (index: number) => {
    dispatch({
      type: WizardActionTypes.WIZARD_SET_ACTIVE_SECTION_INDEX,
      payload: index,
    });
  };

  const setActiveStep = (index: number) => {
    dispatch({
      type: WizardActionTypes.WIZARD_SET_ACTIVE_STEP_INDEX,
      payload: index,
    });
  };

  const setActiveStepComplete = () => {
    dispatch({
      type: WizardActionTypes.WIZARD_SET_ACTIVE_STEP_COMPLETE,
    });
  };

  const setNextStep = () => {
    // TODO: add goto index page
    dispatch({
      type: WizardActionTypes.WIZARD_SET_NEXT_STEP,
    });
  };

  const setPreviousStep = () => {
    dispatch({
      type: WizardActionTypes.WIZARD_SET_PREVIOUS_STEP,
    });
  };

  const contextValue = {
    groups,
    title: router.query.type ? (router.query.type as string) : '',
    navigation,
    overviews,
    overviewPercentages,
    sectionPercentages,
    activeGroupIndex,
    activeStepIndex,
    activeSectionIndex,
    buttonText,
    buttonStatus,
    setActiveSection,
    setActiveStep,
    setActiveStepComplete,
    setPreviousStep,
    setNextStep,
    isLoading,
    error,
  };
  console.log('context');
  return <EnterpriseContext.Provider value={contextValue}>{children}</EnterpriseContext.Provider>;
};
