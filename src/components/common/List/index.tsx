import { arrayMoveImmutable } from '@helpers';
import React, { Component } from 'react';
import { IRepearProps, Row } from './models';
import { RepeaterHeader } from './repeaterHeader';
import { RepeaterSortableList } from './repeaterRow';
import { RepeaterContainer, EmptyRepeater } from './repeaterStyles';

export const Repeater: React.FC<IRepearProps> = ({
  columnTemplate,
  rows,
  showCheckbox,
  showPosition,
  showReorder,
  showExpand,
  showAdd,
  expandOnClick,
  onCreateOption,
}: IRepearProps) => {
  const [stateRows, setStateRows] = React.useState<Row[]>(rows);

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setStateRows((stateRow) => {
      return arrayMoveImmutable(stateRow, oldIndex, newIndex);
    });
  };

  const handleCheckChanged = (index: number) => {
    const tempRows = [...stateRows];
    tempRows[index].checked = !rows[index].checked;
    setStateRows(rows);
  };

  const handleCheckAll = (isChecked: boolean) => {
    stateRows.map((tempRow) => {
      return { ...tempRow, checked: isChecked };
    });
    setStateRows(rows);
  };

  const handleInputChanged = (rowIndex: number, columnIndex: number, value: string) => {
    const tempRows = [...stateRows];
    tempRows[rowIndex].data[columnIndex] = value;
    setStateRows(tempRows);
  };

  const handleSelectChanged = (selectedValue: any, columnIndex: number, rowIndex: number) => {
    const tempRows = [...stateRows];
    tempRows[rowIndex].data[columnIndex] = selectedValue.value;
    setStateRows(tempRows);
  };

  const handleAddRow = () => {
    const tempRows = [...stateRows];
    tempRows.splice(0, 0, { checked: false, data: [''], id: tempRows[tempRows.length - 1].id + 1 });
    setStateRows(tempRows);
  };

  const columnWidth = 100 / Object.keys(columnTemplate).length;

    return null;
};

export default Repeater;
