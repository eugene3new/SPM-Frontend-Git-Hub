import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

interface RadioButtonProps {
  radios: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ radios, value, onChange }) => {
  console.log(value);
  return (
    <ButtonGroup>
      {radios.map((radio) => (
        <ToggleButton
          key={radio.value}
          type="radio"
          variant="primary"
          name="radio"
          value={radio.value}
          checked={value === radio.value}
          onClick={() => {
            onChange(radio.value);
          }}
        >
          {radio.label}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
};

export default RadioButton;
