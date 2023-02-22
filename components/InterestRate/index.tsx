import { useMemo } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

interface InterestRateProps {
  modifier?: string;
  label: string;
  value?: string;
  icon?: string;
  isSelected?: boolean;
}

export default function InterestRate({
  modifier,
  label,
  value,
  icon,
  isSelected,
}: InterestRateProps) {
  const wrapperClassName = useMemo(
    () =>
      classNames(
        'bg-white w-full rounded-lg flex justify-between items-center text-anthrazit px-4 py-3 font-sans',
        {
          'bg-green01': isSelected,
        },
        modifier,
      ),
    [isSelected, modifier],
  );

  const valueClassName = useMemo(
    () =>
      classNames('text-base leading-6.5 font-bold', {
        'text-2xl': !value,
      }),
    [value],
  );

  return (
    <div className={wrapperClassName}>
      <div className="flex items-center">
        <p className="text-base leading-6.5 font-bold">{label}</p>
        {icon && (
          <Image
            className="ml-2"
            src={icon}
            alt="icon"
            width="17"
            height="17"
          />
        )}
      </div>
      <p className={valueClassName}>{value ? `${value}` : '-'}</p>
    </div>
  );
}
