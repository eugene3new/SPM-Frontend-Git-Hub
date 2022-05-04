import TextInput from '@common/TextInput';
import { FieldHookConfig, useField } from 'formik';

type DynamicTextInputProps = FieldHookConfig<string> & {
  label?: string;
  type?: 'text' | 'textarea';
  helpText?: string;
};

export const DynamicTextInput = ({ label, helpText, type = 'text', ...props }: DynamicTextInputProps) => {
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
