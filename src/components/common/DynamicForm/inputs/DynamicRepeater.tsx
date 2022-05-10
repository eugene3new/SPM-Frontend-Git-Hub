import { IColumn, IOptions, IWizardColumn, IWizardField } from '@common/RepeaterOld/models';
import RepeaterHeader from '@common/RepeaterOld/repeaterHeader';
import { IRepeaterData, RepeaterSortableList } from '@common/RepeaterOld/repeaterRow';
import { RepeaterContainer } from '@common/RepeaterOld/repeaterStyles';
import { useAxiosNextAuth } from '@hooks/requestHook';
import { FieldHookConfig, useField } from 'formik';
import React from 'react';
import { SingleValue } from 'react-select';

interface IListItems {
  value: string;
  text: string;
}

type DynamicTextInputProps = {
  columns: IWizardField[];
  rows: string[];
  data: IRepeaterData[];
  handleAddRow: (parentId: number | null) => void;
  handleRemoveRow: (id: number) => void;
  handleFieldChange: (id: number, fieldName: string, fieldValue: string) => void;
};

export const DynamicRepater = ({ columns, rows, data, handleAddRow, handleFieldChange, handleRemoveRow }: DynamicTextInputProps) => {
  const onExpandClick = () => {
    console.log('expand');
  };

  return null;
};
