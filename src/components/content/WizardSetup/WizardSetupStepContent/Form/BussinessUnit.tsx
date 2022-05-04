import { API_ROUTES } from '@constants/apiRoutes';
import { useGridChildren } from '@hooks/gridHook';
import { ColumnDirective, ColumnsDirective, DetailRow, Edit, GridComponent, Inject, Page, Toolbar } from '@syncfusion/ej2-react-grids';
import * as React from 'react';
import RepeaterGrid from '@common/Repeater';
import { WizardSetupStepContentProps } from '@content/WizardSetup/models';

const BussinessUnit: React.FC<WizardSetupStepContentProps> = () => {
  const gridRef = React.useRef<GridComponent | null>(null);
  const childGrid = useGridChildren(
    API_ROUTES.businessDefinition,
    [
      { field: 'id', headerText: 'ID', isPrimaryKey: true, width: 120, visible: false },
      { field: 'name', headerText: 'Name', width: 120 },
    ],
    { hasNChildren: true }
  );
  return (
    <div className="control-pane">
      <div className="control-section">
        <RepeaterGrid ref={gridRef} url={API_ROUTES.businessDefinition} childGrid={childGrid}>
          <ColumnsDirective>
            <ColumnDirective field="id" headerText="ID" textAlign="Right" width="120" visible={false} isPrimaryKey />
            <ColumnDirective field="name" headerText="Name" width="120" />
          </ColumnsDirective>
          <Inject services={[Edit, Toolbar, Page, DetailRow]} />
        </RepeaterGrid>
      </div>
    </div>
  );
};

export default BussinessUnit;
