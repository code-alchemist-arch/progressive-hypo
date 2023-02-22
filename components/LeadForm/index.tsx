import { useTranslation } from 'next-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import CustomSelect from '@/components/CustomSelect';
import IntegratedInput from '@/components/IntegratedInput';
import Button from '@/components/Button';
import { SelectValue } from '@/types/common';

type LeadFormValues = {
  salutation: SelectValue;
  firstName: string;
  lastName: string;
  email: string;
}

// temporary data
const salutations = [
  { value: 'hello',  label: 'hello' },
  { value: 'hi',  label: 'hi' },
  { value: 'good morning',  label: 'good morning' },
  { value: 'good afternoon',  label: 'good afternoon' },
  { value: 'good evening',  label: 'good evening' },
];

const initialLeadFormValues = {
  salutation: salutations[0],
  firstName: '',
  lastName: '',
  email: '',
};

export default function LeadForm() {
  const { t } = useTranslation('common');

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('eMail is required'),
  });

  const onSubmit = (variables: LeadFormValues) => {}

  // configure formik
  const { errors, values, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialLeadFormValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="px-6 pb-32">
        <h2 className="text-2xl font-medium leading-7 text-black font-serif my-10">
          {t('whatAdvice')}
        </h2>
        <CustomSelect
          label={t('salutation')}
          name="salutation"
          options={salutations}
          value={values.salutation}
          onChange={(newValue) => setFieldValue('salutation', newValue)}
        />
        {
          Object.keys(initialLeadFormValues)
            .filter((name: string) => name !== 'salutation')
            .map((name: string) => (
              <IntegratedInput
                key={name}
                type={ name === 'email' ? 'email' : 'text' }
                label={t(name)}
                name={name}
                // @ts-ignore
                hasError={!!errors[name as keyof initialLeadFormValues]}
                // @ts-ignore
                value={values[name as keyof initialLeadFormValues]}
                onChange={(newValue) => setFieldValue(name, newValue)}
              />
            ))
        }
        <p className="text-base text-grey02 leading-5 mt-2.5">
          {t('whichSelctedTopic')}
        </p>
        <div className="bg-primary fixed bottom-0 left-0 w-full px-6 pt-5 pb-8">
          <Button type="submit" caption={t('continue')} />
        </div>
      </div>
    </form>
  );
}
