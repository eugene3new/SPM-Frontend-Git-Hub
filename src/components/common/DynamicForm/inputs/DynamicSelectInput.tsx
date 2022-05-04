import { Select, TextInput } from '@cora/cora-component-library/dist';
import { selectOption } from '@cora/cora-component-library/dist/components/Select';
import { FieldHookConfig, useField } from 'formik';

type DynamicTextInputProps = FieldHookConfig<string> & {
  label?: string;
  selectOptions: selectOption[];
};

// Add error
export const DynamicSelectInput = ({ label, selectOptions, ...props }: DynamicTextInputProps) => {
  const [{ name, value, onChange }, { error, touched }] = useField(props);
  return <Select label={label || ''} options={selectOptions} name={name} onChange={onChange} value={value} />;
};
