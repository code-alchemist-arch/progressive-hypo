import { useMemo } from 'react';
import classNames from 'classnames';

import Typography from '@/components/Typography';

interface InputProps {
  type?: string;
  label: string;
  name: string;
  suffix?: string;
  required?: boolean;
  hasError?: boolean;
  value: string | undefined;
  onChange: (value: string | undefined) => void;
}

export default function Input({
  type = 'text',
  label,
  name,
  required = false,
  hasError,
  value,
  onChange,
}: InputProps) {
  const inputClassName = useMemo(
    () =>
      classNames(
        'text-anthrazit text-left py-3.5 px-4 bg-white w-full border rounded-lg border-grey05 mt-2 mb-5',
        { 'border-red': hasError },
      ),
    [hasError],
  );

  return (
    <div className="relative">
      {label && (
        <Typography type="label" htmlFor={name}>
          {label}
        </Typography>
      )}
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
