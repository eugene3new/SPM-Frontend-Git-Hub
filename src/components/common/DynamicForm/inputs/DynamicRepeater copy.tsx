import Repeater from '@common/Repeater';
/*
import { IColumn, IOptions, IWizardColumn } from '@common/Repeater/models';

import RepeaterHeader from '@common/Repeater/repeaterHeader';
import { RepeaterSortableList } from '@common/Repeater/repeaterRow';
import { RepeaterContainer } from '@common/Repeater/repeaterStyles';
*/
import { useAxiosNextAuth } from '@hooks/requestHook';
import { FieldHookConfig, useField } from 'formik';
import React from 'react';
import { SingleValue } from 'react-select';

interface IListItems {
  value: string;
  text: string;
}

type DynamicTextInputProps = {
  // columns: IWizardColumn[];
  rows: string[];
};

export const DynamicRepater = ({ rows }: DynamicTextInputProps) => {
  const API = useAxiosNextAuth();
  // const [repeaterColumns, setRepeaterColumns] = React.useState<IColumn[]>([]);

  const onExpandClick = () => {
    console.log('expand');
  };

  const handleAddRow = () => {
    console.log('expand');
  };
  /*
  const onFieldChange = (fieldName: string, fieldValue: string | SingleValue<IOptions>) => {
    console.log(fieldName, fieldValue);
  };
*/
  return null;
  /*
  return (
    <RepeaterContainer>
      <RepeaterHeader rows={rows} expandOnClick={onExpandClick} addRow={handleAddRow} />
      <RepeaterSortableList columns={columns} onFieldChange={onFieldChange} lockAxis="y" useDragHandle />
    </RepeaterContainer>
  );
  */
};
