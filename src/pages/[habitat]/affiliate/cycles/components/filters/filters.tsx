'use client';

import { MdCheck, MdClose } from 'react-icons/md';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@aws-amplify/ui-react';

import styles from './filters.module.css';
import { Inputs, FilterProps } from '../../types';

const Filters = ({ close, filters, setFilters }: FilterProps) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setFilters(data);
  };

  return (
    <form className={styles.background} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.header}>
        <p className={`theme-subtitle-s2 ${styles.color_neutral_100}`}>
          Filter Options
        </p>
        <div className={styles.close}>
          <MdClose size="1.5rem" cursor="pointer" onClick={close} />
        </div>
      </div>
      <div className={styles.inputs}>
        <p className={`${styles.dates_title} theme-body-small`}>Dates</p>
        <div className={styles.input}>
          <label
            htmlFor="startDate"
            className={`theme-body-medium ${styles.label}`}
          >
            Start Date
          </label>
          <input
            defaultValue={filters.startDate}
            className={`theme-body-medium ${styles.input_date}`}
            type="date"
            id="startDate"
            {...register('startDate')}
          />
        </div>
        <div className={styles.input}>
          <label
            htmlFor="endDate"
            className={`theme-body-medium ${styles.label}`}
          >
            End Date
          </label>
          <input
            defaultValue={filters.endDate}
            className={`theme-body-medium ${styles.input_date}`}
            type="date"
            id="endDate"
            {...register('endDate')}
          />
        </div>
      </div>
      <div className={styles.inputs}>
        <p className={`${styles.dates_title} theme-body-small`}>Status</p>
        <label htmlFor="status-open" className={styles.radio_label}>
          <input
            defaultChecked={filters.status === 'open'}
            className={styles.radio_input}
            type="radio"
            id="status-open"
            {...register('status')}
            value="open"
          />
          <span className={styles.radio_circle} />
          <span className={styles.radio_checkmark} />
          <MdCheck className={styles.radio_icon} />
          Open
        </label>
        <label htmlFor="status-close" className={styles.radio_label}>
          <input
            defaultChecked={filters.status === 'close'}
            className={styles.radio_input}
            type="radio"
            id="status-close"
            {...register('status')}
            value="close"
          />
          <span className={styles.radio_circle} />
          <span className={styles.radio_checkmark} />
          <MdCheck className={styles.radio_icon} />
          Close
        </label>
      </div>
      <div className={styles.buttons}>
        <Button
          variation="link"
          onClick={() => {
            setFilters({
              startDate: '',
              endDate: '',
              status: null,
            });
            reset();
          }}
        >
          Clear Filters
        </Button>
        <Button variation="primary" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default Filters;
