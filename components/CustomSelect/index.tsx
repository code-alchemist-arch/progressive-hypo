import Select, {
  components,
  SingleValue,
  MultiValue,
  ActionMeta,
  DropdownIndicatorProps
} from 'react-select';

import { SelectValue } from '@/types/common';

interface CustomSelectProps {
  label: string;
  name: string;
  isSearchable?: boolean;
  options: SelectValue[];
  value: SelectValue;
  onChange: (newValue: SingleValue<SelectValue> | MultiValue<SelectValue>, actionMeta: ActionMeta<SelectValue>) => void;
};

const styles = {
  control: (styles: any) => {
    return {
      ...styles,
      ...{
        borderRadius: '8px',
        border: '1px solid #E5E5E5',
      }
    }
  },
  valueContainer: (styles: any) => {
    return {
      ...styles,
      ...{
        padding: '32px 24px 12px 16px',
      },
    };
  },
  singleValue: (styles: any) => {
    return {
      ...styles,
      ...{
        fontSize: '18px',
      }
    };
  },
  indicatorSeparator: (styles: any) => {
    return {
      ...styles,
      ...{
        display: 'none',
      }
    };
  },
};

const DropdownIndicator = (props: DropdownIndicatorProps<any>) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <i className="absolute top-7 right-4 border-0 border-r-2 border-b-2 p-[6px] border-anthrazit rotate-45" />
      </components.DropdownIndicator>
    )
  );
}

export default function CustomSelect({
  label,
  name,
  isSearchable,
  options,
  value,
  onChange,
}: CustomSelectProps) {

  return (
    <div className="relative mt-2 mb-5">
      <Select
        className="rounded-lg"
        name={name}
        options={options}
        value={value}
        onChange={onChange}
        isSearchable={isSearchable}
        styles={styles}
        components={{ DropdownIndicator }}
      />
      <label className="absolute top-2 left-4 text-sm text-normal">
        { label }
      </label>
    </div>
  );
}

CustomSelect.defaultProps = {
  isSearchable: false,
}
