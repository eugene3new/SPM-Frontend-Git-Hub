import LoadingLine from '@common/LoadingLine';
import React from 'react';

export const ContentLoadingLineContext = React.createContext<{
  setIsShowing: (isShowing: boolean) => void;
}>({
  setIsShowing: () => {},
});

ContentLoadingLineContext.displayName = 'ContentLoadingContext';

export const ContentLoadingLineProvider: React.FC = ({ children }) => {
  const [isLoaderShowing, setIsLoaderShowing] = React.useState<boolean>(false);

  const setIsShowing = (isShowing: boolean) => setIsLoaderShowing(isShowing);

  const contextValue = {
    setIsShowing: React.useCallback((isShowing) => setIsShowing(isShowing), []),
  };

  return (
    <ContentLoadingLineContext.Provider value={contextValue}>
      <>
        <LoadingLine isShowing={isLoaderShowing} />
        {children}
      </>
    </ContentLoadingLineContext.Provider>
  );
};
