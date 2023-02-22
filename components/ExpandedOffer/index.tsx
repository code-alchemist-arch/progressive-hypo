import { useTranslation } from 'next-i18next';

import { IOffer } from '@/store/slice';
import { formatCurrency, formatInterestRate } from '@/utils/utils';
import Typography from '@/components/Typography';

interface ExpandedMortgageProps {
  offer: IOffer;
}

export default function ExpandedOffer({ offer }: ExpandedMortgageProps) {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg shadow bg-white w-full pl-4 mb-2.5">
      <div className="py-2 border-b border-grey06">
        <Typography type="primary">
          {t(`productType${offer.productType}`)}
        </Typography>
      </div>
      <div className="pt-1 pb-4 flex">
        <div className="w-1/2">
          <Typography type="secondary">{t('interestRate')}</Typography>
          <Typography type="primary">
            {formatInterestRate(offer.interestRateFrom)}
          </Typography>
        </div>
        <div className="w-1/2">
          <Typography type="secondary">{t('monthlyCostFrom')}</Typography>
          <Typography type="primary">
            {formatCurrency(offer.interestRateMonthlyCostFrom)}
          </Typography>
        </div>
      </div>
    </div>
  );
}
