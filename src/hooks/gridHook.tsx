import { errorObjToArray, getPaginationData } from '@helpers';
import { Query } from '@syncfusion/ej2-data';
import {
  Column,
  ColumnModel,
  DataResult,
  DataSourceChangedEventArgs,
  DataStateChangeEventArgs,
  GridComponent,
  GridModel,
} from '@syncfusion/ej2-react-grids';
import clone from 'just-clone';
import { IChildrenGridProps } from 'models/grids';
import { IDataSourceChanged, IErrorResponse, IPatchRequest } from 'models/request';
import React from 'react';
import { useAxiosNextAuth } from './requestHook';

export const useGridCrud = (url: string) => {
  const API = useAxiosNextAuth();

  const getData = React.useCallback(
    async (state: DataStateChangeEventArgs, param?: string): Promise<DataResult> => {
      const take = state.take ? state.take : 10;
      const skip = state.skip ? state.skip : 0;
      const pageNumber = skip / take + 1;
      const query = `PageNumber=${pageNumber}&PageSize=${take}`;
      const response = await API.get(`${url}${param ? `/${param}` : ''}?${query}`);
      const pagination = getPaginationData(response.headers['x-pagination']);
      return {
        count: pagination.totalCount,
        result: response.data,
      };
    },
    [API, url]
  );

  const readRecords = React.useCallback(
    (state: DataStateChangeEventArgs, param?: string): Promise<DataResult> => {
      const data = getData(state, param);
      return data;
    },
    [getData]
  );

  const createRecord = async (state: DataSourceChangedEventArgs): Promise<DataResult> => {
    const response: any = await API.post(url, state.data);
    return response.data;
  };

  const deleteRecord = async (state: DataSourceChangedEventArgs): Promise<DataResult | null> => {
    if (state.data && Array.isArray(state.data)) {
      const deletedItem: any = state.data[0];
      const response: any = await API.delete(`${url}?id=${deletedItem.id}`);
      return response.data;
    }
    return null;
  };

  const updateRecord = async (state: DataSourceChangedEventArgs): Promise<DataResult> => {
    const { id, ...other } = state.data as any;
    const patchObject: IPatchRequest[] = [];
    Object.keys(other).forEach((key) => {
      if (key === 'children' || key === 'parent') {
        return;
      }
      patchObject.push({
        path: key,
        op: 'replace',
        value: other[key],
      });
    });
    const response = await API.patch(`${url}/${id}`, patchObject);
    return response.data;
  };

  return {
    readRecords: React.useCallback((state, additionalParam?: string) => readRecords(state, additionalParam), [readRecords]),
    createRecord,
    deleteRecord,
    updateRecord,
  };
};

export const useGridAsync = (gridurl: string) => {
  const { readRecords, createRecord, deleteRecord, updateRecord } = useGridCrud(gridurl);

  const dataStateChange = React.useCallback(
    async (state: DataStateChangeEventArgs, param?: string) => {
      const gridData = await readRecords(state, param);
      return gridData;
    },
    [readRecords]
  );
  const renderComplete = React.useCallback(
    (param?: string) => {
      const state = { skip: 0, take: 10 };
      return dataStateChange(state, param);
    },
    [dataStateChange]
  );

  const dataSourceChanged = React.useCallback(
    async (state: DataSourceChangedEventArgs): Promise<IDataSourceChanged> => {
      console.log(state);
      if (state) {
        try {
          if (state.action === 'add') {
            await createRecord(state);
          } else if (state.action === 'edit') {
            await updateRecord(state);
          } else if (state.requestType === 'delete') {
            await deleteRecord(state);
          }
          return {
            created: true,
            errors: [],
          };
        } catch (e: any) {
          return {
            created: false,
            errors: errorObjToArray(e.errors),
          };
        }
      }
      return {
        created: true,
        errors: [{ name: null, message: ['There was an error'] }],
      };
    },
    [createRecord, deleteRecord, updateRecord]
  );

  return {
    renderComplete: React.useCallback((aditionalParam?: string) => renderComplete(aditionalParam), [renderComplete]),
    dataSourceChanged: React.useCallback((state: DataSourceChangedEventArgs) => dataSourceChanged(state), [dataSourceChanged]),
    dataStateChange: React.useCallback((state, additionalParam?: string) => dataStateChange(state, additionalParam), [dataStateChange]),
  };
};

export const useGridAutoCompleteOptions = (
  url: string,
  gridRef: React.MutableRefObject<GridComponent | null>,
  autoCompletefieldName?: string
) => {
  const API = useAxiosNextAuth();
  const [editOptions, setEditOptions] = React.useState<any>();

  const fetchOptions = React.useCallback(async () => {
    const response = await API.get<string[]>(url);
    const responseOptions = response.data.map((item) => {
      return { value: item, label: item };
    });
    setEditOptions(responseOptions);
  }, [API, url]);

  React.useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  React.useEffect(() => {
    if (editOptions && gridRef.current && autoCompletefieldName) {
      const field = gridRef.current.getColumnByField(autoCompletefieldName);
      if (field) {
        (field as any).edit.params.dataSource = editOptions;
      }
    }
  }, [editOptions, gridRef, autoCompletefieldName]);

  const editParamsAutoComplete = React.useMemo(() => {
    return {
      params: {
        actionComplete: () => {
          return false;
        },
        allowFiltering: true,
        popupHeight: '300px',
        fields: { value: 'value', text: 'label' },
        query: new Query(),
        dataSource: [],
      },
    };
  }, []);

  return [editParamsAutoComplete, editOptions];
};

export const useGridChildren = (url: string, columns: Column[] | string[] | ColumnModel[] | undefined, gridProps?: IChildrenGridProps) => {
  const { dataSourceChanged } = useGridAsync(url);
  const { renderComplete: childRenderComplete, dataStateChange: childDataStateChange } = useGridAsync(`${url}/children`);
  const childGridOptions: GridModel = React.useMemo(() => {
    return {
      columns,
      editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
      queryString: 'id',
      toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
      pageSettings: { pageSize: 10 },
      dataSource: [],
      allowPaging: true,
      async load() {
        const childGrid = this as GridModel;

        if (gridProps && gridProps.autoCompleteFields) {
          gridProps.autoCompleteFields.forEach((field) => {
            if (childGrid && childGrid.columns) {
              const index: number = childGrid.columns.findIndex((column: any) => column.field === field.name);
              if (index !== -1) {
                (childGrid.columns[index] as any).edit.params.dataSource = field.dataSource;
              }
            }
          });
        }
        if (gridProps && gridProps.hasNChildren) {
          const clonedGrid = clone(childGridOptions);
          clonedGrid.dataSource = [];
          childGrid.childGrid = clonedGrid;
        }
      },
      async dataStateChange(state: any) {
        const childGrid = this as GridModel;
        if (childGrid && childGrid.parentDetails) {
          childGrid.dataSource = await childDataStateChange(state, childGrid.parentDetails.parentKeyFieldValue);
        }
      },
      dataSourceChanged(state: any) {
        const childGrid = this as GridModel;
        const newState = state;
        if (childGrid && childGrid.parentDetails) {
          newState.data.parentId = childGrid.parentDetails.parentKeyFieldValue;
          dataSourceChanged(newState);
        }
      },
      async dataBound() {
        const childGrid = this as GridModel;
        if (
          childGrid &&
          childGrid.parentDetails &&
          childGrid.dataSource instanceof Array &&
          !(childGrid.dataSource as Record<string, unknown>[]).length
        ) {
          const response = await childRenderComplete(childGrid.parentDetails.parentKeyFieldValue);
          childGrid.dataSource = { ...childGrid.dataSource, ...response };
        }
      },
    };
  }, [childRenderComplete, childDataStateChange, dataSourceChanged, columns, gridProps]);

  return childGridOptions;
};
