import { API_ROUTES } from '@constants/apiRoutes';
import { useGridAutoCompleteOptions, useGridChildren } from '@hooks/gridHook';
import { ColumnDirective, ColumnsDirective, DetailRow, Edit, GridComponent, Inject, Page, Toolbar } from '@syncfusion/ej2-react-grids';
import * as React from 'react';
import RepeaterGrid from '@common/Repeater';
import RepeaterColumns from '@common/Repeater/Columns';
import RepeaterColumn from '@common/Repeater/Column';
import { WizardSetupStepContentProps } from '@content/WizardSetup/models';

const TerritoryDefinition: React.FC<WizardSetupStepContentProps> = () => {
  const gridRef = React.useRef<GridComponent | null>(null);
  const [editParams, editOptions] = useGridAutoCompleteOptions(API_ROUTES.autocompleteTerritories, gridRef, 'name');
  const childGrid = useGridChildren(
    API_ROUTES.territoryDefinition,
    [
      { field: 'id', headerText: 'ID', isPrimaryKey: true, width: 120, visible: false },
      { field: 'name', headerText: 'Name', width: 120, editType: 'dropdownedit', edit: editParams },
    ],
    {
      autoCompleteFields: [
        {
          name: 'name',
          dataSource: editOptions,
        },
      ],
      hasNChildren: true,
    }
  );
  return (
    <div className="control-pane">
      <div className="control-section">
        <RepeaterGrid ref={gridRef} url={API_ROUTES.territoryDefinition} childGrid={childGrid}>
          <ColumnsDirective>
            <ColumnDirective field="id" headerText="ID" textAlign="Right" width="120" visible={false} isPrimaryKey />
            <ColumnDirective field="name" headerText="Name" width="120" editType="dropdownedit" edit={editParams} />
          </ColumnsDirective>
          <Inject services={[Edit, Toolbar, Page, DetailRow]} />
        </RepeaterGrid>
      </div>
    </div>
  );
};

export default TerritoryDefinition;
