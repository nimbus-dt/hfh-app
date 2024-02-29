import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button, Flex } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { getCheckOrExEmoji } from 'utils/misc';
import CurrencyInput from 'components/CurrencyInput';
import { mortagePaymentSchema } from '../HomeownershipPropertyPage.schema';

const MortagePayment = ({
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
    resolver: zodResolver(mortagePaymentSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: property?.props?.mortagePayment,
  });

  const isEnabled = !property?.props?.mortagePayment || edit;

  return (
    <CustomExpandableCard
      title={`${getCheckOrExEmoji(
        property?.props?.mortagePayment !== undefined
      )} Mortage Payment`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <Controller
          control={control}
          name="montlyMortage"
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <CurrencyInput
              label="What is your montly mortgage payment (including taxes, insurance, etc.)?"
              value={value}
              onChange={onChange}
              errorMessage="Invalid value"
              hasError={errors?.montlyMortage !== undefined}
              isRequired
              isDisabled={!isEnabled}
            />
          )}
        />
        <br />
        <Controller
          control={control}
          name="unpaidBalance"
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <CurrencyInput
              label="Unpaid balance"
              value={value}
              onChange={onChange}
              errorMessage="Invalid value"
              hasError={errors?.unpaidBalance !== undefined}
              isRequired
              isDisabled={!isEnabled}
            />
          )}
        />

        <br />

        <Flex width="100%" justifyContent="end">
          {property?.props?.mortagePayment ? (
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

MortagePayment.propTypes = {
  property: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onValid: PropTypes.func,
  edit: PropTypes.bool,
  onClickEdit: PropTypes.func,
};

export default MortagePayment;
