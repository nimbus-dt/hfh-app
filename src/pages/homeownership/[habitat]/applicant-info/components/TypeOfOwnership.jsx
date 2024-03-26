import { RadioGroupField, Radio, Button, Flex } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCheckOrExEmoji } from 'utils/misc';
import CustomExpandableCard from 'components/CustomExpandableCard';
import {
  ownershipTypes,
  typeOfOwnershipSchema,
} from '../HomeownershipApplicantInfoPage.schema';

export default function TypeOfOwnership({
  expanded,
  onExpandedChange,
  applicantInfo,
  onValid,
  edit,
  onClickEdit,
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(typeOfOwnershipSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: applicantInfo?.props?.typeOfOwnership,
  });

  const isEnabled = !applicantInfo?.props?.typeOfOwnership || edit;

  return (
    <CustomExpandableCard
      title={`${getCheckOrExEmoji(
        applicantInfo?.props?.typeOfOwnership !== undefined
      )} Type of Ownership`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <Controller
          control={control}
          name="ownershipType"
          defaultValue={ownershipTypes[0]}
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroupField
              name="ownershipType"
              label="Please select the type of ownership you are applying for."
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              value={value}
              isRequired
              isDisabled={!isEnabled}
              hasError={errors?.typeOfOwnership}
              errorMessage="Invalid type of ownership"
            >
              {ownershipTypes.map((ownershipType) => (
                <Radio key={ownershipType} value={ownershipType}>
                  {ownershipType}
                </Radio>
              ))}
            </RadioGroupField>
          )}
        />
        <br />
        <Flex width="100%" justifyContent="end">
          {applicantInfo?.props?.typeOfOwnership ? (
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

TypeOfOwnership.propTypes = {
  applicantInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onValid: PropTypes.func,
  edit: PropTypes.bool,
  onClickEdit: PropTypes.func,
};
