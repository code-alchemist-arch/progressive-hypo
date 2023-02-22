import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { AppDispatch } from '@/store';
import { downloadDocument, selectOffers } from '@/store/slice';
import { getExpandedOffers } from '@/utils/offers';

import Button from '@/components/Button';
import ExpandedOffer from '@/components/ExpandedOffer';
import Modal from '@/components/Modal';
import OffersList from '@/components/OffersList';
import Header from '@/components/Header';
import ViabilityIndicators from '@/components/ViabilityIndicators';

export default function OfferOverview() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const [isModalShow, setIsModalShow] = useState(false);

  const offers = useSelector(selectOffers);
  const expandedOffers = getExpandedOffers(offers);

  const onDownloadClick = () => {
    dispatch(downloadDocument());
  };

  return (
    <>
      <Header
        isVisibleBack
        isVisibleShare
      />
      <div className="bg-blue01 h-[calc(100vh-88px)] max-h-[calc(100vh-88px)] overflow-y-auto">
        <div className="bg-primary px-5 py-4">
          <ViabilityIndicators />
        </div>
        <div className="p-5">
          {expandedOffers?.map((offerItr) => (
            <ExpandedOffer
              key={`${offerItr.duration}-${offerItr.productType}`}
              offer={offerItr}
            />
          ))}
          <div className="mt-4 mb-2">
            <OffersList offers={offers} setIsModalShow={setIsModalShow} />
          </div>
        </div>
        <div className="bg-primary fixed bottom-0 left-0 w-full border-t border-inner px-6 py-5">
          <Button
            type="button"
            caption={t('generateDocument')}
            onClick={onDownloadClick}
          />
        </div>
        <Modal
          isOpen={isModalShow}
          setIsOpen={setIsModalShow}
          title="Too many offers selected"
          description="You have already selected the maximum of 8 different interest rates. To select the interest rate with duration 10 years, you have to unselect one or more of the selected durations."
        />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
