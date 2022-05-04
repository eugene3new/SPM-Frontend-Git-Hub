import { EnterpriseContext } from 'context/WizardContext';
import { NotificationContext } from 'context/NotificationContext';
import React from 'react';
import { FormContext } from 'context/FormContext';
import { ContentLoadingLineContext } from 'context/ContentLoadingLineContext';
import { ContentLoadingSpinnerContext } from 'context/ContentLoadingSpinnerContext';
import { RowContext } from 'context/RowContext';

export const useMessage = () => {
  const { message, addMessage, removeMessage } = React.useContext(NotificationContext);
  return { message, addMessage, removeMessage };
};

export const useContentLoadingLine = () => {
  const { setIsShowing } = React.useContext(ContentLoadingLineContext);
  return { setIsLineLoaderShowing: setIsShowing };
};

export const useContentLoadingSpinner = () => {
  const { setIsShowing } = React.useContext(ContentLoadingSpinnerContext);
  return { setIsSpinnerLoaderShowing: setIsShowing };
};

export const useOutsideForm = () => {
  const { formikFormRef, forceUpdate, isSubmitOnly } = React.useContext(FormContext);
  return { formikFormRef, forceUpdate, isSubmitOnly };
};

export const useFormRowData = () => {
  const { addRowOptions, rowOptions } = React.useContext(RowContext);
  return { addRowOptions, rowOptions };
};

export const useWizardSetup = () => {
  const {
    groups,
    navigation,
    title,
    overviews,
    activeSectionIndex,
    activeStepIndex,
    activeGroupIndex,
    buttonText,
    overviewPercentages,
    sectionPercentages,
    buttonStatus,
    isLoading,
    error,
    setActiveSection,
    setActiveStep,
    setActiveStepComplete,
    setNextStep,
    setPreviousStep,
  } = React.useContext(EnterpriseContext);
  return {
    groups,
    navigation,
    title,
    overviews,
    activeSectionIndex,
    activeStepIndex,
    activeGroupIndex,
    buttonText,
    overviewPercentages,
    sectionPercentages,
    buttonStatus,
    isLoading,
    error,
    setActiveSection,
    setActiveStep,
    setActiveStepComplete,
    setNextStep,
    setPreviousStep,
  };
};
