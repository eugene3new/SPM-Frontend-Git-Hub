import NoContent from '@common/NoContent';
import React from 'react';

const WizardStepContainer: React.FC<{ activeStepId?: number }> = ({ children, activeStepId }) => {
  const subRows: JSX.Element[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.props.stepId === activeStepId) {
      subRows.push(child);
    }
  });

  if (subRows.length === 0) {
    return <NoContent text="There is no content for this group" />;
  }
  return <>{subRows}</>;
};

/*
const WizardStepContainer: React.FC<{ activeStepId?: number }> = ({ children, activeStepId }) => {
  return (
    <>
      {React.Children.map<React.ReactNode, React.ReactNode>(children, (child) => {
        if (React.isValidElement(child) && child.props.stepId === activeStepId) {
          return child;
        }
        return null;
      })}
    </>
  );
};
*/
export default WizardStepContainer;
