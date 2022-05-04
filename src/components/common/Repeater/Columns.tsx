import { ColumnsDirective, GridColumnDirTypecast } from '@syncfusion/ej2-react-grids';
import React from 'react';

const RepeaterColumns = React.forwardRef<any, any>(({ children }, ref) => {
  console.log(children);
  return <ColumnsDirective ref={ref}>{children}</ColumnsDirective>;
});
/*
const RepeaterColumns = ({ children }: any) => {
  console.log(children);
  return <ColumnsDirective>{children}</ColumnsDirective>;
};
*/

export default RepeaterColumns;
