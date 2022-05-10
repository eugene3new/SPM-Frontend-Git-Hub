import React, { Component } from 'react';
import { SortableElement, SortableHandle, SortableContainer } from 'react-sortable-hoc';
import Creatable from 'react-select/creatable';

import { GrabberIcon, PlusIcon, ArchiveIcon } from '@primer/octicons-react';
import { FormCheck, FormControl } from 'react-bootstrap';
import { SingleValue } from 'react-select';
import { useAxiosNextAuth } from '@hooks/requestHook';
import { useAutoCompleteOptions } from '@hooks/fieldHook';
import { RowContext, RowContextProvider } from 'context/RowContext';
import { useFormRowData } from '@hooks/contextHook';
import {
  RepeaterCell,
  RepeaterCustomContainer,
  RepeaterGrabber,
  RepeaterHeaderIcon,
  RepeaterRow,
  RepeaterSelectCell,
} from './repeaterStyles';
import { IOptions, IWizardColumn, IWizardField } from './models';

export interface IValue {
  id: number;
  name: string;
}

export interface IRepeaterData {
  id: number;
  values: string[];
  children?: IRepeaterData[];
}

export const RepeaterSortableList = SortableContainer(
  ({
    columns,
    data,
    onFieldChange,
    onChildRowAdd,
    onRowRemove,
  }: {
    columns: IWizardField[];
    data: IRepeaterData[] | undefined;
    onFieldChange: (id: number, name: string, value: string) => void;
    onRowRemove: (id: number) => void;
    onChildRowAdd: (parentId: number | null) => void;
  }) => {
    if (!data) {
      return null;
    }
    return null;
  }
);

const DragHandle = SortableHandle(() => {
  return (
    <RepeaterGrabber>
      <GrabberIcon size={26} />
    </RepeaterGrabber>
  );
});

interface CustomAutoCompleteProps {
  onChange: (name: string, value: string) => void;
  onCreateOption: (value: string) => void;
  options: IOptions[] | string;
  name: string;
  value: string;
}

const CustomAutoComplete: React.FC<CustomAutoCompleteProps> = ({ onChange, onCreateOption, options, name, value }) => {
  const [selectedOption, setSelectedOption] = React.useState<SingleValue<IOptions | null>>(null);
  const { rowOptions, addRowOptions } = useFormRowData();

  React.useEffect(() => {
    if (rowOptions[name]) {
      const selectedValue: IOptions[] = rowOptions[name].filter((item) => item.value === value);
      if (selectedValue) {
        setSelectedOption(selectedValue[0]);
      }
    }
  }, [value, name, rowOptions]);

  const autoCompleteOptions = useAutoCompleteOptions(options);

  React.useEffect(() => {
    addRowOptions(name, autoCompleteOptions);
  }, [addRowOptions, name, autoCompleteOptions]);
  return (
    <Creatable
      value={selectedOption}
      name={name}
      onChange={(item) => {
        setSelectedOption(item);
        onChange(name, item ? item.value : '');
      }}
      onCreateOption={onCreateOption}
      options={rowOptions[name]}
      isMulti={false}
      /*
    value={field.options?.filter((selectedValue) =>
      value.data[columnIndex] ? value.data[columnIndex].split(',').includes(selectedValue.value) : false
    )}
    */
    />
  );
};

export const CustomTextInput: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => {
  const [text, setText] = React.useState<string>(value);
  return (
    <FormControl
      value={text}
      onBlur={(event) => onChange(event.target.value)}
      onChange={(event) => {
        setText(event.target.value);
      }}
    />
  );
};

export const SortableRow = SortableElement(
  ({
    column,
    onFieldChange,
    onChildRowAdd,
    onRowRemove,
    data,
  }: {
    column: IWizardField[];
    data: IRepeaterData;
    onFieldChange: (id: number, name: string, value: string) => void;
    onChildRowAdd: (parentId: number | null) => void;
    onRowRemove: (id: number) => void;
  }) => {
    return null;
  }
);
