import { useTranslations } from 'next-intl';
import { Button, ButtonMultiline } from '@cora/cora-component-library/dist';
import { useOutsideForm, useWizardSetup } from '@hooks/contextHook';
import styles from './enterpriseSetupFooter.module.scss';

const EnterpriseSetupToolbar: React.FC = () => {
  const { buttonText, activeSectionIndex, setPreviousStep, buttonStatus } = useWizardSetup();
  const { formikFormRef, isSubmitOnly } = useOutsideForm();
  const t = useTranslations();
  if (activeSectionIndex === null || activeSectionIndex === undefined || (buttonStatus.left === true && buttonStatus.right === true)) {
    return null;
  }

  // if null wizard will go to section selection page
  const submitForm = (isNextStep: boolean | null) => {
    isSubmitOnly.current = isNextStep;
    formikFormRef?.current?.submitForm();
  };

  return (
    <div className={styles.root}>
      <ButtonMultiline type="secondary" subText={buttonText.left} onClick={() => setPreviousStep()} disabled={buttonStatus.left}>
        {t('footer.previous')}
      </ButtonMultiline>
      <div className={styles.rightContainer}>
        <Button type="secondary" onClick={() => submitForm(true)}>
          {t('footer.save')}
        </Button>
        <ButtonMultiline
          type="primary"
          subText={buttonText.right}
          disabled={buttonStatus.right !== null && buttonStatus.right}
          align="end"
          onClick={() => submitForm(buttonStatus.right === null ? null : false)}
        >
          {t(buttonStatus.right === null ? 'footer.save_and_exit' : 'footer.save_and_next')}
        </ButtonMultiline>
      </div>
    </div>
  );
};

export default EnterpriseSetupToolbar;
