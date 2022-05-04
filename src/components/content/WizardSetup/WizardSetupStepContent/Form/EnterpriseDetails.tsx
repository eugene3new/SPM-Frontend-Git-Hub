import DynamicForm, { IDynamicFormBuilderItem } from '@common/DynamicForm';
import FormContainer from '@common/FormContainer';
import { FormikSelectInput, FormikTextInput } from '@common/CustomFormik/FormikInputs';
import NoContent from '@common/NoContent';
import { API_ROUTES } from '@constants/apiRoutes';
import { TextInput } from '@cora/cora-component-library/dist';
import { generateInitialDataFromConfig } from '@helpers';
import { useOutsideForm, useWizardSetup } from '@hooks/contextHook';
import { useAxiosNextAuth, useFormHttpHelper } from '@hooks/requestHook';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { WizardSetupStepContentProps } from '@content/WizardSetup/models';

const EnterpriseDetails: React.FC<WizardSetupStepContentProps> = ({ config, url, stepId }) => {
  // we need to generate initial fields here so when adding new fields to Dynamic Form add them in this helper too
  console.log(url);
  const router = useRouter();
  const [data, request, isEdit, setIsEditable] = useFormHttpHelper({ name: '', description: '' }, API_ROUTES.enterpriseDetails);
  const { setActiveStepComplete, setNextStep } = useWizardSetup();
  const { formikFormRef, isSubmitOnly } = useOutsideForm();
  return (
    <FormContainer>
      <Formik
        innerRef={formikFormRef}
        enableReinitialize
        initialValues={data}
        onSubmit={async (values, actions) => {
          const { id, ...rest } = values;
          try {
            const resp = await request(rest);
            setActiveStepComplete();
            if (!isEdit) {
              setIsEditable(true);
            }
            if (isSubmitOnly.current === false) {
              setNextStep();
            } else if (isSubmitOnly.current === null) {
              router.push('/setup');
            }
          } catch (err: any) {
            console.log('err', err);
            if (err) {
              Object.entries(err).map((value) => {
                console.log(value);
                actions.setFieldError(value[0], value[1] as string);
              });
            }
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        <Form>
          <FormikTextInput name="name" label="Enterprise name" />
          <FormikTextInput type="textarea" name="description" label="Enterprise description" helpText="Lorem Ipsum dolor sit amnet" />
        </Form>
      </Formik>
    </FormContainer>
  );
};
export default EnterpriseDetails;
