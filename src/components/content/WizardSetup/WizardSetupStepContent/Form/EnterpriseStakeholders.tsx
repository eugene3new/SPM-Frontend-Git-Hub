import { API_ROUTES } from '@constants/apiRoutes';
import { useGridChildren } from '@hooks/gridHook';
import { ColumnDirective, ColumnsDirective, DetailRow, Edit, GridComponent, Inject, Page, Toolbar } from '@syncfusion/ej2-react-grids';
import * as React from 'react';
import RepeaterGrid from '@common/Repeater';
import RepeaterColumns from '@common/Repeater/Columns';
import RepeaterColumn from '@common/Repeater/Column';
import { WizardSetupStepContentProps } from '@content/WizardSetup/models';

const EnterpriseStakeholders: React.FC<WizardSetupStepContentProps> = () => {
  const gridRef = React.useRef<GridComponent | null>(null);
  const childGrid = useGridChildren(
    API_ROUTES.functionalDivisionDefinition,
    [
      { field: 'id', headerText: 'ID', isPrimaryKey: true, width: 120, visible: false },
      { field: 'name', headerText: 'Name', width: 120 },
    ],
    { hasNChildren: true }
  );
  return (
    <div className="control-pane">
      <div className="control-section">
        <RepeaterGrid ref={gridRef} url={API_ROUTES.enterpriseStakleholders} mode="Dialog">
          <ColumnsDirective>
            <ColumnDirective field="id" headerText="ID" textAlign="Right" width="120" visible={false} isPrimaryKey />
            <ColumnDirective field="isOrganisation" editType="booleanedit" headerText="Organisation" width="120" />
            <ColumnDirective field="firstName" headerText="Forename" width="120" />
            <ColumnDirective field="secondName" headerText="Surname" width="120" />
            <ColumnDirective field="email" headerText="Email" width="120" />
            <ColumnDirective field="role" headerText="Role" width="120" />
            <ColumnDirective field="phone" headerText="Phone number" width="120" />
            <ColumnDirective field="preferredContactMethod" headerText="Preferred Contact Method" width="120" />
            <ColumnDirective field="organisationName" headerText="Organisation Name" width="120" />
          </ColumnsDirective>
          <Inject services={[Edit, Toolbar, Page, DetailRow]} />
        </RepeaterGrid>
      </div>
    </div>
  );
};
export default EnterpriseStakeholders;
