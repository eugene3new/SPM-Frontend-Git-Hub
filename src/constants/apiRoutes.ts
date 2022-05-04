const root = 'api';
const version = 'v1';

const base = `${root}/${version}`;
const territories = `${base}/territories`;
const businessUnit = `${base}/businessUnit`;
const functionalDivision = `${base}/functionalDivision`;

export const API_ROUTES = {
  wizardGroup: `${base}/wizardGroup`,

  enterpriseDetails: `${base}/enterprise`,

  autocompleteTerritories: `${base}/autocomplete`,
  territoryDefinition: `${territories}`,

  territoryChildren: `${territories}/children`,
  territories: `${territories}/predifined`,

  businessDefinition: `${businessUnit}`,
  businessDefinitionChildren: `${businessUnit}/children`,

  functionalDivisionDefinition: `${functionalDivision}`,
  functionalDivisionChildrenDefinition: `${functionalDivision}/children`,

  enterpriseStakleholders: `${base}/stakeholder`,

  resourceDefinition: `${base}/resources`,
  customFilters: `${base}/customFilter`,
};
