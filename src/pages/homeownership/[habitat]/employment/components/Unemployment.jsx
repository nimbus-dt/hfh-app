import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button, Flex, Radio, RadioGroupField } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { getCheckOrExEmoji } from 'utils/misc';
import { unemployedSchema } from '../HomeownershipEmploymentPage.schema';

const Unemployment = ({
  employmentInfo,
  expanded,
  onExpandedChange,
  onValid,
  edit,
  onClickEdit,
  coApplicant,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(unemployedSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: {
      currentlyUnemployed: coApplicant
        ? employmentInfo?.props?.coApplicantCurrentlyUnemployed
        : employmentInfo?.props?.currentlyUnemployed,
    },
  });

  const isEnabled =
    (coApplicant
      ? !employmentInfo?.props?.coApplicantCurrentlyUnemployed
      : !employmentInfo?.props?.currentlyUnemployed) || edit;

  return (
    <CustomExpandableCard
      title={`${getCheckOrExEmoji(
        coApplicant
          ? employmentInfo?.props?.coApplicantCurrentlyUnemployed !== undefined
          : employmentInfo?.props?.currentlyUnemployed !== undefined
      )}${coApplicant ? ' Co-applicant' : ''} Unemployment`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <Controller
          control={control}
          name="currentlyUnemployed"
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroupField
              name="currentlyUnemployed"
              label={
                coApplicant
                  ? 'Is the co-applicant currently unemployed?'
                  : 'Are you currently unemployed?'
              }
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              value={value}
              isRequired
              hasError={errors?.unemployed !== undefined}
              errorMessage="Invalid value."
              disabled={!isEnabled}
            >
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </RadioGroupField>
          )}
        />
        <br />
        <Flex width="100%" justifyContent="end">
          {employmentInfo?.props?.[
            coApplicant
              ? 'coApplicantCurrentlyUnemployed'
              : 'currentlyUnemployed'
          ] !== undefined ? (
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

Unemployment.propTypes = {
  employmentInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onValid: PropTypes.func,
  edit: PropTypes.bool,
  onClickEdit: PropTypes.func,
  coApplicant: PropTypes.bool,
};

export default Unemployment;
