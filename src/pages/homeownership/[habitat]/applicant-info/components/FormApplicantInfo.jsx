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
  coApplicantSchema,
  creditTypes,
  maritalStatusValues,
  ownerShipValues,
  typeOfCreditSchema,
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
  coApplicant,
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
    values: coApplicant
      ? applicantInfo?.props?.coApplicantBasicInfo
      : applicantInfo?.props?.basicInfo,
  });

  const isEnabled =
    (coApplicant
      ? !applicantInfo?.props?.coApplicantBasicInfo
      : !applicantInfo?.props?.basicInfo) || edit;

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
      title={`${getCheckOrExEmoji(
        coApplicant
          ? applicantInfo?.props?.coApplicantBasicInfo !== undefined
          : applicantInfo?.props?.basicInfo !== undefined
      )}${coApplicant ? ' Co-applicant' : ''} Basic Information`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <TextField
          label={
            coApplicant
              ? "What is the co-applicant's full name?"
              : 'What is your full name?'
          }
          placeholder="John Doe"
          {...register('fullName')}
          errorMessage="Full name must contain at least 1 character"
          hasError={errors?.fullName !== undefined}
          isRequired
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label={
            coApplicant
              ? 'If the co-applicant have an alternative or a former name, please write it here.'
              : 'If you have an alternative or a former name, please write it here.'
          }
          placeholder="James Doe"
          {...register('altOrFormerName')}
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label={
            coApplicant
              ? "What is the co-applicant's social security number?"
              : 'What is your social security number?'
          }
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
          label={
            coApplicant
              ? "What is the co-applicant's home phone?"
              : 'What is your home phone?'
          }
          placeholder="(800) 555‑0100"
          {...register('homePhone')}
          onChange={handleOnChangePhone}
          errorMessage={errors?.homePhone?.message}
          hasError={errors?.homePhone !== undefined}
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label={
            coApplicant
              ? "What is the co-applicant's cell phone?"
              : 'What is your cell phone?'
          }
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
          label={
            coApplicant
              ? "What is the co-applicant's work phone?"
              : 'What is your work phone?'
          }
          placeholder="(800) 555‑0100"
          {...register('workPhone')}
          onChange={handleOnChangePhone}
          errorMessage={errors?.workPhone?.message}
          hasError={errors?.workPhone !== undefined}
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label={
            coApplicant
              ? "What is the co-applicant's date of birth?"
              : 'What is your date of birth?'
          }
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
              label={
                coApplicant
                  ? 'Which of these best represents the co-applicant current marital status?'
                  : 'Which of these best represents your current marital status?'
              }
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
          {applicantInfo?.props[
            coApplicant ? 'coApplicantBasicInfo' : 'basicInfo'
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

BasicInformation.propTypes = {
  applicantInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onValid: PropTypes.func,
  edit: PropTypes.bool,
  onClickEdit: PropTypes.func,
  coApplicant: PropTypes.bool,
};

export function Address({
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

export function PrevAddress({
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
        ? applicantInfo?.props?.coApplicantPreviousAddress !== undefined
        : applicantInfo?.props?.previousAddress !== undefined
    ) {
      return coApplicant
        ? {
            ...applicantInfo.props.coApplicantPreviousAddress,
            city: {
              selectedCity: {
                id: applicantInfo.props.coApplicantPreviousAddress.city,
                label: applicantInfo.props.coApplicantPreviousAddress.city,
              },
              query: applicantInfo.props.coApplicantPreviousAddress.city,
            },
          }
        : {
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
  }, [applicantInfo, coApplicant]);

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

  const isEnabled =
    (coApplicant
      ? !applicantInfo?.props?.coApplicantPreviousAddress
      : !applicantInfo?.props?.previousAddress) || edit;

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
          ? applicantInfo?.props?.coApplicantPreviousAddress !== undefined
          : applicantInfo?.props?.previousAddress !== undefined
      )}${coApplicant ? ' Co-applicant' : ''} Previous Address`}
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
              ? 'How long did the co-applicant live at this address, in months?'
              : 'How long did you live at this address, in months?'
          }
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
              label={
                coApplicant
                  ? 'Which of these best represents the ownership status of the previous address the co-applicant lived in?'
                  : 'Which of these best represents the ownership status of the previous address you lived in?'
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
  coApplicant: PropTypes.bool,
};

export function UnmarriedAddendum({
  expanded,
  onExpandedChange,
  applicantInfo,
  onValid,
  edit,
  onClickEdit,
  coApplicant,
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
    values: coApplicant
      ? applicantInfo?.props?.coApplicantUnmarriedAddendum
      : applicantInfo?.props?.unmarriedAddendum,
  });

  const isEnabled =
    (coApplicant
      ? !applicantInfo?.props?.coApplicantUnmarriedAddendum
      : !applicantInfo?.props?.unmarriedAddendum) || edit;

  const notSpouseButSimilarPropertyRightsWatch = watch(
    'notSpouseButSimilarPropertyRights'
  );

  const relationshipTypeWatch = watch('relationshipType');

  return (
    <CustomExpandableCard
      title={`${getCheckOrExEmoji(
        coApplicant
          ? applicantInfo?.props?.coApplicantUnmarriedAddendum !== undefined
          : applicantInfo?.props?.unmarriedAddendum !== undefined
      )}${coApplicant ? ' Co-applicant' : ''} Unmarried Addendum`}
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
              label={
                coApplicant
                  ? "Is there a person who is not the co-applicant's legal spouse but who currently has real property rights similar to those of a legal spouse?"
                  : 'Is there a person who is not your legal spouse but who currently has real property rights similar to those of a legal spouse?'
              }
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
  coApplicant: PropTypes.bool,
};

export function TypeOfCredit({
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
    resolver: zodResolver(typeOfCreditSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: applicantInfo?.props?.typeOfCredit,
  });

  const isEnabled = !applicantInfo?.props?.typeOfCredit || edit;

  const creditTypeWatch = watch('creditType');

  return (
    <CustomExpandableCard
      title={`${getCheckOrExEmoji(
        applicantInfo?.props?.typeOfCredit !== undefined
      )} Type of Credit`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <Controller
          control={control}
          name="creditType"
          defaultValue={creditTypes[0]}
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroupField
              name="creditType"
              label="Credit type:"
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              value={value}
              isRequired
              isDisabled={!isEnabled}
            >
              {creditTypes.map((creditType) => (
                <Radio key={creditType} value={creditType}>
                  {creditType}
                </Radio>
              ))}
            </RadioGroupField>
          )}
        />
        <br />
        {creditTypeWatch === creditTypes[1] && (
          <>
            <TextField
              label="Total number of borrowers:"
              type="number"
              {...register('totalNumberOfBorrowers')}
              errorMessage="Invalid number of borrowers"
              hasError={errors?.totalNumberOfBorrowers !== undefined}
              isRequired
              isDisabled={!isEnabled}
            />
            <br />
          </>
        )}
        {creditTypeWatch === creditTypes[2] && (
          <>
            <TextField
              label="Your initials:"
              {...register('youtInitials')}
              hasError={errors?.youtInitials !== undefined}
              isRequired
              isDisabled={!isEnabled}
            />
            <br />
          </>
        )}
        <Flex width="100%" justifyContent="end">
          {applicantInfo?.props?.typeOfCredit ? (
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

TypeOfCredit.propTypes = {
  applicantInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onValid: PropTypes.func,
  edit: PropTypes.bool,
  onClickEdit: PropTypes.func,
};

export function CoApplicant({
  expanded,
  onExpandedChange,
  applicantInfo,
  onValid,
  edit,
  onClickEdit,
}) {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(coApplicantSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: applicantInfo?.props,
  });

  const isEnabled = !applicantInfo?.props?.hasCoApplicant || edit;

  return (
    <CustomExpandableCard
      title={`${getCheckOrExEmoji(
        applicantInfo?.props?.hasCoApplicant !== undefined
      )} Co-applicant`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <Controller
          control={control}
          name="hasCoApplicant"
          defaultValue="No"
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroupField
              name="hasCoApplicant"
              label="You have a co-applicant?"
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
        <Flex width="100%" justifyContent="end">
          {applicantInfo?.props?.hasCoApplicant ? (
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

CoApplicant.propTypes = {
  applicantInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onValid: PropTypes.func,
  edit: PropTypes.bool,
  onClickEdit: PropTypes.func,
};
