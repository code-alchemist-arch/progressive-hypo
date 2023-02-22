import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { MORTGAGE_MODE_NEW, MORTGAGE_MODE_PAYING_OFF } from '@/utils/constants';
import useDebounce from '@/utils/useDebounce';
import { IApiCalculateOffersParams } from '@/utils/api';
import {
  calculateOffers,
  calculateSustainability,
  selectAdvisorEMail,
} from '@/store/slice';
import { AppDispatch } from '@/store';

import Button from '@/components/Button';
import NumberInput from '@/components/NumberInput';
import ViabilityIndicators from '@/components/ViabilityIndicators';
import Input from '@/components/Input';

type MortgageFormValues = {
  marketValue: number | undefined;
  purchasePrice: number | undefined;
  postalCode: number | undefined;
  ownFunds: number | undefined;
  mortgageValue: number | undefined;
  grossYearlyIncome: number | undefined;
  dueDate: any;
};

const initialMortgageFormValues = {
  marketValue: undefined,
  purchasePrice: undefined,
  postalCode: undefined,
  ownFunds: undefined,
  mortgageValue: undefined,
  grossYearlyIncome: undefined,
  dueDate: dayjs().add(1, 'month').endOf('month').format('YYYY-MM-DD'),
};

const formFields = [
  {
    name: 'marketValue',
    suffix: 'CHF',
    type: 'number',
    mode: 'PAYING_OFF',
  },
  {
    name: 'purchasePrice',
    suffix: 'CHF',
    type: 'number',
    mode: 'NEW',
  },
  {
    name: 'postalCode',
    suffix: 'ZIP',
    type: 'number',
  },
  {
    name: 'ownFunds',
    suffix: 'CHF',
    type: 'number',
    mode: 'NEW',
  },
  {
    name: 'mortgageValue',
    suffix: 'CHF',
    type: 'number',
    mode: 'PAYING_OFF',
  },
  {
    name: 'grossYearlyIncome',
    suffix: 'CHF',
    type: 'number',
  },
];

export default function MortgageForm({ mode }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { t } = useTranslation('common');
  const advisorEMail = useSelector(selectAdvisorEMail);

  const validationSchema = Yup.object().shape({
    marketValue: Yup.number().when([], {
      is: () => mode === MORTGAGE_MODE_PAYING_OFF,
      then: Yup.number().min(0).required('Market price is required'),
    }),
    purchasePrice: Yup.number().when([], {
      is: () => mode === MORTGAGE_MODE_NEW,
      then: Yup.number().min(0).required('Purchase price is required'),
    }),
    postalCode: Yup.number().min(0).required('Postcode is required'),
    ownFunds: Yup.number().when([], {
      is: () => mode === MORTGAGE_MODE_NEW,
      then: Yup.number().min(0).required('Own funds is required'),
    }),
    mortgageValue: Yup.number().when([], {
      is: () => mode === MORTGAGE_MODE_PAYING_OFF,
      then: Yup.number().min(0).required('Mortgage value is required'),
    }),
    grossYearlyIncome: Yup.number()
      .min(0)
      .required('Gross yearly income is required'),
  });

  const onSubmit = async (variables: MortgageFormValues) => {
    try {
      const {
        purchasePrice,
        marketValue,
        mortgageValue,
        ownFunds,
        grossYearlyIncome,
        postalCode,
        dueDate,
      } = variables;

      const calculateOffersParams: IApiCalculateOffersParams = {
        mode,
        purchasePrice,
        marketValue,
        mortgageValue,
        ownFunds,
        dueDate,
        grossYearlyIncome: grossYearlyIncome || 0,
        postalCode: postalCode ? postalCode.toString() : '8044',
        salesChannel: 'SL',
        advisorMail: advisorEMail,
      };

      dispatch(calculateOffers(calculateOffersParams))
        .unwrap()
        .then(() => {
          router.push('/offer');
        });
    } catch (e) {}
  };

  // configure formik
  const { errors, values, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialMortgageFormValues,
    validationSchema,
    onSubmit,
  });

  // recalculate viability
  const debouncedValues = useDebounce(values, 1000);
  useEffect(() => {
    const propertyPrice =
      mode === MORTGAGE_MODE_NEW ? values.purchasePrice : values.marketValue;
    if (!propertyPrice || !values.grossYearlyIncome || !values.ownFunds) {
      return;
    }

    dispatch(
      calculateSustainability({
        propertyPrice,
        ownFunds: values.ownFunds,
        grossYearlyIncome: values.grossYearlyIncome,
      }),
    );
  }, [dispatch, mode, debouncedValues]);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="px-6 pb-32">
        {formFields
          .filter(
            (inputItr) =>
              !inputItr.mode || (inputItr.mode && inputItr.mode === mode),
          )
          .map(({ name, suffix }) => (
            <NumberInput
              key={name}
              name={name}
              label={t(name)}
              suffix={suffix}
              hasError={!!errors[name as keyof MortgageFormValues]}
              // @ts-ignore
              value={values[name as keyof MortgageFormValues]}
              onChange={(newValue) => setFieldValue(name, newValue)}
            />
          ))}
        {mode === MORTGAGE_MODE_PAYING_OFF && (
          <Input
            type="date"
            label={t('dueDate')}
            name="dueDate"
            value={values.dueDate}
            hasError={!!errors.dueDate}
            onChange={(newValue) => setFieldValue('dueDate', newValue)}
          />
        )}
        <ViabilityIndicators />
      </div>
      <div className="bg-primary fixed bottom-0 left-0 w-full px-6 pt-5 pb-8">
        <Button type="submit" caption={t('calculateOffers')} />
      </div>
    </form>
  );
}
