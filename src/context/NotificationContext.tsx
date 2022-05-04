import React from 'react';

type IMessageStatus = 'success' | 'warning' | 'info' | 'danger';

export interface IMessage {
  title: string;
  text: string;
  status: IMessageStatus;
}

export const NotificationContext = React.createContext<{
  message: IMessage | null;
  addMessage: (message: IMessage | null) => void;
  removeMessage: () => void;
}>({
  message: null,
  addMessage: () => {},
  removeMessage: () => {},
});

NotificationContext.displayName = 'NotificationContext';

export const NotificationProvider: React.FC = ({ children }) => {
  const [message, setMessage] = React.useState<IMessage | null>(null);

  const removeMessage = () => setMessage(null);

  const addMessage = (messagePayload: IMessage | null) => setMessage(messagePayload);

  const contextValue = {
    message,
    addMessage: React.useCallback((messagePayload) => addMessage(messagePayload), []),
    removeMessage: React.useCallback(() => removeMessage(), []),
  };

  return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>;
};
