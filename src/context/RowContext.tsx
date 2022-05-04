import { IOptions } from '@common/RepeaterOld/models';
import React from 'react';

type IMessageStatus = 'success' | 'warning' | 'info' | 'danger';

export interface IMessage {
  title: string;
  text: string;
  status: IMessageStatus;
}

export const RowContext = React.createContext<{
  rowOptions: Record<string, IOptions[]>;
  addRowOptions: (name: string, options: IOptions[]) => void;
}>({
  rowOptions: {},
  addRowOptions: () => undefined,
});

RowContext.displayName = 'RowContext';

export const RowContextProvider: React.FC = ({ children }) => {
  const [rowOptions, setRowOptions] = React.useState<Record<string, IOptions[]>>({});

  const fetchOptions = React.useCallback((name: string, options: IOptions[]) => {
    setRowOptions((prevState) => {
      if (prevState[name] === undefined || (prevState[name] !== undefined && prevState[name].length === 0)) {
        return {
          ...prevState,
          [name]: options,
        };
      }
      return prevState;
    });
  }, []);

  const contextValue = {
    rowOptions,
    addRowOptions: fetchOptions,
  };

  return <RowContext.Provider value={contextValue}>{children}</RowContext.Provider>;
};
