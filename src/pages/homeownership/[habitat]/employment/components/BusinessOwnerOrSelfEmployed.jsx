import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button, Flex, Radio, RadioGroupField } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { getCheckOrExEmoji } from 'utils/misc';
import CurrencyInput from 'components/CurrencyInput';
import {
  businessOwnerOrSelfEmployedSchema,
  ownershipShareOptions,
} from '../HomeownershipEmploymentPage.schema';

const BusinessOwnerOrSelfEmployed = ({
  employmentInfo,
  expanded,
  onExpandedChange,
  onValid,
  edit,
  onClickEdit,
  coApplicant,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(businessOwnerOrSelfEmployedSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: coApplicant
      ? employmentInfo?.props?.coApplicantBusinessOwnerOrSelfEmployed
      : employmentInfo?.props?.businessOwnerOrSelfEmployed,
  });

  const isEnabled =
    (coApplicant
      ? !employmentInfo?.props?.coApplicantBusinessOwnerOrSelfEmployed
      : !employmentInfo?.props?.businessOwnerOrSelfEmployed) || edit;

  const watchCurrentlyBusinessOwnerOrSelfEmployed = watch(
    'currentlyBusinessOwnerOrSelfEmployed'
  );

  return (
    <CustomExpandableCard
      title={`${getCheckOrExEmoji(
        coApplicant
          ? employmentInfo?.props?.coApplicantBusinessOwnerOrSelfEmployed !==
              undefined
          : employmentInfo?.props?.businessOwnerOrSelfEmployed !== undefined
      )}${coApplicant ? ' Co-applicant' : ''} Business Owner or Self-Employed`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <Controller
          control={control}
          name="currentlyBusinessOwnerOrSelfEmployed"
          defaultValue="No"
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroupField
              name="currentlyBusinessOwnerOrSelfEmployed"
              label={
                coApplicant
                  ? 'Is the co-applicant currently a business owner or are self-employed?'
                  : 'Are you currently a business owner or are self-employed?'
              }
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              value={value}
              isRequired
              errorMessage="Invalid value"
              hasError={
                errors?.currentlyBusinessOwnerOrSelfEmployed !== undefined
              }
              isDisabled={!isEnabled}
            >
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </RadioGroupField>
          )}
        />
        <br />
        {watchCurrentlyBusinessOwnerOrSelfEmployed === 'Yes' && (
          <>
            <Controller
              control={control}
              name="ownershipShare"
              defaultValue={ownershipShareOptions[0]}
              render={({ field: { onChange, onBlur, value } }) => (
                <RadioGroupField
                  name="ownershipShare"
                  label={
                    coApplicant
                      ? "What is the co-applicant's ownership share?"
                      : 'What is your ownership share?'
                  }
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                  value={value}
                  isRequired
                  errorMessage="Invalid value"
                  hasError={errors?.ownershipShare !== undefined}
                  isDisabled={!isEnabled}
                >
                  {ownershipShareOptions.map((ownershipOption) => (
                    <Radio key={ownershipOption} value={ownershipOption}>
                      {ownershipOption}
                    </Radio>
                  ))}
                </RadioGroupField>
              )}
            />
            <br />
            <Controller
              control={control}
              name="montlyIncome"
              defaultValue=""
              render={({ field: { value, onChange } }) => (
                <CurrencyInput
                  label="Montly income (or loss)"
                  value={value}
                  onChange={onChange}
                  errorMessage="Invalid value"
                  hasError={errors?.montlyIncome !== undefined}
                  isRequired
                  isDisabled={!isEnabled}
                />
              )}
            />
            <br />
          </>
        )}

        <Flex width="100%" justifyContent="end">
          {employmentInfo?.props?.[
            coApplicant
              ? 'coApplicantBusinessOwnerOrSelfEmployed'
              : 'businessOwnerOrSelfEmployed'
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

BusinessOwnerOrSelfEmployed.propTypes = {
  employmentInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onValid: PropTypes.func,
  edit: PropTypes.bool,
  onClickEdit: PropTypes.func,
  coApplicant: PropTypes.bool,
};

export default BusinessOwnerOrSelfEmployed;
