export interface IEnterpriseGroupItems {
  isComplete: boolean;
  label: string;
  infoBox?: {
    title: string;
    description: string;
  };
  percentage: number;
}

export interface IEnterpriseSubGroupItems {
  label: string;
  isComplete: boolean;
}

export const enterpriseGroupItemsArray: IEnterpriseGroupItems[] = [
  {
    isComplete: true,
    label: 'Enterprise',
    infoBox: {
      title: 'Enterprise',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. ',
    },
    percentage: 60,
  },
  {
    isComplete: false,
    label: 'Business Details',
    percentage: 0,
  },
  {
    isComplete: false,
    label: 'Currency Rules',
    percentage: 0,
  },
  {
    isComplete: false,
    label: 'Lorem',
    percentage: 0,
  },
];

export const enterpriseSubGroupItems: IEnterpriseSubGroupItems[] = [
  {
    label: 'Enterprise Details',
    isComplete: true,
  },
  {
    label: 'Enterprise Stakeholders',
    isComplete: true,
  },
  {
    label: 'Program Constraints',
    isComplete: true,
  },
  {
    label: 'Lorem',
    isComplete: false,
  },
  {
    label: 'Ipsum',
    isComplete: false,
  },
];

export enum WizardStepKey {
  ENTERPRISE_DETAILS = 'enterpriseDetails',
  ENTERPRISE_TERITORY = 'enterpriseTeritory',
  ENTERPRISE_BUSINESS_UNIT = 'enterpriseBusinessUnit',
  ENTERPRISE_FUNCTIONAL_DIVISIONS = 'enterpriseFunctionalDivisions',
  ENTERPRISE_STAKEHOLDERS = 'enterpriseStakeholders',
  ENTERPRISE_RESOURCE_DEFINITION = 'enterpriseResourceDefinition',
  ENTERPRISE_CUSTOM_FILTERS = 'enterpriseCustomFilters',
}
