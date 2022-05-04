import React from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { generateStaticPathFromObject } from '@helpers';
import { WizardSetupProvider } from 'context/WizardContext';
import WizardSetup from '@content/WizardSetup';
import { wizardSetupData } from '@content/WizardSetup/data';

const SetupPage: NextPage = () => {
  return (
    <WizardSetupProvider>
      <WizardSetup />
    </WizardSetupProvider>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: generateStaticPathFromObject(wizardSetupData, true), fallback: false };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;
  const translations = await import(`../../translations/${locale}.json`);
  return {
    props: {
      messages: {
        ...translations,
      },
    },
  };
};

export default SetupPage;
