import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button, Flex, Radio, RadioGroupField } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { getCheckOrExEmoji } from 'utils/misc';
import { ownRealStateSchema } from '../HomeownershipPropertyPage.schema';

const RealStateOwnership = ({
  property,
  expanded,
  onExpandedChange,
  onValid,
  edit,
  onClickEdit,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ownRealStateSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: property?.props,
  });

  const isEnabled = !property?.props?.ownRealState || edit;

  return (
    <CustomExpandableCard
      title={`${getCheckOrExEmoji(
        property?.props?.ownRealState !== undefined
      )} Real State Ownership`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <Controller
          control={control}
          name="ownRealState"
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroupField
              name="ownRealState"
              label="Do you own any real state?"
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              value={value}
              isRequired
              hasError={errors?.ownRealState !== undefined}
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
          {property?.props?.ownRealState !== undefined ? (
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

RealStateOwnership.propTypes = {
  property: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onValid: PropTypes.func,
  edit: PropTypes.bool,
  onClickEdit: PropTypes.func,
};

export default RealStateOwnership;
