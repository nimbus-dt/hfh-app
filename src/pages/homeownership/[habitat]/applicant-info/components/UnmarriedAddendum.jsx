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
  unmarriedAddendumSchema,
  unmarriedRelationshipTypesValues,
} from '../HomeownershipApplicantInfoPage.schema';

export default function UnmarriedAddendum({
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
    unregister,
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

  useEffect(() => {
    if (notSpouseButSimilarPropertyRightsWatch !== 'Yes') {
      unregister('relationshipType');
      unregister('otherRelationshipType');
      unregister('state');
    }
  }, [notSpouseButSimilarPropertyRightsWatch]);

  useEffect(() => {
    if (relationshipTypeWatch !== 'Other') {
      unregister('otherRelationshipType');
    }
  }, [relationshipTypeWatch]);

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
