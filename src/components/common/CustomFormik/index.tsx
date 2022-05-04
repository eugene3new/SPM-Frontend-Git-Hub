import { useOutsideForm, useWizardSetup } from '@hooks/contextHook';
import { useFormHttpHelper } from '@hooks/requestHook';
import { Formik, FormikProps, FormikValues } from 'formik';
import { useRouter } from 'next/router';

interface CustomFormikProps {
  ref: React.MutableRefObject<FormikProps<FormikValues> | null> | null;
}

const CustomFormik: React.FC<CustomFormikProps> = ({ ref }) => {
  const router = useRouter();
  // const [data, request, isEdit, setIsEditable] = useFormHttpHelper(generateInitialDataFromConfig(config), url);
  const { setActiveStepComplete, setNextStep } = useWizardSetup();
  const { formikFormRef } = useOutsideForm();

  return null;
  /*
  return (
    <Formik
      innerRef={ref}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        const { id, ...rest } = values;
        try {
          const resp = await request(rest);
          setActiveStepComplete();
          if (!isEdit) {
            setIsEditable(true);
          }
          if (goNextStep.current) {
            setNextStep();
          } else if (goNextStep.current === null) {
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
  );
  */
};

export default CustomFormik;
