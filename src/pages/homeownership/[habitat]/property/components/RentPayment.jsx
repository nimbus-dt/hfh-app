import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button, Flex } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { getCheckOrExEmoji } from 'utils/misc';
import CurrencyInput from 'components/CurrencyInput';
import { rentPaymentSchema } from '../HomeownershipPropertyPage.schema';

const RentPayment = ({
  property,
  expanded,
  onExpandedChange,
  onValid,
  edit,
  onClickEdit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(rentPaymentSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: property?.props?.rentPayment,
  });

  const isEnabled = !property?.props?.rentPayment || edit;

  return (
    <CustomExpandableCard
      title={`${getCheckOrExEmoji(
        property?.props?.rentPayment !== undefined
      )} Rent Payment`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <Controller
          control={control}
          name="montlyRent"
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <CurrencyInput
              label="What is your montly rent payment?"
              value={value}
              onChange={onChange}
              errorMessage="Invalid value"
              hasError={errors?.montlyRent !== undefined}
              isRequired
              isDisabled={!isEnabled}
            />
          )}
        />

        <br />

        <Flex width="100%" justifyContent="end">
          {property?.props?.rentPayment ? (
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

RentPayment.propTypes = {
  property: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onValid: PropTypes.func,
  edit: PropTypes.bool,
  onClickEdit: PropTypes.func,
};

export default RentPayment;
