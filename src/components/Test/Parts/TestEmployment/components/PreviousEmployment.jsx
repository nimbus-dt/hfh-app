import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CustomExpandableCard } from 'components/Test/Reusable/CustomExpandableCard';
import { Button, Flex, TextField } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { formatPhoneNumber } from 'utils/formatters';
import { previousEmploymentSchema } from '../TestEmployment.schema';

const PreviousEmployment = ({
  employmentInfo,
  expanded,
  onExpandedChange,
  onValid,
  edit,
  onClickEdit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(previousEmploymentSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: employmentInfo?.props?.previousEmployment,
  });

  const isEnabled = !employmentInfo?.props?.previousEmployment || edit;

  const handleOnChangePhone = (event) => {
    const formattedNumber = formatPhoneNumber(event.target.value);
    event.target.value = formattedNumber;
  };

  return (
    <CustomExpandableCard
      title={`${
        employmentInfo?.props?.previousEmployment !== undefined ? '✔️' : '❌'
      } Previous Employment Information`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <TextField
          label="What is the name of your previous employer?"
          {...register('employerName')}
          errorMessage="Name must contain at least 1 character"
          hasError={errors?.employerName !== undefined}
          isRequired
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label="What is the address of your previous employer?"
          {...register('employerAddress')}
          errorMessage="Address must contain at least 1 character"
          hasError={errors?.employerAddress !== undefined}
          isRequired
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label="What was your approximate start date with this employer?"
          type="date"
          isRequired
          {...register('startDate')}
          errorMessage={errors?.startDate?.message}
          hasError={errors?.startDate !== undefined}
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label="What was your approximate end date with this employer?"
          type="date"
          isRequired
          {...register('endDate')}
          errorMessage={errors?.endDate?.message}
          hasError={errors?.endDate !== undefined}
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label="Type of Business?"
          {...register('businessType')}
          errorMessage={errors?.businessType?.message}
          hasError={errors?.businessType !== undefined}
          isDisabled={!isEnabled}
        />
        <br />
        <TextField
          label="Business phone?"
          placeholder="(800) 555‑0100"
          {...register('businessPhone')}
          onChange={handleOnChangePhone}
          errorMessage={errors?.businessPhone?.message}
          hasError={errors?.businessPhone !== undefined}
          isDisabled={!isEnabled}
        />
        <br />

        <Flex width="100%" justifyContent="end">
          {employmentInfo?.props?.previousEmployment ? (
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

PreviousEmployment.propTypes = {
  employmentInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onValid: PropTypes.func,
  edit: PropTypes.bool,
  onClickEdit: PropTypes.func,
};

export default PreviousEmployment;
