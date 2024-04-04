import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button, Flex, SelectField, TextField } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { formatPhoneNumber } from 'utils/formatters';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { API } from 'aws-amplify';
import SearchableSelectInput from 'components/SearchableSelectInput';
import { getCheckOrExEmoji } from 'utils/misc';
import { previousEmploymentSchema } from '../HomeownershipEmploymentPage.schema';
import states from '../../../../../assets/jsons/states.json';

const PreviousEmployment = ({
  employmentInfo,
  expanded,
  onExpandedChange,
  onValid,
  edit,
  onClickEdit,
  coApplicant,
}) => {
  const [cities, setCities] = useState([]);

  const formattedValues = useMemo(() => {
    if (
      coApplicant
        ? employmentInfo?.props?.coApplicantPreviousEmployment !== undefined
        : employmentInfo?.props?.previousEmployment !== undefined
    ) {
      return {
        ...(coApplicant
          ? employmentInfo.props.coApplicantPreviousEmployment
          : employmentInfo.props.previousEmployment),
        employerCity: {
          selectedCity: {
            id: coApplicant
              ? employmentInfo.props.coApplicantPreviousEmployment.employerCity
              : employmentInfo.props.previousEmployment.employerCity,
            label: coApplicant
              ? employmentInfo.props.coApplicantPreviousEmployment.employerCity
              : employmentInfo.props.previousEmployment.employerCity,
          },
          query: coApplicant
            ? employmentInfo.props.coApplicantPreviousEmployment.employerCity
            : employmentInfo.props.previousEmployment.employerCity,
        },
      };
    }
  }, [employmentInfo, coApplicant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    resetField,
    control,
  } = useForm({
    resolver: zodResolver(previousEmploymentSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: formattedValues,
  });

  const isEnabled =
    (coApplicant
      ? !employmentInfo?.props?.coApplicantPreviousEmployment
      : !employmentInfo?.props?.previousEmployment) || edit;

  const handleOnChangePhone = (event) => {
    const formattedNumber = formatPhoneNumber(event.target.value);
    event.target.value = formattedNumber;
  };

  const watchState = watch('employerState');

  const watchCityQuery = watch('employerCity');

  const getApplicantCurrentAddressCities = useMemo(
    () =>
      debounce(async (cityNameQuery, state) => {
        try {
          const newCities = await API.get(
            'public',
            `/cities?cityNameQuery=${cityNameQuery}&state=${state}`
          );

          setCities(
            newCities.map((city) => ({
              id: city.city,
              label: city.city,
            }))
          );
        } catch (error) {
          console.log('Error fetching cities.');
        }
      }, 150),
    []
  );

  useEffect(() => {
    getApplicantCurrentAddressCities(watchCityQuery?.query, watchState);
  }, [getApplicantCurrentAddressCities, watchCityQuery, watchState]);

  useEffect(() => {
    resetField('employerCity', {
      defaultValue: {
        query: '',
      },
    });
    setCities([]);
  }, [resetField, watchState]);

  return (
    <CustomExpandableCard
      title={`${getCheckOrExEmoji(
        coApplicant
          ? employmentInfo?.props?.coApplicantPreviousEmployment !== undefined
          : employmentInfo?.props?.previousEmployment !== undefined
      )}${coApplicant ? ' Co-applicant' : ''} Previous Employment Information`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <TextField
          label={
            coApplicant
              ? "What is the name of the co-applicant's previous employer?"
              : 'What is the name of your previous employer?'
          }
          {...register('employerName')}
          errorMessage="Name must contain at least 1 character"
          hasError={errors?.employerName !== undefined}
          isRequired
          isDisabled={!isEnabled}
        />
        <br />

        <SelectField
          label="State"
          {...register('employerState')}
          errorMessage="Invalid state"
          hasError={errors?.address !== undefined}
          isRequired
          isDisabled={!isEnabled}
          defaultValue=""
        >
          {states.map((state) => (
            <option key={state.abbreviation} value={state.abbreviation}>
              {state.name}
            </option>
          ))}
        </SelectField>
        <br />
        <Controller
          control={control}
          name="employerCity"
          defaultValue={{
            query: '',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <SearchableSelectInput
              name="employerCity"
              label="City"
              options={cities}
              value={value?.query}
              selectedOption={value?.selectedCity}
              onClickOption={(newSelectedOption) =>
                onChange({ ...value, selectedCity: newSelectedOption })
              }
              onChange={(event) => {
                onChange({ ...value, query: event.currentTarget.value });
              }}
              onBlur={onBlur}
              onUnselect={() =>
                onChange({ query: '', selectedCity: undefined })
              }
              isDisabled={!isEnabled}
              errorMessage="Invalid city"
              hasError={errors?.city?.selectedCity !== undefined}
              isRequired
            />
          )}
        />
        <br />
        <TextField
          label="Street"
          placeholder="70 Morningside Dr"
          {...register('employerStreet')}
          errorMessage="Street address must contain at least 1 character"
          hasError={errors?.employerStreet !== undefined}
          isRequired
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label="Zip code"
          placeholder="12345"
          {...register('employerZipCode')}
          errorMessage={errors?.employerZipCode?.message}
          hasError={errors?.employerZipCode !== undefined}
          isRequired
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label={
            coApplicant
              ? "What was the co-applicant's approximate start date with this employer?"
              : 'What was your approximate start date with this employer?'
          }
          type="date"
          isRequired
          {...register('startDate')}
          errorMessage={errors?.startDate?.message}
          hasError={errors?.startDate !== undefined}
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label={
            coApplicant
              ? "What was the co-applicant's approximate end date with this employer?"
              : 'What was your approximate end date with this employer?'
          }
          type="date"
          isRequired
          {...register('endDate')}
          errorMessage={errors?.endDate?.message}
          hasError={errors?.endDate !== undefined}
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label="Type of Business?"
          {...register('businessType')}
          errorMessage={errors?.businessType?.message}
          hasError={errors?.businessType !== undefined}
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label="Business phone?"
          placeholder="(800) 555‑0100"
          {...register('businessPhone')}
          onChange={handleOnChangePhone}
          errorMessage={errors?.businessPhone?.message}
          hasError={errors?.businessPhone !== undefined}
          isDisabled={!isEnabled}
        />
        <br />

        <Flex width="100%" justifyContent="end">
          {employmentInfo?.props?.[
            coApplicant ? 'coApplicantPreviousEmployment' : 'previousEmployment'
          ] ? (
            <Button onClick={onClickEdit} variation="secondary">
              {edit ? 'Cancel' : 'Edit'}
            </Button>
          ) : null}
          {isEnabled ? (
            <Button type="submit" variation="primary">
              Save
            </Button>
          ) : null}
        </Flex>
      </form>
    </CustomExpandableCard>
  );
};

PreviousEmployment.propTypes = {
  employmentInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onValid: PropTypes.func,
  edit: PropTypes.bool,
  onClickEdit: PropTypes.func,
  coApplicant: PropTypes.bool,
};

export default PreviousEmployment;
