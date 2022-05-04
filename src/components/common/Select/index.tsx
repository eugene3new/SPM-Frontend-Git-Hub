import React from 'react';
import { Form } from 'react-bootstrap';

export interface ISelectOption {
  text: string;
  value: string;
}

export interface SelectProps {
  id?: string;
  label: string;
  name?: string;
  options: ISelectOption[];
  selectedValue?: string;
  onChange?: React.FormEventHandler<HTMLSelectElement>;
}

export const Select: React.FC<SelectProps> = ({ id, label, name, options, selectedValue, onChange }) => {
  return (
    <Form.Group id={id} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Select name={name} aria-label={label} value={selectedValue} onChange={onChange}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </Form.Select>
    </Form.Group>
  );
};

export default Select;
