import React from 'react';
import { Grid, GridComponent, GridModel, GridTypecast } from '@syncfusion/ej2-react-grids';
import { useGridAsync } from '@hooks/gridHook';
import { API_ROUTES } from '@constants/apiRoutes';

interface RProps extends Partial<Grid> {
  state?: Readonly<{
    children?: React.ReactNode | React.ReactNode[];
  }> &
    Readonly<(GridModel & any) | GridTypecast>;
  setState?: any;
  getDefaultAttributes?: any;
  initRenderCalled?: boolean;
  checkInjectedModules?: any;
  directivekeys?: {
    [key: string]: Record<string, unknown>;
  };
  immediateRender?: any;
  props?: Readonly<{
    children: React.ReactNode | React.ReactNode[];
  }> &
    Readonly<(GridModel & any) | GridTypecast>;
  forceUpdate?: (callBack?: () => any) => void;
  context?: Record<string, unknown>;
  portals?: any;
  isReactComponent?: Record<string, unknown>;
  refs?: {
    [key: string]: React.ReactInstance;
  };
  url: string;
  children?: any;
  mode?: 'Normal' | 'Dialog' | 'Batch';
}

const RepeaterGrid = React.forwardRef<GridComponent | null, RProps>((props, ref) => {
  const { children, url, dataBound, dataStateChange, dataSourceChanged, mode, ...rest } = props;
  const gridRef = ref as React.MutableRefObject<GridComponent | null>;
  const {
    dataStateChange: dataStateChangeParent,
    dataSourceChanged: dataSourceChangedParent,
    renderComplete: renderCompleteParent,
  } = useGridAsync(url);

  const setRef = React.useCallback(
    (node) => {
      gridRef.current = node;
      console.log(node);
    },
    [gridRef]
  );

  return (
    <GridComponent
      ref={setRef}
      editSettings={{ allowEditing: true, allowAdding: true, allowDeleting: true, mode }}
      toolbar={['Add', 'Edit', 'Delete', 'Update', 'Cancel']}
      allowPaging
      pageSettings={{ pageSize: 10 }}
      dataBound={async () => {
        if (
          gridRef &&
          gridRef.current &&
          gridRef.current.dataSource instanceof Array &&
          !(gridRef.current.dataSource as Record<string, unknown>[]).length
        ) {
          const data = await renderCompleteParent();
          gridRef.current.dataSource = data;
        }
      }}
      dataStateChange={async (state) => {
        if (gridRef.current) {
          const test = await dataStateChangeParent(state);
          gridRef.current.dataSource = test;
        }
      }}
      dataSourceChanged={async (state) => {
        const response = await dataSourceChangedParent(state);
        state.endEdit();
        /*
        if (!response.created) {
          console.log(gridRef.current);
          response.errors?.forEach((item) => {
            if (gridRef.current && item.name) {
              const field = gridRef.current.getColumnByField(item.name);
              field.validationRules = {
                required: [true, item.message.toString()],
              };
              console.log(field);
            }
          });
        }
        */
      }}
      {...rest}
    >
      {children}
    </GridComponent>
  );
});

export default RepeaterGrid;
