import {
  RadioGroupField,
  TextField,
  Radio,
  Button,
  Flex,
} from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCheckOrExEmoji } from 'utils/misc';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { useEffect } from 'react';
import {
  creditTypes,
  typeOfCreditSchema,
} from '../HomeownershipApplicantInfoPage.schema';

export default function TypeOfCredit({
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
    unregister,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(typeOfCreditSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: applicantInfo?.props?.typeOfCredit,
  });

  const isEnabled = !applicantInfo?.props?.typeOfCredit || edit;

  const creditTypeWatch = watch('creditType');

  useEffect(() => {
    if (creditTypeWatch !== creditTypes[1]) {
      unregister('totalNumberOfBorrowers');
    }
    if (creditTypeWatch !== creditTypes[2]) {
      unregister('yourInitials');
    }
  }, [creditTypeWatch, unregister]);

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
              label="Please select the type of credit you are applying for."
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
              {...register('totalNumberOfBorrowers')}
              label="Total number of borrowers:"
              type="number"
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
              {...register('yourInitials')}
              label="Your initials:"
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
