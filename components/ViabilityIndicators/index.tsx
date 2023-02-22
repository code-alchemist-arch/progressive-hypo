import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { selectViability } from '@/store/slice';
import { formatInterestRate } from '@/utils/utils';

import InterestRate from '@/components/InterestRate';

export default function ViabilityIndicators() {
  const { t } = useTranslation('common');
  const viability = useSelector(selectViability);

  const isLtvValid =
    viability.isCalculated &&
    viability.loanToValueRatio &&
    viability.loanToValueRatio <= 80;
  const ltvModifier = classNames({
    'bg-green01': isLtvValid,
    'bg-red01': viability.isCalculated && !isLtvValid,
  });
  const ltvValue =
    viability.isCalculated && viability.loanToValueRatio
      ? formatInterestRate(viability.loanToValueRatio)
      : undefined;

  const isSustainabilityValid =
    viability.isCalculated &&
    viability.sustainability &&
    viability.sustainability <= 33.33;
  const sustainabilityModifier = classNames({
    'bg-green01': isSustainabilityValid,
    '!bg-blue01': viability.isCalculated && !isSustainabilityValid,
  });
  const sustainabilityValue =
    viability.isCalculated && viability.sustainability
      ? formatInterestRate(viability.sustainability)
      : undefined;

  return (
    <>
      <div className="mb-1">
        <InterestRate
          label={t('loanToValueRatio')}
          value={ltvValue}
          modifier={ltvModifier}
        />
      </div>
      <div>
        <InterestRate
          label={t('sustainability')}
          value={sustainabilityValue}
          modifier={sustainabilityModifier}
        />
      </div>
    </>
  );
}
