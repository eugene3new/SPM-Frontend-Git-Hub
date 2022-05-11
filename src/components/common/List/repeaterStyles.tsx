import styled from 'styled-components';

export const RepeaterContainer = styled.div`
  width: 100%;
  height: auto;
  border-width: 1px 2px;
  border-style: solid;
  border-color: var(--cora-gray-light);

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
`;

export const EmptyRepeater = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RepeaterRow = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  border-width: 1px 0 1px 0;
  border-color: var(--cora-gray-light);
  border-style: solid;
  list-style: none;
  height: auto;
  line-height: 40px;
  padding: 5px 0;
  box-sizing: border-box;
  white-space: nowrap;

  &.checked {
    background-color: var(--cora-blue-very-light);
  }

  &.header {
    background-color: var(--cora-gray-light);
    font-weight: bold;
  }
`;

export const RepeaterCustomContainer = styled.div`
  width: 100%;
  display: flex;
  //justify-content: space-around;
`;

export const RepeaterCell = styled.div<{
  width: number;
}>`
  width: ${({ width }) => width}%;
  margin: 0 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RepeaterTextCell = styled(RepeaterCell)`
  text-align: left;
  max-width: 200px;
  overflow: hidden;
`;

export const RepeaterNumericCell = styled(RepeaterCell)`
  text-align: right;
  max-width: 300px;
  overflow: hidden;
`;

export const RepeaterSelectCell = styled(RepeaterCell)`
  overflow: visible;
  line-height: 1;
`;

export const RepeaterCheck = styled.div`
  width: 40px;

  input {
    cursor: pointer;
    width: 20px;
    height: 20px;
    position: relative;
    top: 5px;
    left: 10px;

    &:checked {
      background-color: var(--cora-blue);
      border-color: var(--cora-blue);
    }

    &:focus {
      border-color: var(--cora-blue);
      box-shadow: 0 0 0 0.25rem var(--cora-blue-very-light);
    }
  }
`;

export const RepeaterPosition = styled.div`
  width: 80px;
`;

export const RepeaterHeaderIcon = styled.div`
  width: 40px;
  cursor: pointer;
`;

export const RepeaterGrabber = styled.div`
  cursor: grab;
  width: 40px;
`;
