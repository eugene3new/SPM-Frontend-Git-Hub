import React from 'react';
import { PlusIcon, ScreenFullIcon } from '@primer/octicons-react';
import { RepeaterRow, RepeaterTextCell, RepeaterHeaderIcon, RepeaterCustomContainer } from './repeaterStyles';

interface IRepeaterHeaderProps {
  rows: string[];
  expandOnClick: () => void;
  addRow: (parentId: null) => void;
}

export const RepeaterHeader: React.FC<IRepeaterHeaderProps> = ({ rows, expandOnClick, addRow }: IRepeaterHeaderProps) => {
  return (
    <RepeaterRow className="header">
      <RepeaterCustomContainer>
        {rows.map((row) => {
          return <RepeaterTextCell key={row}>{row}</RepeaterTextCell>;
        })}
      </RepeaterCustomContainer>
      {addRow && (
        <RepeaterHeaderIcon onClick={() => addRow(null)}>
          <PlusIcon size={26} />
        </RepeaterHeaderIcon>
      )}
      {expandOnClick && (
        <RepeaterHeaderIcon onClick={() => expandOnClick}>
          <ScreenFullIcon size={26} />
        </RepeaterHeaderIcon>
      )}
    </RepeaterRow>
  );
};

export default RepeaterHeader;
