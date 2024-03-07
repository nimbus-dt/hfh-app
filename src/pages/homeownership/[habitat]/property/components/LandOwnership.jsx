import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button, Flex, Radio, RadioGroupField } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { getCheckOrExEmoji } from 'utils/misc';
import CurrencyInput from 'components/CurrencyInput';
import { landOwnershipSchema } from '../HomeownershipPropertyPage.schema';

const LandOwnership = ({
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
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(landOwnershipSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: property?.props?.landOwnership,
  });

  const watchOwnLand = watch('ownLand');

  const isEnabled = !property?.props?.landOwnership || edit;

  return (
    <CustomExpandableCard
      title={`${getCheckOrExEmoji(
        property?.props?.landOwnership !== undefined
      )} Land Ownership`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <Controller
          control={control}
          name="ownLand"
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroupField
              name="ownLand"
              label="Do you own land other than your residence?"
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              value={value}
              isRequired
              hasError={errors?.ownLand !== undefined}
              errorMessage="Invalid value."
              disabled={!isEnabled}
            >
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </RadioGroupField>
          )}
        />
        <br />
        {watchOwnLand === 'Yes' && (
          <>
            <Controller
              control={control}
              name="montlyPayment"
              defaultValue=""
              render={({ field: { value, onChange } }) => (
                <CurrencyInput
                  label="Montly mortgage payment (including taxes, insurance, etc.)"
                  value={value}
                  onChange={onChange}
                  errorMessage="Invalid value"
                  hasError={errors?.montlyPayment !== undefined}
                  isRequired
                  isDisabled={!isEnabled}
                />
              )}
            />

            <br />
          </>
        )}
        <Flex width="100%" justifyContent="end">
          {property?.props?.landOwnership !== undefined ? (
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

LandOwnership.propTypes = {
  property: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onValid: PropTypes.func,
  edit: PropTypes.bool,
  onClickEdit: PropTypes.func,
};

export default LandOwnership;
