import { IFormField } from '@cora/cora-component-library/dist/components/Common/Interfaces/IFormField';
import React from 'react';
import { Form } from 'react-bootstrap';

export interface ITextInputProps extends IFormField {
  placeholder?: string;
  type: 'text' | 'textarea';
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const TextInput: React.FC<ITextInputProps> = ({
  id,
  label,
  name,
  value,
  type,
  helpText,
  placeholder,
  validation,
  onChange,
  onBlur,
}) => {
  return (
    <Form.Group id={id} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        isValid={validation?.isValid}
        isInvalid={validation?.isInvalid}
        value={value}
        placeholder={placeholder}
        as={type !== 'text' ? type : undefined}
        style={type === 'textarea' ? { height: '100px' } : {}}
        onChange={onChange}
        onBlur={onBlur}
      />
      {validation && (
        <Form.Control.Feedback type={validation.isInvalid ? 'invalid' : 'valid'}>{validation.validationMessage}</Form.Control.Feedback>
      )}
      {helpText && <Form.Text className="text-muted">{helpText}</Form.Text>}
    </Form.Group>
  );
};

export default TextInput;
