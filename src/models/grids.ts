import { Column, ColumnModel } from '@syncfusion/ej2-react-grids';

export interface IChildrenGridProps {
  autoCompleteFields?: {
    name: string;
    dataSource: any;
  }[];
  hasNChildren?: boolean;
}
