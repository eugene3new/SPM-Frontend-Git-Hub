import { Switch } from '@cora/cora-component-library/dist';
import React from 'react';

interface ToggleItemsProps {
  label: string;
  defaultValue?: boolean;
}

const ToggleItems: React.FC<ToggleItemsProps> = ({ defaultValue = false, children, label }) => {
  const [active, setActive] = React.useState(defaultValue);

  return (
    <div>
      <Switch label={label} checked={active} onChange={() => setActive(!active)} />
      {active && children}
    </div>
  );
};

export default ToggleItems;
