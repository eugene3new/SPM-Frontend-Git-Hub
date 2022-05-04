import { Spinner } from '@cora/cora-component-library/dist';
import React from 'react';

export const ContentLoadingSpinnerContext = React.createContext<{
  setIsShowing: (isShowing: boolean) => void;
}>({
  setIsShowing: () => {},
});

ContentLoadingSpinnerContext.displayName = 'ContentLoadingSpinnerContext';

export const ContentLoadingSpinnerProvider: React.FC = ({ children }) => {
  const [isLoaderShowing, setIsLoaderShowing] = React.useState<boolean>(false);

  const contextValue = {
    setIsShowing: (isShowing: boolean) => {
      setIsLoaderShowing(isShowing);
    },
  };
  return (
    <ContentLoadingSpinnerContext.Provider value={contextValue}>
      {isLoaderShowing ? <Spinner text="Loading" showSpinner /> : <>{children}</>}
    </ContentLoadingSpinnerContext.Provider>
  );
};
