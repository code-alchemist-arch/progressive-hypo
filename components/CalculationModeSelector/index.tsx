import { useMemo } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { MORTGAGE_MODE_NEW, MORTGAGE_MODE_PAYING_OFF } from '@/utils/constants';

interface CalculationModeSelectorProps {
  mode: string;
  onClick: (index: string) => void;
}

export default function CalculationModeSelector({
  mode,
  onClick,
}: CalculationModeSelectorProps) {
  const { t } = useTranslation('common');

  const wrapperClassName = useMemo(
    () =>
      classNames(
        "relative p-1 bg-pistachio w-full rounded-xl p-1 flex items-center before:absolute before:content-[''] before:w-[calc(50%-8px)] before:h-[calc(100%-8px)] before:top-1 before:bg-white before:text-anthrazit before:duration-300 before:ease-in-out before:rounded-lg",
        `${
          mode === MORTGAGE_MODE_PAYING_OFF
            ? 'before:left-51%'
            : 'before:left-1'
        }`,
      ),
    [mode],
  );

  const tabItemClassNames =
    'text-anthrazit text-sm py-2.5 text-center rounded-lg w-1/2 z-10';

  return (
    <div className={wrapperClassName}>
      <div
        className={tabItemClassNames}
        onClick={() => onClick(MORTGAGE_MODE_NEW)}
      >
        {t('newMortgage')}
      </div>
      <div
        className={tabItemClassNames}
        onClick={() => onClick(MORTGAGE_MODE_PAYING_OFF)}
      >
        {t('payingOffMortgage')}
      </div>
    </div>
  );
}
