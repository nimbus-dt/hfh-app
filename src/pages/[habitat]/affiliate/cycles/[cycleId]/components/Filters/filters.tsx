import { useForm } from 'react-hook-form';
import { MdOutlineClose } from 'react-icons/md';

import { TextField } from '@aws-amplify/ui-react';
import { zodResolver } from '@hookform/resolvers/zod';

import IconButton from 'components/IconButton';
import CustomButton from 'components/CustomButton';
import { convertDateYYYYMMDDtoDDMMYYYY } from 'utils/dates';

import style from '../../AffiliateCycleApplications.module.css';
import { applicationsFilterSchema } from '../../AffiliateCycleApplications.schema';
import { FilterProps, Inputs } from '../../types';

import Checkboxes from './components/Checkboxes/Checkboxes';
import { reviewStatusCheckbox, typeCheckbox } from './data/checkboxes';

const Filters = ({
  close,
  filters,
  setFilters,
  customStatuses,
}: FilterProps) => {
  const { register, control, handleSubmit, reset, watch } = useForm({
    values: {
      startDateSubmitted: filters.startDateSubmitted,
      endDateSubmitted: filters.endDateSubmitted,
      type: filters.type,
      reviewStatus: filters.reviewStatus,
      customStatus: filters.customStatus,
    },
    resolver: zodResolver(applicationsFilterSchema),
  });

  const watchStartDateSubmitted = watch('startDateSubmitted');
  const watchEndDateSubmitted = watch('endDateSubmitted');

  const onSubmit = (data: Inputs) => {
    console.log(data);
    setFilters(data);
    close();
  };

  const handleResetFilters = () => {
    setFilters({
      startDateSubmitted: '',
      endDateSubmitted: '',
      type: null,
      reviewStatus: null,
      customStatus: '',
    });
    reset();
  };

  const customStatusCheckboxData = customStatuses.map((customStatus) => ({
    name: customStatus,
    label: customStatus,
    type: customStatus,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.filterModal}>
      <div className={style.filterModalTitleContainer}>
        <span className="theme-subtitle-s2">Filter Options</span>
        <IconButton variation="not-outlined" onClick={close}>
          <MdOutlineClose />
        </IconButton>
      </div>
      <div className={style.inputContainer}>
        <div className={`theme-body-small ${style.inputTitle}`}>
          <span>Dates</span>
        </div>
        <div style={{ position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1rem',
            }}
            className={style.textDate}
          >
            {watchStartDateSubmitted && watchStartDateSubmitted !== 'MM/DD/YYYY'
              ? convertDateYYYYMMDDtoDDMMYYYY(watchStartDateSubmitted)
              : 'MM/DD/YYYY'}
          </span>
          <TextField
            id="startDate"
            label="Start Date Submitted"
            type="date"
            className={`${style.customDateInput}`}
            {...register('startDateSubmitted')}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1rem',
            }}
            className={style.textDate}
          >
            {watchEndDateSubmitted && watchEndDateSubmitted !== 'MM/DD/YYYY'
              ? convertDateYYYYMMDDtoDDMMYYYY(watchEndDateSubmitted)
              : 'MM/DD/YYYY'}
          </span>
          <TextField
            id="endDate"
            label="End Date Submitted"
            type="date"
            className={style.customDateInput}
            {...register('endDateSubmitted')}
          />
        </div>
      </div>
      <Checkboxes
        title={typeCheckbox.title}
        control={control}
        name={typeCheckbox.name}
        data={typeCheckbox.data}
      />
      <Checkboxes
        control={control}
        title={reviewStatusCheckbox.title}
        name={reviewStatusCheckbox.name}
        data={reviewStatusCheckbox.data}
      />
      <Checkboxes
        control={control}
        title="Custom Status"
        name="customStatus"
        data={customStatusCheckboxData}
      />
      <div className={style.filterModalButtonsContainer}>
        <CustomButton variation="text-only" onClick={handleResetFilters}>
          Clear Filters
        </CustomButton>
        <CustomButton type="submit">Save</CustomButton>
      </div>
    </form>
  );
};

export default Filters;
