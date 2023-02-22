import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { MAX_SELECTABLE_INTEREST_RATE_COUNT } from '@/utils/constants';
import { IOffer } from '@/store/slice';
import { getRegularOffers } from '@/utils/offers';
import getInitialSelectedOffers from '@/utils/getInitialSelectedOffers';
import CollapsedMortgage from '@/components/CollapsedMortgage';

interface RateMortgageProps {
  offers: IOffer[];
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OffersList({
  offers,
  setIsModalShow,
}: RateMortgageProps) {
  const { t } = useTranslation();
  const [selectedDurations, setSelectedDurations] = useState<number[]>([]);

  useEffect(() => {
    if (selectedDurations.length > 0) return;
    const baseSelectedDuration = getInitialSelectedOffers(offers);
    setSelectedDurations(baseSelectedDuration);
  }, [offers, selectedDurations]);

  const onCollapsedMortgageClick = (id: number) => {
    setSelectedDurations((prevIds) => {
      const ids = [...prevIds];

      const existIndex = ids.indexOf(id);
      if (existIndex >= 0) ids.splice(existIndex, 1);
      else ids.push(id);

      if (ids.length > MAX_SELECTABLE_INTEREST_RATE_COUNT) {
        setIsModalShow(true);
        return prevIds;
      } else return ids;
    });
  };

  const itemClassName = (index: number) =>
    classNames('w-[calc(50%-2px)] mb-1', {
      'mr-1': index % 2 === 0,
    });

  return (
    <>
      <p className="text-black text-xl leading-6 mb-2 pl-4 font-serif">
        {t('moreOffers')}
      </p>
      <div className="flex flex-wrap mb-28">
        {getRegularOffers(offers)?.map((offerItr, idx) => (
          <div
            key={`${offerItr.duration}-${offerItr.productType}`}
            className={itemClassName(idx)}
          >
            <CollapsedMortgage
              offer={offerItr}
              isSelected={selectedDurations.includes(offerItr.duration || 1)}
              onClick={() => onCollapsedMortgageClick(offerItr.duration || 1)}
            />
          </div>
        ))}
      </div>
    </>
  );
}
