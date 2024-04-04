import {
  RadioGroupField,
  TextField,
  Radio,
  Button,
  Flex,
  SelectField,
} from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCheckOrExEmoji } from 'utils/misc';
import CustomExpandableCard from 'components/CustomExpandableCard';
import SearchableSelectInput from 'components/SearchableSelectInput';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { API } from 'aws-amplify';
import { debounce } from 'lodash';
import {
  addressSchema,
  ownerShipValues,
} from '../HomeownershipApplicantInfoPage.schema';
import states from '../../../../../assets/jsons/states.json';

export default function Address({
  expanded,
  onExpandedChange,
  applicantInfo,
  onValid,
  edit,
  onClickEdit,
  coApplicant,
}) {
  const [cities, setCities] = useState([]);

  const formattedValues = useMemo(() => {
    if (
      coApplicant
        ? applicantInfo?.props?.coApplicantCurrentAddress !== undefined
        : applicantInfo?.props?.currentAddress !== undefined
    ) {
      return coApplicant
        ? {
            ...applicantInfo.props.coApplicantCurrentAddress,
            city: {
              selectedCity: {
                id: applicantInfo.props.coApplicantCurrentAddress.city,
                label: applicantInfo.props.coApplicantCurrentAddress.city,
              },
              query: applicantInfo.props.coApplicantCurrentAddress.city,
            },
          }
        : {
            ...applicantInfo.props.currentAddress,
            city: {
              selectedCity: {
                id: applicantInfo.props.currentAddress.city,
                label: applicantInfo.props.currentAddress.city,
              },
              query: applicantInfo.props.currentAddress.city,
            },
          };
    }
  }, [applicantInfo, coApplicant]);

  const {
    resetField,
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(addressSchema),
    values: formattedValues,
  });

  const isEnabled =
    (coApplicant
      ? !applicantInfo?.props?.coApplicantCurrentAddress
      : !applicantInfo?.props?.currentAddress) || edit;

  const watchState = watch('state');

  const watchCityQuery = watch('city');

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
    resetField('city', {
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
          ? applicantInfo?.props?.coApplicantCurrentAddress !== undefined
          : applicantInfo?.props?.currentAddress !== undefined
      )}${coApplicant ? ' Co-applicant' : ''} Present Address`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <SelectField
          label="State"
          {...register('state')}
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
          name="city"
          defaultValue={{
            query: '',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <SearchableSelectInput
              name="city"
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
          {...register('street')}
          errorMessage="Street address must contain at least 1 character"
          hasError={errors?.address !== undefined}
          isRequired
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label="Zip code"
          placeholder="12345"
          {...register('zipCode')}
          errorMessage={errors?.zipCode?.message}
          hasError={errors?.zipCode !== undefined}
          isRequired
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label={
            coApplicant
              ? 'How long have the co-applicant lived at this address, in months?'
              : 'How long have you lived at this address, in months?'
          }
          placeholder="48"
          type="number"
          {...register('monthsLivedHere')}
          min={0}
          hasError={errors?.monthsLivedHere !== undefined}
          isRequired
          isDisabled={!isEnabled}
        />
        <br />
        <Controller
          control={control}
          name="ownershipStatus"
          defaultValue={ownerShipValues[0]}
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroupField
              name="ownershipStatus"
              label={
                coApplicant
                  ? 'Which of these best represents the ownership status of the address the co-applicant currently live in?'
                  : 'Which of these best represents the ownership status of the address you currently live in?'
              }
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              value={value}
              isDisabled={!isEnabled}
              isRequired
            >
              {ownerShipValues.map((ownerShip) => (
                <Radio key={ownerShip} value={ownerShip}>
                  {ownerShip}
                </Radio>
              ))}
            </RadioGroupField>
          )}
        />
        <Flex width="100%" justifyContent="end">
          {applicantInfo?.props[
            coApplicant ? 'coApplicantCurrentAddress' : 'currentAddress'
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
}

Address.propTypes = {
  applicantInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onValid: PropTypes.func,
  edit: PropTypes.bool,
  onClickEdit: PropTypes.func,
  coApplicant: PropTypes.bool,
};
