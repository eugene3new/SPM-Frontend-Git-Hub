import React, { MutableRefObject } from 'react';
import { FormikProps, FormikValues } from 'formik';

export const FormContext = React.createContext<{
  formikFormRef: MutableRefObject<FormikProps<FormikValues> | null> | null;
  isSubmitOnly: MutableRefObject<boolean | null>;
  forceUpdate: () => void;
}>({
  formikFormRef: null,
  isSubmitOnly: { current: false },
  forceUpdate: () => {},
});

FormContext.displayName = 'FormContext';

export const FormContextProvider: React.FC = ({ children }) => {
  const formikFormRef = React.useRef<FormikProps<FormikValues> | null>(null);
  const isSubmitOnly = React.useRef<boolean | null>(false);

  const [refresher, setRefresher] = React.useState<number>(0);

  const store = {
    formikFormRef,
    isSubmitOnly,
    forceUpdate: () => setRefresher(refresher + 1),
  };

  return <FormContext.Provider value={store}>{children}</FormContext.Provider>;
};
