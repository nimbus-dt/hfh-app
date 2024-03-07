import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button, Flex } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { getCheckOrExEmoji } from 'utils/misc';
import CurrencyInput from 'components/CurrencyInput';
import { mortgagePaymentSchema } from '../HomeownershipPropertyPage.schema';

const MortgagePayment = ({
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
    resolver: zodResolver(mortgagePaymentSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: property?.props?.mortgagePayment,
  });

  const isEnabled = !property?.props?.mortgagePayment || edit;

  return (
    <CustomExpandableCard
      title={`${getCheckOrExEmoji(
        property?.props?.mortgagePayment !== undefined
      )} Mortgage Payment`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <Controller
          control={control}
          name="montlyMortgage"
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <CurrencyInput
              label="What is your montly mortgage payment (including taxes, insurance, etc.)?"
              value={value}
              onChange={onChange}
              errorMessage="Invalid value"
              hasError={errors?.montlyMortgage !== undefined}
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
          {property?.props?.mortgagePayment ? (
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

MortgagePayment.propTypes = {
  property: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onValid: PropTypes.func,
  edit: PropTypes.bool,
  onClickEdit: PropTypes.func,
};

export default MortgagePayment;
