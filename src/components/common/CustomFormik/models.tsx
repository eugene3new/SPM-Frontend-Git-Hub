import { selectOption } from '@cora/cora-component-library/dist/components/Select';
import { FieldHookConfig } from 'formik';

export type FormikSelectInputProps = FieldHookConfig<string> & {
  label?: string;
  selectOptions: selectOption[];
};

export type FormikTextInputProps = FieldHookConfig<string> & {
  label?: string;
  type?: 'text' | 'textarea';
  helpText?: string;
};
