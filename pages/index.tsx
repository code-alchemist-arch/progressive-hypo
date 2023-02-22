import { useRef, useState, useMemo } from 'react';
import classNames from 'classnames';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { MORTGAGE_MODE_NEW } from '@/utils/constants';

import CalculationModeSelector from '@/components/CalculationModeSelector';
import Header from '@/components/Header';
import MortgageForm from '@/components/MortgageForm';

export default function Home() {
  const homeInnerRef = useRef<any>();
  const homeOuterRef = useRef<any>();
  const [selectedMode, setSelectedMode] = useState(MORTGAGE_MODE_NEW);

  const handleTabClick = (updatedMode: string) => {
    setSelectedMode(updatedMode);
  };

  const isBorderVisible = useMemo(
    () =>
      homeInnerRef.current &&
      homeOuterRef.current &&
      homeInnerRef.current.scrollHeight > homeOuterRef.current.height,
    [homeInnerRef.current, homeOuterRef.current],
  );

  const wrapperClassName = useMemo(
    () =>
      classNames(
        'relative h-[calc(100vh-160px)] max-h-[calc(100vh-160px)] overflow-y-auto border-inner',
        { ['border-b']: isBorderVisible },
      ),
    [isBorderVisible],
  );

  return (
    <>
      <Header />
      <div className={wrapperClassName} ref={homeOuterRef}>
        <div ref={homeInnerRef}>
          <div className="py-7 px-6">
            <CalculationModeSelector
              mode={selectedMode}
              onClick={(updatedMode: string) => handleTabClick(updatedMode)}
            />
          </div>
          <MortgageForm mode={selectedMode} />
        </div>
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
