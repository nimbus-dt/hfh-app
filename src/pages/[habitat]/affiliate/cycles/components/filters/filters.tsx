'use client';

import { useTranslation } from 'react-i18next';
import { MdCheck, MdClose } from 'react-icons/md';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@aws-amplify/ui-react';
import { throttle } from 'lodash';

import { convertDateYYYYMMDDtoDDMMYYYY } from 'utils/dates';
import styles from './filters.module.css';
import { Inputs, FilterProps } from '../../types';

const Filters = ({ close, filters, setFilters }: FilterProps) => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset, watch } = useForm<Inputs>({
    values: {
      startDate: filters.startDate,
      endDate: filters.endDate,
      status: filters.status,
    },
  });

  const watchStartDate = watch('startDate');
  const watchEndDate = watch('endDate');

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setFilters(data);
    close();
  };

  return (
    <form
      className={styles.background}
      onSubmit={throttle(handleSubmit(onSubmit), 500)}
    >
      <div className={styles.header}>
        <p className={`theme-subtitle-s2 ${styles.color_neutral_100}`}>
          {t('pages.habitat.affiliate.cycles.components.filters.title')}
        </p>
        <div className={styles.close}>
          <MdClose size="1.5rem" cursor="pointer" onClick={close} />
        </div>
      </div>
      <div className={styles.inputs}>
        <p className={`${styles.dates_title} theme-body-small`}>
          {t('pages.habitat.affiliate.cycles.components.filters.dates')}
        </p>
        <div className={styles.dateInput}>
          <div className={styles.input_date_text}>
            {watchStartDate
              ? convertDateYYYYMMDDtoDDMMYYYY(watchStartDate)
              : 'MM/DD/YYYY'}
          </div>
          <label
            htmlFor="startDate"
            className={`theme-body-medium ${styles.label}`}
          >
            {t('pages.habitat.affiliate.cycles.components.filters.startDate')}
          </label>
          <input
            className={`theme-body-medium ${styles.input_date}`}
            type="date"
            id="startDate"
            {...register('startDate')}
          />
        </div>
        <div className={styles.dateInput}>
          <div className={styles.input_date_text}>
            {watchEndDate
              ? convertDateYYYYMMDDtoDDMMYYYY(watchEndDate)
              : 'MM/DD/YYYY'}
          </div>
          <label
            htmlFor="endDate"
            className={`theme-body-medium ${styles.label}`}
          >
            {t('pages.habitat.affiliate.cycles.components.filters.endDate')}
          </label>
          <input
            className={`theme-body-medium ${styles.input_date}`}
            type="date"
            id="endDate"
            {...register('endDate')}
          />
        </div>
      </div>
      <div className={styles.inputs}>
        <p className={`${styles.dates_title} theme-body-small`}>
          {t('pages.habitat.affiliate.cycles.components.filters.status')}
        </p>
        <label htmlFor="status-open" className={styles.radio_label}>
          <input
            className={styles.radio_input}
            type="radio"
            id="status-open"
            {...register('status')}
            value="open"
          />
          <span className={styles.radio_circle} />
          <span className={styles.radio_checkmark} />
          <MdCheck className={styles.radio_icon} />
          {t('pages.habitat.affiliate.cycles.components.filters.open')}
        </label>
        <label htmlFor="status-close" className={styles.radio_label}>
          <input
            className={styles.radio_input}
            type="radio"
            id="status-close"
            {...register('status')}
            value="close"
          />
          <span className={styles.radio_circle} />
          <span className={styles.radio_checkmark} />
          <MdCheck className={styles.radio_icon} />
          {t('pages.habitat.affiliate.cycles.components.filters.close')}
        </label>
      </div>
      <div className={styles.buttons}>
        <Button
          variation="link"
          onClick={throttle(() => {
            setFilters({
              startDate: '',
              endDate: '',
              status: null,
            });
            reset();
          }, 500)}
        >
          {t('pages.habitat.affiliate.cycles.components.filters.clearFilters')}
        </Button>
        <Button variation="primary" type="submit">
          {t('pages.habitat.affiliate.cycles.components.filters.save')}
        </Button>
      </div>
    </form>
  );
};

export default Filters;
