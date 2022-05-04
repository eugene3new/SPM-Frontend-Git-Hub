import TextInput from '@common/TextInput';
import { Select } from '@cora/cora-component-library/dist';
import { useField } from 'formik';
import { FormikSelectInputProps, FormikTextInputProps } from './models';

export const FormikSelectInput = ({ label, selectOptions, ...props }: FormikSelectInputProps) => {
  const [{ name, value, onChange }, { error, touched }] = useField(props);
  return <Select label={label || ''} options={selectOptions} name={name} onChange={onChange} value={value} />;
};

export const FormikTextInput = ({ label, helpText, type = 'text', ...props }: FormikTextInputProps) => {
  const [{ name, value, onBlur, onChange }, { error, touched }] = useField(props);
  return (
    <TextInput
      helpText={helpText}
      type={type}
      label={label || ''}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      validation={{
        isInvalid: !!error && touched,
        isValid: false,
        validationMessage: error || '',
      }}
    />
  );
};
