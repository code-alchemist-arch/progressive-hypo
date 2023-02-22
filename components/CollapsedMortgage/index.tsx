import { useMemo } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import Typography from '@/components/Typography';

import { formatCurrency, formatInterestRate } from '@/utils/utils';
import { IOffer } from '@/store/slice';
import { useTranslation } from 'next-i18next';

interface CollapsedMortgageProps {
  offer: IOffer;
  isSelected: boolean;
  onClick: () => void;
}

export default function CollapsedMortgage({
  offer,
  isSelected,
  onClick,
}: CollapsedMortgageProps) {
  const { t } = useTranslation();

  const wrapperClassName = useMemo(
    () =>
      classNames('rounded-lg bg-white pl-4 border border-white', {
        'bg-green03 border-green02': isSelected,
      }),
    [isSelected],
  );

  const headerClassName = useMemo(
    () =>
      classNames(
        'flex justify-between items-center border-b border-grey06 py-2 pr-3',
        { 'border-green02': isSelected },
      ),
    [isSelected],
  );

  const primaryLabel = `${formatInterestRate(
    offer.interestRateFrom,
  )} / ${formatCurrency(offer.interestRateMonthlyCostFrom)}`;

  return (
    <div className={wrapperClassName} onClick={onClick}>
      <div className={headerClassName}>
        <Typography type="primary">
          {t('durationValue', { duration: offer.duration })}
        </Typography>
        {isSelected ? (
          <Image
            src="/images/check.svg"
            alt="selected offer"
            width="22"
            height="22"
          />
        ) : (
          <Image
            src="/images/uncheck.svg"
            alt="unselected offer"
            width="22"
            height="22"
          />
        )}
      </div>
      <div className="pt-1 pb-4 pr-3">
        <Typography type="secondary">{t('interestRate')}</Typography>
        <Typography type="primary">{primaryLabel}</Typography>
      </div>
    </div>
  );
}
