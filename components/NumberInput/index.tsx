import { useMemo } from 'react';
import classNames from 'classnames';
import { NumericFormat } from 'react-number-format';

import thousandSeparator from '@/utils/thousandSeparator';

import Typography from '@/components/Typography';

interface InputProps {
  label: string;
  name: string;
  suffix?: string;
  required?: boolean;
  hasError?: boolean;
  value: number | undefined;
  pattern?: string;
  onChange: (value: number | undefined) => void;
}

export default function NumberInput({
  label,
  name,
  suffix = '',
  required = false,
  hasError,
  value,
  pattern = '[0-9]*',
  onChange,
}: InputProps) {
  const inputClassName = useMemo(
    () =>
      classNames(
        'text-anthrazit text-left py-3.5 px-4 bg-white w-full border rounded-lg border-grey05 mt-2 mb-5',
        { 'pr-11': !!suffix },
        { 'border-red': hasError },
      ),
    [suffix, hasError],
  );

  return (
    <div className="relative">
      {label && (
        <Typography type="label" htmlFor={name}>
          {label}
        </Typography>
      )}
      <NumericFormat
        className={inputClassName}
        pattern={pattern}
        value={value}
        allowLeadingZeros
        thousandSeparator={thousandSeparator(value)}
        required={required}
        onValueChange={({ floatValue }) => onChange(floatValue)}
      />
      {suffix && (
        <span className="absolute text-grey02 text-sm right-4 bottom-9">
          {suffix}
        </span>
      )}
    </div>
  );
}
