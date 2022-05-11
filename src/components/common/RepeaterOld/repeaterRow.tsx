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
    return (
      <ul style={{ width: '100%' }}>
        {data.map((column, index) => (
          <RowContextProvider key={column.id}>
            <SortableRow
              onChildRowAdd={(parentId) => {
                console.log(parentId);
                onChildRowAdd(parentId);
              }}
              onRowRemove={(id) => {
                onRowRemove(id);
              }}
              index={index}
              key={column.id}
              column={columns}
              data={column}
              onFieldChange={(id, name, value) => onFieldChange(id, name, value)}
            />
          </RowContextProvider>
        ))}
      </ul>
    );
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
    return (
      <RepeaterRow style={{ flexDirection: 'column' }}>
        <div style={{ display: 'flex', flex: 1 }}>
          <RepeaterCustomContainer>
            {column.map((field, index) => {
              switch (field.type) {
                case 'Autocomplete':
                  return (
                    <RepeaterSelectCell width={100} key={field.name}>
                      <CustomAutoComplete
                        name={field.name}
                        value={data.values[index]}
                        onChange={(name, value) => {
                          onFieldChange(data.id, name, value);
                        }}
                        onCreateOption={(selectedValue) => onFieldChange(data.id, field.name, selectedValue)}
                        options={field.options || []}
                      />
                    </RepeaterSelectCell>
                  );
                case 'TextInput':
                  return (
                    <RepeaterCell width={100} key={field.name}>
                      <CustomTextInput
                        value={data.values[index]}
                        onChange={(value) => {
                          onFieldChange(data.id, field.name, value);
                        }}
                      />
                    </RepeaterCell>
                  );
                default:
                  return null;
              }
            })}
          </RepeaterCustomContainer>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChildRowAdd(data.id);
            }}
          >
            <RepeaterHeaderIcon>
              <PlusIcon size={26} />
            </RepeaterHeaderIcon>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRowRemove(data.id);
            }}
          >
            <RepeaterHeaderIcon>
              <ArchiveIcon size={26} />
            </RepeaterHeaderIcon>
          </button>
        </div>
        {data.children && (
          <div style={{ display: 'flex', flex: 1, marginLeft: 30 }}>
            <RepeaterSortableList
              lockAxis="y"
              useDragHandle
              onRowRemove={(id) => onRowRemove(id)}
              onChildRowAdd={(parentId) => {
                onChildRowAdd(parentId);
              }}
              columns={column}
              data={data.children}
              onFieldChange={(id, name, value) => {
                onFieldChange(id, name, value);
              }}
            />
          </div>
        )}
      </RepeaterRow>
    );
  }
);
