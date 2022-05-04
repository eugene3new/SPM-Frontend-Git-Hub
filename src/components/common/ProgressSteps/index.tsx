import React, { FC } from 'react';
import styled from 'styled-components';
import { CheckIcon } from '@primer/octicons-react';

export type IProgressStep = {
  label: string;
  isComplete: boolean;
};

export interface ProgressStepsProps {
  steps: IProgressStep[];
}

const Step = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  width: 180px;
  position: relative;
  padding: 0 20px;
`;

const StepIcon = styled.div<{ isActive: boolean }>`
  width: 26px;
  height: 26px;
  background: var(--cora-orange);
  font-weight: 600;
  border-radius: 50%;
  border: ${({ isActive }) => (isActive ? `3px solid var(--cora-green)` : 'none')};
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StepLabel = styled.button<{ isActive: boolean }>`
  text-align: center;
  color: var(--cora-green);
  background: none;
  border: none;
  padding: 0;
  text-decoration: ${({ isActive }) => (isActive ? 'underline' : 'none')};
  font-weight: ${({ isActive }) => (isActive ? '600' : 'none')};
  cursor: pointer;
`;

const StepLine = styled.div`
  position: absolute;
  top: 13px;
  right: 50%;
  height: 1px;
  width: 100%;
  background-color: var(--cora-orange);
`;

interface ProgressStepProps {
  isFirst?: boolean;
  isComplete?: boolean;
  isActive?: boolean;
  label: string;
  onClick: () => void;
}

export const ProgressStep: React.FC<ProgressStepProps> = ({ label, onClick, isActive = false, isFirst = false, isComplete = false }) => {
  return (
    <Step>
      <StepIcon isActive={isActive}>{isComplete && <CheckIcon size={isActive ? 23 : 23} />}</StepIcon>
      {!isFirst && <StepLine />}
      <StepLabel onClick={onClick} isActive={isActive}>
        {label}
      </StepLabel>
    </Step>
  );
};

export default ProgressStep;
