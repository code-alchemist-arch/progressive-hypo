import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Header from '@/components/Header';
import LeadForm from '@/components/LeadForm';

export default function Lead() {
  const { t } = useTranslation('common');

  return (
    <>
      <Header
        title={t('makeAppointment')}
        isVisibleBack
      />
      <LeadForm />
    </>
  )
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
