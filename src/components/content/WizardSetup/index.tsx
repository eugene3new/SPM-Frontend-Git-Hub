import WizardSetupContent from '@content/WizardSetup/WizardSetupContent';
import { useWizardSetup } from '@hooks/contextHook';
import Layout from '@layout/Layout';
import LayoutContentBody from '@layout/LayoutContentBody';
import { FormContextProvider } from 'context/FormContext';
import WizardSetupOverview from './WizardSetupOverview';
import EnterpriseSetupToolbar from './WizardSetupToolbar';

const WizardSetup = () => {
  const { navigation, groups, title, overviews, overviewPercentages, isLoading, error } = useWizardSetup();
  const isMainPage = !title;
  return (
    <Layout navItems={isMainPage ? undefined : navigation}>
      {isMainPage ? (
        <LayoutContentBody title="Welcome to Cora SPM" isLoading={isLoading} isError={error}>
          <WizardSetupOverview overviews={overviews} overviewPercentages={overviewPercentages} />
        </LayoutContentBody>
      ) : (
        <FormContextProvider>
          <LayoutContentBody title={title} isLoading={isLoading} isError={error}>
            <WizardSetupContent groups={groups} />
          </LayoutContentBody>
          <EnterpriseSetupToolbar />
        </FormContextProvider>
      )}
    </Layout>
  );
};

export default WizardSetup;
