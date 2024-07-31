import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { MdOutlineClose } from 'react-icons/md';

import { TextField } from '@aws-amplify/ui-react';
import { zodResolver } from '@hookform/resolvers/zod';

import IconButton from 'components/IconButton';
import CustomButton from 'components/CustomButton';
import { DEFAULT_REVIEW_STATUS } from 'utils/constants';
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
  const { t } = useTranslation();

  const watchStartDateSubmitted = watch('startDateSubmitted');
  const watchEndDateSubmitted = watch('endDateSubmitted');

  const onSubmit = (data: Inputs) => {
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

  const customStatusCheckboxData = [
    {
      name: DEFAULT_REVIEW_STATUS,
      label: DEFAULT_REVIEW_STATUS,
      type: DEFAULT_REVIEW_STATUS,
    },
    ...customStatuses.map((customStatus) => ({
      name: customStatus,
      label: customStatus,
      type: customStatus,
    })),
  ];

  const checkbox1 = typeCheckbox(t);
  const checkbox2 = reviewStatusCheckbox(t);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.filterModal}>
      <div className={style.filterModalTitleContainer}>
        <span className="theme-subtitle-s2">
          {t('pages.habitat.affiliate.cycles.cycle.components.filters.title')}
        </span>
        <IconButton variation="not-outlined" onClick={close}>
          <MdOutlineClose />
        </IconButton>
      </div>
      <div className={style.inputContainer}>
        <div className={`theme-body-small ${style.inputTitle}`}>
          <span>
            {t('pages.habitat.affiliate.cycles.cycle.components.filters.dates')}
          </span>
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
            label={t(
              'pages.habitat.affiliate.cycles.cycle.components.filters.startDate'
            )}
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
            label={t(
              'pages.habitat.affiliate.cycles.cycle.components.filters.endDate'
            )}
            type="date"
            className={style.customDateInput}
            {...register('endDateSubmitted')}
          />
        </div>
      </div>
      <Checkboxes
        title={checkbox1.title}
        control={control}
        name={checkbox1.name}
        data={checkbox1.data}
      />
      <Checkboxes
        control={control}
        title={checkbox2.title}
        name={checkbox2.name}
        data={checkbox2.data}
      />
      <Checkboxes
        control={control}
        title={t(
          'pages.habitat.affiliate.cycles.cycle.components.filters.customStatus'
        )}
        name="customStatus"
        data={customStatusCheckboxData}
      />
      <div className={style.filterModalButtonsContainer}>
        <CustomButton variation="text-only" onClick={handleResetFilters}>
          {t(
            'pages.habitat.affiliate.cycles.cycle.components.filters.clearFilters'
          )}
        </CustomButton>
        <CustomButton type="submit">
          {t('pages.habitat.affiliate.cycles.cycle.components.filters.save')}
        </CustomButton>
      </div>
    </form>
  );
};

export default Filters;
