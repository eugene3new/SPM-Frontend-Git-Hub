import DynamicForm, { IDynamicFormBuilderItem } from '@common/DynamicForm';
import FormContainer from '@common/FormContainer';
import NoContent from '@common/NoContent';
import { API_ROUTES } from '@constants/apiRoutes';
import { TextInput } from '@cora/cora-component-library/dist';
import { generateInitialDataFromConfig } from '@helpers';
import { useOutsideForm, useWizardSetup } from '@hooks/contextHook';
import { useAxiosNextAuth, useFormHttpHelper } from '@hooks/requestHook';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';

interface EnterpriseDetailsFormValues {
  name: string;
  description: string;
}

interface WizardSetupStepContentProps {
  config?: IDynamicFormBuilderItem[];
  url?: string;
  stepId?: number;
}

const DynamicContent: React.FC<WizardSetupStepContentProps> = ({ config, url, stepId }) => {
  // we need to generate initial fields here so when adding new fields to Dynamic Form add them in this helper too
  const router = useRouter();
  const [data, request, isEdit, setIsEditable] = useFormHttpHelper(generateInitialDataFromConfig(config), url);
  const { setActiveStepComplete, setNextStep } = useWizardSetup();
  const { formikFormRef } = useOutsideForm();
  console.log(data);
  if (!config) {
    return <NoContent text="No config provided" />;
  }
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
            /*
            if (goNextStep.current) {
              setNextStep();
            } else if (goNextStep.current === null) {
              router.push('/setup');
            }
            */
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
          <DynamicForm config={config} />
        </Form>
      </Formik>
    </FormContainer>
  );
};

export default DynamicContent;
