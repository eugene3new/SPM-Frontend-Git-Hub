import React from 'react';
import styled from 'styled-components';
import SpinnerSVG from './spinnerSVG';

export interface ISpinnerProps {
  showSpinner: boolean;
  text?: string;
  stylingBlock?: boolean;
}

const PageDimmer = styled.div`
  //width: 100vw;
  //height: 100vh;
  //background-color: rgba(0, 0, 0, 0.05);
`;

const SVGContainer = styled.div`
  width: 300px;
  padding: 10px;
  background: var(--cora-white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BlockStyle = styled.div`
  background: var(--cora-white);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Spinner: React.FC<ISpinnerProps> = ({ showSpinner, text, stylingBlock }) => {
  if (!showSpinner) {
    return null;
  }

  if (stylingBlock) {
    return (
      <BlockStyle>
        <SpinnerSVG />
        {text && <> {text}...</>}
      </BlockStyle>
    );
  }
  return (
    <>
      <PageDimmer>
        {stylingBlock && <> {text}...</>}
        <SVGContainer>
          <SpinnerSVG />
          {text && <> {text}...</>}
        </SVGContainer>
      </PageDimmer>
    </>
  );
};

export default Spinner;
