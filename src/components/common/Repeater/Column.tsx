import { ColumnDirective } from '@syncfusion/ej2-react-grids';
import React from 'react';

const RepeaterColumn = React.forwardRef<any, any>((props, ref) => {
  return <ColumnDirective {...props} ref={ref} />;
});

export default RepeaterColumn;
