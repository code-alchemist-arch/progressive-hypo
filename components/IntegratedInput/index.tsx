import { useMemo } from 'react';
import classNames from 'classnames';

interface IntegratedInputProps {
  type?: string;
  label: string;
  name: string;
  required?: boolean;
  hasError?: boolean;
  value: string | undefined;
  onChange: (value: string | undefined) => void;
}

export default function IntegratedInput({
  type,
  label,
  name,
  required,
  hasError,
  value,
  onChange,
}: IntegratedInputProps) {
  const inputClassName = useMemo(
    () =>
      classNames(
        'text-anthrazit text-left text-lg text-medium pt-8 pb-3 px-4 bg-white w-full border rounded-lg border-grey05 mt-2 mb-5',
        { 'border-red': hasError },
      ),
    [hasError],
  );

  return (
    <div className="relative">
      <label className="absolute top-4 left-4 text-sm text-normal" htmlFor={name}>
        { label }
      </label>
      <input
        type={type}
        name={name}
        className={inputClassName}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

IntegratedInput.defaultProps = {
  type: 'text',
  required: false,
  hasError: false,
}
