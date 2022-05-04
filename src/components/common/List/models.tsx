export type Column = {
  title: string;
  type: 'Text' | 'Numeric' | 'Input' | 'List';
  listItems?: [{ value: string; text: string }];
};

export type Row = {
  id: number;
  checked: boolean;
  data: string[];
};

export interface IRepearProps {
  columnTemplate: Column[];
  rows: Row[];
  showCheckbox: boolean;
  showPosition: boolean;
  showReorder: boolean;
  showExpand: boolean;
  showAdd: boolean;
  expandOnClick: () => void;
  onCreateOption?: (e: any, rowIndex: number) => void;
}
