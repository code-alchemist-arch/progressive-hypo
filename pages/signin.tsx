import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { AppDispatch } from '@/store';
import { login } from '@/store/slice';

import Input from '@/components/Input';
import Button from '@/components/Button';

type ValuesType = {
  advisorEMail: string;
};

export default function Signin() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation('signin');

  const validationSchema = Yup.object().shape({
    advisorEMail: Yup.string()
      .email('E-Mail is invalid')
      .required('E-Mail is required'),
  });

  const onSubmit = (variables: ValuesType) => {
    dispatch(login(variables.advisorEMail));
    router.push('/');
  };

  const formik = useFormik({
    initialValues: {
      advisorEMail: '',
    },
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <Head>
        <title>{t('siteTitle')}</title>
        <meta name="theme-color" content="#F4F4F4" />
      </Head>
      <div className="relative flex justify-center items-center w-screen h-screen">
        <form className="w-full max-w-2xl px-6" onSubmit={formik.handleSubmit}>
          <Image
            className="absolute top-[15%]"
            src="/images/logo.svg"
            alt="logo"
            width="150"
            height="37"
          />
          <Input
            label={t('eMailLabel')}
            name="advisorEMail"
            value={formik.values.advisorEMail}
            onChange={(value) => formik.setFieldValue('advisorEMail', value)}
            required
          />
          <div className="w-full mt-8">
            <Button type="submit" caption={t('loginButton')} />
          </div>
        </form>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['signin'])),
      // Will be passed to the page component as props
    },
  };
}
