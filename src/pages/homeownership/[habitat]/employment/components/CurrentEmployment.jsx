import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Flex,
  Radio,
  RadioGroupField,
  SelectField,
  TextField,
} from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { formatPhoneNumber } from 'utils/formatters';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { API } from 'aws-amplify';
import SearchableSelectInput from 'components/SearchableSelectInput';
import { getCheckOrExEmoji } from 'utils/misc';
import { currentEmploymentSchema } from '../HomeownershipEmploymentPage.schema';
import states from '../../../../../assets/jsons/states.json';

const CurrentEmployment = ({
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
        ? employmentInfo?.props?.coApplicantCurrentEmployment !== undefined
        : employmentInfo?.props?.currentEmployment !== undefined
    ) {
      return {
        ...(coApplicant
          ? employmentInfo.props.coApplicantCurrentEmployment
          : employmentInfo.props.currentEmployment),
        employerCity: {
          selectedCity: {
            id: coApplicant
              ? employmentInfo.props.coApplicantCurrentEmployment.employerCity
              : employmentInfo.props.currentEmployment.employerCity,
            label: coApplicant
              ? employmentInfo.props.coApplicantCurrentEmployment.employerCity
              : employmentInfo.props.currentEmployment.employerCity,
          },
          query: coApplicant
            ? employmentInfo.props.coApplicantCurrentEmployment.employerCity
            : employmentInfo.props.currentEmployment.employerCity,
        },
      };
    }
  }, [employmentInfo, coApplicant]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    resetField,
  } = useForm({
    resolver: zodResolver(currentEmploymentSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: formattedValues,
  });

  const isEnabled =
    (coApplicant
      ? !employmentInfo?.props?.coApplicantCurrentEmployment
      : !employmentInfo?.props?.currentEmployment) || edit;

  const handleOnChangePhone = (event) => {
    const formattedNumber = formatPhoneNumber(event.target.value);
    event.target.value = formattedNumber;
  };
  const watchState = watch('employerState');

  const watchCityQuery = watch('employerCity');

  const getApplicantCurrentAddressCities = useCallback(
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
  }, [watchCityQuery, watchState]);

  useEffect(() => {
    resetField('employerCity', {
      defaultValue: {
        query: '',
      },
    });
    setCities([]);
  }, [watchState]);

  return (
    <CustomExpandableCard
      title={`${getCheckOrExEmoji(
        coApplicant
          ? employmentInfo?.props?.coApplicantCurrentEmployment !== undefined
          : employmentInfo?.props?.currentEmployment !== undefined
      )}${coApplicant ? ' Co-applicant' : ''} Employment Information`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <TextField
          label={
            coApplicant
              ? "What is the name of the co-applicant's current employer?"
              : 'What is the name of your current employer?'
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
        <Controller
          control={control}
          name="firstJob"
          defaultValue="Yes"
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroupField
              name="firstJob"
              label={
                coApplicant
                  ? "Is this the co-applicant's first job?"
                  : 'Is this your first job?'
              }
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              value={value}
              isRequired
              hasError={errors?.firstJob !== undefined}
              isDisabled={!isEnabled}
            >
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </RadioGroupField>
          )}
        />
        <br />
        <Flex width="100%" justifyContent="end">
          {employmentInfo?.props?.[
            coApplicant ? 'coApplicantCurrentEmployment' : 'currentEmployment'
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

CurrentEmployment.propTypes = {
  employmentInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onValid: PropTypes.func,
  edit: PropTypes.bool,
  onClickEdit: PropTypes.func,
  coApplicant: PropTypes.bool,
};

export default CurrentEmployment;
