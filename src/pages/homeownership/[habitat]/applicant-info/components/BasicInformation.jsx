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
import { useEffect } from 'react';
import { RELATIONSHIP_OPTIONS } from 'utils/constants';
import {
  basicInfoSchema,
  coApplicantBasicSchema,
  maritalStatusValues,
} from '../HomeownershipApplicantInfoPage.schema';

export default function BasicInformation({
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
    unregister,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(
      coApplicant ? coApplicantBasicSchema : basicInfoSchema
    ),
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

  const watchRelationship = watch('relationship');

  useEffect(() => {
    if (watchRelationship !== 'Other') {
      unregister('otherRelationship');
    }
  }, [watchRelationship]);

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
        {coApplicant && (
          <>
            <SelectField
              {...register('sex')}
              label="What is the co-applicant's sex?"
              hasError={errors.sex !== undefined}
              errorMessage={errors.sex?.message}
              isRequired
              isDisabled={!isEnabled}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </SelectField>
            <br />
            <SelectField
              {...register('relationship')}
              label="What is your relationship with the co-applicant?"
              hasError={errors.relationship !== undefined}
              errorMessage={errors.relationship?.message}
              isRequired
              isDisabled={!isEnabled}
            >
              {RELATIONSHIP_OPTIONS.map((relationshipOption) => (
                <option key={relationshipOption} value={relationshipOption}>
                  {relationshipOption}
                </option>
              ))}
              <br />
            </SelectField>
            <br />
            {watchRelationship === 'Other' && (
              <TextField
                {...register('otherRelationship')}
                label="Please describe this relationship"
                hasError={errors.otherRelationship !== undefined}
                errorMessage={errors.otherRelationship?.message}
                isRequired
                isDisabled={!isEnabled}
              />
            )}
            <br />
          </>
        )}
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
