import React from 'react';
import { FormCheck } from 'react-bootstrap';
import { PlusIcon, ScreenFullIcon } from '@primer/octicons-react';
import {
  RepeaterRow,
  RepeaterTextCell,
  RepeaterNumericCell,
  RepeaterCheck,
  RepeaterHeaderIcon,
  RepeaterCustomContainer,
  RepeaterPosition,
} from './repeaterStyles';
import { Column } from './models';

interface IRepeaterHeaderProps {
  columnTemplate: Column[];
  handleCheckAll: (isChecked: boolean) => void;
  showCheckbox: boolean;
  showPosition: boolean;
  showExpand: boolean;
  showAdd: boolean;
  columnWidth: number;
  expandOnClick: () => void;
  addRow: () => void;
}

export const RepeaterHeader: React.FC<IRepeaterHeaderProps> = ({
  columnTemplate,
  handleCheckAll,
  showCheckbox,
  showPosition,
  showExpand,
  showAdd,
  columnWidth,
  expandOnClick,
  addRow,
}: IRepeaterHeaderProps) => {
  return (
    <RepeaterRow className="header">
      {showCheckbox && (
        <RepeaterCheck>
          <FormCheck onChange={(event) => handleCheckAll(event.target.checked)} />
        </RepeaterCheck>
      )}
      <RepeaterCustomContainer>
        {columnTemplate.map((column) => {
          switch (column.type) {
            case 'Numeric':
              return (
                <RepeaterNumericCell key={column.title} width={columnWidth}>
                  {column.title}
                </RepeaterNumericCell>
              );
            default:
              return (
                <RepeaterTextCell key={column.title} width={columnWidth}>
                  {column.title}
                </RepeaterTextCell>
              );
          }
        })}
      </RepeaterCustomContainer>
      {showPosition && <RepeaterPosition>Position</RepeaterPosition>}
      {showAdd && (
        <RepeaterHeaderIcon onClick={addRow}>
          <PlusIcon size={26} />
        </RepeaterHeaderIcon>
      )}
      {showExpand && (
        <RepeaterHeaderIcon onClick={() => expandOnClick}>
          <ScreenFullIcon size={26} />
        </RepeaterHeaderIcon>
      )}
    </RepeaterRow>
  );
};

export default RepeaterHeader;
