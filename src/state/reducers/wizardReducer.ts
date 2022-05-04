import { wizardOverviewSectionData, wizardSetupData, wizardSetupSectionData } from '@content/WizardSetup/data';
import { IWizardMappedGroup, IWizardMappedOverview, IWizardNavigation } from '@content/WizardSetup/models';
import { WizardActionTypes } from 'state/action-types/wizardActionType';
import { WizardActions } from 'state/actions/wizardActions';

interface IWizardState {
  navigation: IWizardNavigation[];
  groups: IWizardMappedGroup[];
  error: string | null;
  loading: boolean;
  overviews: IWizardMappedOverview[];
  activeGroupIndex: null | number;
  activeSectionIndex: null | number | undefined;
  activeStepIndex: null | number;
}

export const wizardInitialState = {
  groups: [],
  navigation: [],
  error: null,
  loading: false,
  overviews: [],
  activeGroupIndex: null,
  activeSectionIndex: null,
  activeStepIndex: null,
};

const wizardReducer = (state: IWizardState, action: WizardActions): IWizardState => {
  switch (action.type) {
    case WizardActionTypes.WIZARD_GROUP_LOADING:
      return { ...state, loading: true };
    case WizardActionTypes.WIZARD_GROUP_SUCCESS: {
      const navigation: IWizardNavigation[] = [];
      const overviews: IWizardMappedOverview[] = [];
      const groups: IWizardMappedGroup[] = [];
      action.payload.forEach((group, groupIndex) => {
        groups.push({
          id: group.id,
          sections: [],
        });
        const navigationName = wizardSetupData[group.id];
        if (navigationName) {
          navigation.push({
            id: group.id,
            title: navigationName,
            href: `/setup/${navigationName}`,
            active: false,
          });
        }
        const overview = wizardOverviewSectionData[group.id];
        if (overview) {
          const { backgroundColor, imageUrl, description, route, percentage, title } = overview;
          overviews.push({
            id: group.id,
            backgroundColor,
            imageUrl,
            description,
            route,
            percentage,
            title,
          });
        }
        const groupData = wizardSetupSectionData[group.id];
        if (groupData) {
          group.sections.forEach((section, sectionIndex) => {
            const sectionData = groupData[section.id];
            if (sectionData) {
              groups[groupIndex].sections.push({
                id: section.id,
                details: sectionData.details,
                label: sectionData.label,
                percentage: sectionData.percentage,
                infoTitle: sectionData.infoTitle,
                steps: [],
              });
              section.steps.forEach((step) => {
                const stepData = sectionData.steps[step.id];
                if (stepData) {
                  groups[groupIndex].sections[sectionIndex].steps.push({
                    label: stepData.label,
                    id: step.id,
                    isComplete: step.isComplete,
                    url: stepData.url,
                    config: stepData.config,
                  });
                }
              });
            }
          });
        }
      });
      return {
        ...state,
        navigation,
        groups,
        overviews,
        loading: false,
        error: null,
      };
    }
    case WizardActionTypes.WIZARD_SET_ACTIVE_GROUP: {
      let activeGroupIndex: number | null = 0;
      const modifiedNavigation = state.navigation.map((group, index) => {
        if (group.href === action.payload) {
          activeGroupIndex = index;

          return { ...group, active: true };
        }
        return { ...group, active: false };
      });
      return {
        ...state,
        navigation: modifiedNavigation,
        activeGroupIndex,
        activeSectionIndex: null,
        activeStepIndex: null,
      };
    }
    case WizardActionTypes.WIZARD_SET_ACTIVE_SECTION_INDEX: {
      let activeSectionIndex: number | null | undefined;
      if (state.activeGroupIndex !== null && state.groups[state.activeGroupIndex] !== undefined) {
        activeSectionIndex = action.payload;
      } else {
        activeSectionIndex = undefined;
      }

      return { ...state, activeSectionIndex, activeStepIndex: 0 };
    }
    case WizardActionTypes.WIZARD_SET_ACTIVE_STEP_INDEX: {
      return { ...state, activeStepIndex: action.payload };
    }

    case WizardActionTypes.WIZARD_SET_ACTIVE_STEP_COMPLETE: {
      const { activeGroupIndex, activeSectionIndex, activeStepIndex } = state;
      if (activeGroupIndex !== null && activeSectionIndex !== undefined && activeSectionIndex !== null && activeStepIndex !== null) {
        const groups: IWizardMappedGroup[] = JSON.parse(JSON.stringify(state.groups));
        groups[activeGroupIndex].sections[activeSectionIndex].steps[activeStepIndex].isComplete = true;
        return { ...state, groups };
      }
      return state;
    }
    case WizardActionTypes.WIZARD_SET_NEXT_STEP:
    case WizardActionTypes.WIZARD_SET_PREVIOUS_STEP: {
      const { activeGroupIndex, activeSectionIndex, activeStepIndex, groups } = state;
      let wizardGroupIndex = activeGroupIndex;
      let wizardSectionIndex = activeSectionIndex;
      let wizardStepIndex = activeStepIndex;
      const operation = (value: number) => (action.type === WizardActionTypes.WIZARD_SET_PREVIOUS_STEP ? value - 1 : value + 1);

      if (activeGroupIndex !== null && activeSectionIndex !== null && activeSectionIndex !== undefined && activeStepIndex !== null) {
        if (
          groups[activeGroupIndex].sections[activeSectionIndex].steps.length - 1 === activeStepIndex &&
          action.type === WizardActionTypes.WIZARD_SET_NEXT_STEP
        ) {
          if (groups[activeGroupIndex].sections.length - 1 === activeSectionIndex) {
            if (groups.length - 1 === activeGroupIndex) {
              // need info for this case if we get to the end of the group should we go to the next
            } else {
              const updatedGroupIndex = operation(activeGroupIndex);
              if (groups[updatedGroupIndex]) {
                wizardGroupIndex = updatedGroupIndex;
                wizardSectionIndex = 0;
                wizardStepIndex = 0;
              }
            }
          } else {
            const updatedSectionIndex = operation(activeSectionIndex);
            if (groups[activeGroupIndex].sections[updatedSectionIndex]) {
              wizardSectionIndex = updatedSectionIndex;
              wizardStepIndex = 0;
            }
          }
        } else {
          const updatedStepIndex = operation(activeStepIndex);
          console.log('step');
          if (groups[activeGroupIndex].sections[activeSectionIndex].steps[updatedStepIndex]) {
            wizardStepIndex = updatedStepIndex;
          }
        }
      }
      return { ...state, activeGroupIndex: wizardGroupIndex, activeSectionIndex: wizardSectionIndex, activeStepIndex: wizardStepIndex };
    }
    case WizardActionTypes.WIZARD_GROUP_ERROR:
      return { ...wizardInitialState, error: action.payload };
    default:
      return state;
  }
};

export default wizardReducer;
