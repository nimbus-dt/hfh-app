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
  basicInfoSchema,
  maritalStatusValues,
  ownerShipValues,
  unmarriedAddendumSchema,
  unmarriedRelationshipTypesValues,
} from '../HomeownershipApplicantInfoPage.schema';
import states from '../../../../../assets/jsons/states.json';

export function BasicInformation({
  applicantInfo,
  expanded,
  onExpandedChange,
  onValid,
  edit,
  onClickEdit,
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(basicInfoSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: applicantInfo?.props?.basicInfo,
  });

  const isEnabled = !applicantInfo?.props?.basicInfo || edit;

  const handleOnChangeSecurityNumber = (event) => {
    const inputValue = event.target.value.replace(/[^\d\b]/g, '');
    const formattedValue = inputValue
      .substring(0, 9)
      .replace(/^(\d{3})(\d{1})/, '$1-$2')
      .replace(/^(\d{3})-(\d{2})(\d{1})/, '$1-$2-$3');
    event.target.value = formattedValue;
  };

  const handleOnChangePhone = (event) => {
    const inputValue = event.target.value.replace(/[^\d\b]/g, '');
    const formattedNumber = inputValue
      .substring(0, 10)
      .replace(/^(\d{1})/, '($1')
      .replace(/^(\(\d{3})(\d{1})/, '$1)$2')
      .replace(/^(\(\d{3}\))(\d{1})/, '$1 $2')
      .replace(/^(\(\d{3}\))\s(\d{3})(\d{1})/, '$1 $2-$3');
    event.target.value = formattedNumber;
  };

  return (
    <CustomExpandableCard
      title={`${
        applicantInfo?.props?.basicInfo !== undefined ? '✔️' : '❌'
      } Basic Information`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <TextField
          label="What is your full name?"
          placeholder="John Doe"
          {...register('fullName')}
          errorMessage="Full name must contain at least 1 character"
          hasError={errors?.fullName !== undefined}
          isRequired
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label="If you have an alternative or a former name, please write it here."
          placeholder="James Doe"
          {...register('altOrFormerName')}
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label="What is your social security number?"
          placeholder="AAA-GG-SSSS"
          {...register('socialSecurityNumber')}
          onChange={handleOnChangeSecurityNumber}
          errorMessage={errors?.socialSecurityNumber?.message}
          hasError={errors?.socialSecurityNumber !== undefined}
          isRequired
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label="What is your home phone?"
          placeholder="(800) 555‑0100"
          {...register('homePhone')}
          onChange={handleOnChangePhone}
          errorMessage={errors?.homePhone?.message}
          hasError={errors?.homePhone !== undefined}
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label="What is your cell phone?"
          placeholder="(800) 555‑0100"
          {...register('cellPhone')}
          onChange={handleOnChangePhone}
          errorMessage={errors?.cellPhone?.message}
          hasError={errors?.cellPhone !== undefined}
          isRequired
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label="What is your work phone?"
          placeholder="(800) 555‑0100"
          {...register('workPhone')}
          onChange={handleOnChangePhone}
          errorMessage={errors?.workPhone?.message}
          hasError={errors?.workPhone !== undefined}
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label="What is your date of birth?"
          type="date"
          isRequired
          {...register('birthDate')}
          errorMessage={errors?.birthDate?.message}
          hasError={errors?.birthDate !== undefined}
          isDisabled={!isEnabled}
        />
        <br />
        <Controller
          control={control}
          name="maritalStatus"
          defaultValue={maritalStatusValues[0]}
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroupField
              name="maritalStatus"
              label="Which of these best represents your current marital status?"
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              value={value}
              isRequired
              hasError={errors?.maritalStatus !== undefined}
              isDisabled={!isEnabled}
            >
              {maritalStatusValues.map((maritalStatus) => (
                <Radio key={maritalStatus} value={maritalStatus}>
                  {maritalStatus}
                </Radio>
              ))}
            </RadioGroupField>
          )}
        />
        <br />
        <Flex width="100%" justifyContent="end">
          {applicantInfo?.props?.basicInfo ? (
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

BasicInformation.propTypes = {
  applicantInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onValid: PropTypes.func,
  edit: PropTypes.bool,
  onClickEdit: PropTypes.func,
};

export function Address({
  expanded,
  onExpandedChange,
  applicantInfo,
  onValid,
  edit,
  onClickEdit,
}) {
  const [cities, setCities] = useState([]);

  const formattedValues = useMemo(() => {
    if (applicantInfo?.props?.currentAddress !== undefined) {
      return {
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
  }, [applicantInfo]);

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

  const isEnabled = !applicantInfo?.props?.currentAddress || edit;

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
      title={`${
        applicantInfo?.props?.currentAddress !== undefined ? '✔️' : '❌'
      } Present Address`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <TextField
          label="What is your present street address?"
          placeholder="70 Morningside Dr"
          {...register('street')}
          errorMessage="Street address must contain at least 1 character"
          hasError={errors?.address !== undefined}
          isRequired
          isDisabled={!isEnabled}
        />
        <br />
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
          label="How long have you lived at this address, in months?"
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
              label="Which of these best represents the ownership status of the address you currently live in?"
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
          {applicantInfo?.props?.currentAddress ? (
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
};

export function PrevAddress({
  expanded,
  onExpandedChange,
  applicantInfo,
  onValid,
  edit,
  onClickEdit,
}) {
  const [cities, setCities] = useState([]);

  const formattedValues = useMemo(() => {
    if (applicantInfo?.props?.previousAddress !== undefined) {
      return {
        ...applicantInfo.props.previousAddress,
        city: {
          selectedCity: {
            id: applicantInfo.props.previousAddress.city,
            label: applicantInfo.props.previousAddress.city,
          },
          query: applicantInfo.props.previousAddress.city,
        },
      };
    }
  }, [applicantInfo]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    resetField,
  } = useForm({
    resolver: zodResolver(addressSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: formattedValues,
  });

  const isEnabled = !applicantInfo?.props?.previousAddress || edit;

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
      title={`${
        applicantInfo?.props?.previousAddress !== undefined ? '✔️' : '❌'
      } Previous Address`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <TextField
          label="What is your previous street address?"
          placeholder="70 Morningside Dr"
          {...register('street')}
          errorMessage="Street address must contain at least 1 character"
          hasError={errors?.address !== undefined}
          isRequired
          isDisabled={!isEnabled}
        />
        <br />
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
          label="How long did you live at this address, in months?"
          placeholder="48"
          type="number"
          {...register('monthsLivedHere')}
          hasError={errors?.monthsLivedHere !== undefined}
          isRequired
          isDisabled={!isEnabled}
          min={0}
        />
        <br />
        <Controller
          control={control}
          name="ownershipStatus"
          defaultValue={ownerShipValues[0]}
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroupField
              name="ownershipStatus"
              label="Which of these best represents the ownership status of the previous address you lived in?"
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
          {applicantInfo?.props?.previousAddress ? (
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

PrevAddress.propTypes = {
  applicantInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onValid: PropTypes.func,
  edit: PropTypes.bool,
  onClickEdit: PropTypes.func,
};

export function UnmarriedAddendum({
  expanded,
  onExpandedChange,
  applicantInfo,
  onValid,
  edit,
  onClickEdit,
}) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(unmarriedAddendumSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: applicantInfo?.props?.unmarriedAddendum,
  });

  const isEnabled = !applicantInfo?.props?.unmarriedAddendum || edit;

  const notSpouseButSimilarPropertyRightsWatch = watch(
    'notSpouseButSimilarPropertyRights'
  );

  const relationshipTypeWatch = watch('relationshipType');

  return (
    <CustomExpandableCard
      title={`${getCheckOrExEmoji(
        applicantInfo?.props?.unmarriedAddendum !== undefined
      )} Unmarried Addendum`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <Controller
          control={control}
          name="notSpouseButSimilarPropertyRights"
          defaultValue="No"
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroupField
              name="notSpouseButSimilarPropertyRights"
              label="Is there a person who is not your legal spouse but who currently has real property rights similar to those of a legal spouse?"
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              value={value}
              isRequired
              isDisabled={!isEnabled}
            >
              <Radio value="No">No</Radio>
              <Radio value="Yes">Yes</Radio>
            </RadioGroupField>
          )}
        />
        <br />
        {notSpouseButSimilarPropertyRightsWatch === 'Yes' && (
          <>
            <Controller
              control={control}
              name="relationshipType"
              defaultValue={unmarriedRelationshipTypesValues[0]}
              render={({ field: { onChange, onBlur, value } }) => (
                <RadioGroupField
                  name="relationshipType"
                  label="Indicate the type of relationship"
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                  value={value}
                  isDisabled={!isEnabled}
                  isRequired
                >
                  {unmarriedRelationshipTypesValues.map(
                    (unmarriedRelationshipType) => (
                      <Radio
                        key={unmarriedRelationshipType}
                        value={unmarriedRelationshipType}
                      >
                        {unmarriedRelationshipType}
                      </Radio>
                    )
                  )}
                </RadioGroupField>
              )}
            />
            <br />
            {relationshipTypeWatch === 'Other' && (
              <>
                <TextField
                  label="Explain the relationship"
                  {...register('otherRelationshipType')}
                  hasError={errors?.otherRelationshipType !== undefined}
                  isRequired
                  isDisabled={!isEnabled}
                />
                <br />
              </>
            )}
            <TextField
              label="State in which the relationship was formed"
              {...register('state')}
              hasError={errors?.state !== undefined}
              isRequired
              isDisabled={!isEnabled}
            />
            <br />
          </>
        )}
        <Flex width="100%" justifyContent="end">
          {applicantInfo?.props?.unmarriedAddendum ? (
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

UnmarriedAddendum.propTypes = {
  applicantInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onValid: PropTypes.func,
  edit: PropTypes.bool,
  onClickEdit: PropTypes.func,
};
