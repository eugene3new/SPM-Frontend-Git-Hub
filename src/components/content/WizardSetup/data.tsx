import { IDynamicFormBuilderItem } from '@common/DynamicForm';
import { API_ROUTES } from '@constants/apiRoutes';
import { IWizardMappedOverview, IWizardMappedSection, IWizardMappedStep } from './models';

export const wizardSetupData: Record<number, string> = {
  1: 'enterprise',
  2: 'portfolio',
  3: 'entity',
};

interface IWizardMappedSectionItems extends Omit<IWizardMappedSection, 'steps'> {
  steps: Record<number, IWizardMappedStep>;
}

export const wizardSetupSectionData: Record<number, Record<number, IWizardMappedSectionItems>> = {
  1: {
    1: {
      label: 'enterprise',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. ',
      infoTitle: 'enteprise_details',
      percentage: 0,
      steps: {
        1: {
          label: 'enterprise_details',
          url: API_ROUTES.enterpriseDetails,
          config: [
            {
              type: 'text',
              name: 'name',
              label: 'Enterprise name',
            },
            {
              type: 'textarea',
              name: 'description',
              label: 'Enterprise description',
              helpText: 'Lorem Ipsum dolor sit amnet',
            },
          ],
        },
        2: {
          label: 'teritory_definition',
          url: API_ROUTES.territoryDefinition,
          config: [
            {
              type: 'array',
              name: 'array',
              toggle: true,
              toggleLabel: 'Define Territories in SPM',
              children: [
                {
                  type: 'repeater',
                  name: 'territores',
                  rows: ['Teritory name'],
                },
              ],
            },
          ],
        },
        3: {
          label: 'business_unit_definition',
          url: API_ROUTES.businessDefinition,
          config: [
            {
              type: 'array',
              name: 'array',
              toggle: true,
              toggleLabel: 'Define Business Units in SPM',
              children: [
                {
                  type: 'repeater',
                  name: 'repeater',
                  rows: ['Teritory name'],
                },
              ],
            },
          ],
        },
        4: {
          label: 'functional_divisions_definition',
          url: API_ROUTES.functionalDivisionDefinition,
          config: [
            {
              type: 'array',
              name: 'array',
              toggle: true,
              toggleLabel: 'Define Functional Divisions in SPM',
              children: [
                {
                  type: 'repeater',
                  name: 'repeater',
                  rows: ['Teritory name'],
                },
              ],
            },
          ],
        },
        5: {
          label: 'enterprise_stakeholders',
          url: API_ROUTES.enterpriseStakleholders,
          config: [
            {
              type: 'text',
              name: 'organizationName',
              label: 'Organization name',
            },
            {
              type: 'text',
              name: 'mobileNumber',
              label: 'Mobile number',
            },
            {
              type: 'text',
              name: 'email',
              label: 'Email',
            },
            {
              type: 'select',
              options: [{ text: 'Email', value: '0' }],
              name: 'methodOfContact',
              label: 'Prefered method of contact',
            },
          ],
        },
        6: {
          label: 'resource_definition',
          url: API_ROUTES.resourceDefinition,
          config: [
            {
              type: 'repeater',
              name: 'repeater',
              rows: ['Teritory name'],
            },
          ],
        },
        7: {
          label: 'set_up_custom_filters',
          url: API_ROUTES.customFilters,
          config: [
            {
              type: 'array',
              name: 'array',
              toggle: true,
              toggleLabel: 'Define Business Units in SPM',
              children: [
                {
                  type: 'repeater',
                  name: 'territories',
                  rows: ['Teritory name'],
                },
              ],
            },
          ],
        },
      },
    },
    2: {
      label: 'strategy',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. ',
      infoTitle: 'business_details',
      percentage: 0,
      steps: {
        8: {
          label: 'weightings',
          url: API_ROUTES.enterpriseDetails,
          config: [
            {
              type: 'text',
              name: 'name',
              label: 'Enterprise name',
            },
            {
              type: 'textarea',
              name: 'description',
              label: 'Enterprise description',
              helpText: 'Lorem Ipsum dolor sit amnet',
            },
          ],
        },
        9: {
          label: 'strategies',
          url: API_ROUTES.enterpriseDetails,
          config: [
            {
              type: 'text',
              name: 'name',
              label: 'Enterprise name',
            },
            {
              type: 'textarea',
              name: 'description',
              label: 'Enterprise description',
              helpText: 'Lorem Ipsum dolor sit amnet',
            },
          ],
        },
        10: {
          label: 'risk_drivers',
          url: API_ROUTES.enterpriseDetails,
          config: [
            {
              type: 'text',
              name: 'name',
              label: 'Enterprise name',
            },
            {
              type: 'textarea',
              name: 'description',
              label: 'Enterprise description',
              helpText: 'Lorem Ipsum dolor sit amnet',
            },
          ],
        },
      },
    },
    3: {
      label: 'currency',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. ',
      infoTitle: 'currency_details',
      percentage: 0,
      steps: {
        8: {
          label: 'enterprise',
          url: '',
          config: [],
        },
      },
    },
    4: {
      label: 'detailed_settings',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. ',
      infoTitle: 'enteprise_details',
      percentage: 0,
      steps: {},
    },
  },
  2: {
    7: {
      label: 'enterprise2',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. ',
      infoTitle: 'enteprise_details',
      percentage: 0,
      steps: {},
    },
    5: {
      label: 'business3',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. ',
      infoTitle: 'business_details',
      percentage: 0,
      steps: {},
    },
    6: {
      label: 'currency4',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. ',
      infoTitle: 'currency_details',
      percentage: 0,
      steps: {},
    },
  },
};

export const wizardOverviewSectionData: Record<number, IWizardMappedOverview> = {
  1: {
    backgroundColor: 'orange',
    imageUrl: '',
    description: 'Some quick example text to build on the card title and make up the bulk of the card content.',
    route: '/setup/enterprise',
    percentage: 0,
    title: 'Enterprise Setup',
  },
  2: {
    backgroundColor: 'green',
    imageUrl: '',
    description: 'Some quick example text to build on the card title and make up the bulk of the card content.',
    route: '/setup/strategy',
    percentage: 0,
    title: 'Portfolio Setup',
  },
  3: {
    backgroundColor: 'purple',
    imageUrl: '',
    description: 'Some quick example text to build on the card title and make up the bulk of the card content.',
    route: '/setup/portfolio',
    percentage: 0,
    title: 'Entity Setup',
  },
};

export enum WizardStepIds {
  EnterpriseDetails = 1,
  TeritoryDefinition = 2,
  BusinessUnit = 3,
  FunctionalDivisions = 4,
  EnterpriseStakeholders = 5,
}
