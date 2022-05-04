export interface IOptions {
  value: string;
  label: string;
}

export interface IWizardField {
  name: string;
  type: 'Autocomplete' | 'Text' | 'TextInput';
  options?: IOptions[] | string;
}

export interface IField {
  name: string;
  type: 'Autocomplete' | 'Text' | 'TextInput';
  options?: IOptions[];
}

export interface IColumn {
  id: number;
  title: string;
  fields: IField[];
}

export interface IWizardColumn {
  id: number;
  title?: string;
  fields: IWizardField[];
}

export interface IRepeaterProps {
  columns: IColumn[];
  rows: string[];
  expandOnClick: () => void;
  onCreateOption?: (e: any, rowIndex: number) => void;
}
