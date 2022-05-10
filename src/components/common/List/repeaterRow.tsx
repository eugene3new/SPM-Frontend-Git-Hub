import React, { Component } from 'react';
import { SortableElement, SortableHandle, SortableContainer } from 'react-sortable-hoc';
import Creatable from 'react-select/creatable';

import { GrabberIcon } from '@primer/octicons-react';
import { FormCheck, FormControl } from 'react-bootstrap';
import {
  RepeaterRow,
  RepeaterTextCell,
  RepeaterNumericCell,
  RepeaterCheck,
  RepeaterGrabber,
  RepeaterCustomContainer,
  RepeaterCell,
  RepeaterPosition,
  RepeaterSelectCell,
} from './repeaterStyles';
import { Column, Row } from './models';

export const RepeaterSortableList = SortableContainer(
  ({
    rows,
    columnTemplate,
    handleCheckChanged,
    handleInputChanged,
    handleSelectChanged,
    handleCreateOption,
    columnWidth,
    showCheckbox,
    showPosition,
    showReorder,
  }: {
    rows: Row[];
    columnTemplate: Column[];
    handleCheckChanged: (rowIndex: number) => void;
    handleInputChanged: (rowIndex: number, columnIndex: number, value: string) => void;
    handleSelectChanged: any;
    handleCreateOption: any;
    columnWidth: number;
    showCheckbox: boolean;
    showPosition: boolean;
    showReorder: boolean;
  }) => {
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

export const SortableRow = SortableElement(
  ({
    value,
    columnTemplate,
    handleCheckChanged,
    handleInputChanged,
    handleSelectChanged,
    handleCreateOption,
    rowIndex,
    columnWidth,
    showCheckbox,
    showPosition,
    showReorder,
  }: {
    value: Row;
    columnTemplate: Column[];
    handleCheckChanged: (rowIndex: number) => void;
    handleInputChanged: (rowIndex: number, columnIndex: number, value: string) => void;
    handleSelectChanged: (selectedValue: any, columnIndex: number, rowIndex: number) => void;
    handleCreateOption: () => void;
    rowIndex: number;
    columnWidth: number;
    showCheckbox: boolean;
    showPosition: boolean;
    showReorder: boolean;
  }) => {
    return (
      <RepeaterRow className={value.checked ? 'checked' : ''}>
        {showCheckbox && (
          <RepeaterCheck>
            <FormCheck onChange={() => handleCheckChanged(rowIndex)} checked={value.checked} />
          </RepeaterCheck>
        )}
        <RepeaterCustomContainer>
          {columnTemplate.map((column, columnIndex: number) => {
            switch (column.type) {
              case 'Text':
                return <RepeaterTextCell width={columnWidth}>{value.data[columnIndex]}</RepeaterTextCell>;
              case 'Numeric':
                return <RepeaterNumericCell width={columnWidth}>{value.data[columnIndex]}</RepeaterNumericCell>;
              case 'List':
                console.log(column.listItems);
                return (
                  <RepeaterSelectCell width={columnWidth}>
                    <Creatable
                      onChange={(selectedValue) => handleSelectChanged(selectedValue, columnIndex, rowIndex)}
                      onCreateOption={handleCreateOption}
                      options={column.listItems}
                      isMulti={false}
                      value={column.listItems?.filter((selectedValue) =>
                        value.data[columnIndex] ? value.data[columnIndex].split(',').includes(selectedValue.value) : false
                      )}
                    />
                  </RepeaterSelectCell>
                );
              case 'Input':
                return (
                  <RepeaterCell width={columnWidth}>
                    <FormControl
                      onChange={(event) => handleInputChanged(rowIndex, columnIndex, event.target.value)}
                      value={value.data[columnIndex]}
                    />
                  </RepeaterCell>
                );
              default:
                return null;
            }
          })}
        </RepeaterCustomContainer>
        {showPosition && <RepeaterPosition>{rowIndex + 1}</RepeaterPosition>}
        {showReorder && <DragHandle />}
      </RepeaterRow>
    );
  }
);
