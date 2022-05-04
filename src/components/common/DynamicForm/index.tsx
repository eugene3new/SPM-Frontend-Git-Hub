import ToggleItems from '@common/ToggleItems';
import React from 'react';
import { selectOption } from '@cora/cora-component-library/dist/components/Select';
import { Column, Row } from '@cora/cora-component-library/dist/components/Repeater';
// import { IColumn, IWizardColumn } from '@common/Repeater/models';
import { DynamicSelectInput } from './inputs/DynamicSelectInput';
import { DynamicTextInput } from './inputs/DynamicTextInput';
import { DynamicRepater } from './inputs/DynamicRepeater';

type IFieldType = 'text' | 'select' | 'array' | 'textarea';

interface IDynamicFormText {
  type: 'text' | 'textarea';
  name: string;
  label?: string;
  toggle?: never;
  toggleLabel?: never;
  children?: never;
  options?: never;
  columns?: never;
  rows?: never;
  helpText?: string;
}

interface IDynamicFormArray {
  type: 'array';
  name: string;
  label?: never;
  children: IDynamicFormBuilderItem[];
  toggle: boolean;
  toggleLabel?: string;
  options?: never;
  columns?: never;
  rows?: never;
  helpText?: never;
}

interface IDynamicFormSelect {
  type: 'select';
  name: string;
  label?: string;
  options: selectOption[];
  toggle?: never;
  toggleLabel?: never;
  children?: never;
  columns?: never;
  rows?: never;
  helpText?: never;
}

interface IDynamicFormRepeater {
  type: 'repeater';
  name: string;
  label?: string;
  options?: selectOption[];
  toggle?: never;
  toggleLabel?: never;
  children?: never;
  // columns: IWizardColumn[];
  rows: string[];
  helpText?: never;
}

type TruncateProps = IDynamicFormText | IDynamicFormArray | IDynamicFormSelect | IDynamicFormRepeater;

export type IDynamicFormBuilderItem = TruncateProps;

interface DynamicFormProps {
  config: IDynamicFormBuilderItem[];
  isLoading?: boolean;
}

const DynamicItem = ({ type, name, label, children, toggle, toggleLabel, options, rows, helpText }: IDynamicFormBuilderItem) => {
  switch (type) {
    case 'text':
    case 'textarea':
      return <DynamicTextInput name={name} label={label} type={type} helpText={helpText} />;
    case 'array': {
      const renderItem = <DynamicForm config={children || []} />;
      if (toggle) {
        return <ToggleItems label={toggleLabel || ''}>{renderItem}</ToggleItems>;
      }
      return renderItem;
    }
    case 'select':
      return <DynamicSelectInput name={name} label={label} selectOptions={options || []} />;
    case 'repeater':
      /*
      return (
        <DynamicRepater
          columns={columns ? columns[0].fields : []}
          rows={rows || []}
          data={[]}
          handleAddRow={() => undefined}
          handleFieldChange={() => undefined}
        />
      );
      */
      return null;
    default:
      return <div>Unsupported field</div>;
  }
};

const DynamicForm: React.FC<DynamicFormProps> = ({ config, children, isLoading }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {config.map((formItem: IDynamicFormBuilderItem) => {
        return <DynamicItem {...formItem} key={formItem.name} />;
      })}
      {children}
    </>
  );
};

export default DynamicForm;
