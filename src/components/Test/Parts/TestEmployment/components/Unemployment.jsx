import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { CustomExpandableCard } from 'components/Test/Reusable/CustomExpandableCard';
import { Button, Flex, Radio, RadioGroupField } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { unemployedSchema } from '../TestEmployment.schema';

const Unemployment = ({
  employmentInfo,
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
    resolver: zodResolver(unemployedSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: employmentInfo?.props,
  });

  const isEnabled = !employmentInfo?.props?.currentlyUnemployed || edit;

  useEffect(() => {
    console.log('errores', errors);
    console.log('employmentInfo', employmentInfo);
  }, [errors, employmentInfo]);

  return (
    <CustomExpandableCard
      title={`${
        employmentInfo?.props?.currentlyUnemployed !== undefined ? '✔️' : '❌'
      } Unemployment`}
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
              label="Are you currently unemployed?"
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
          {employmentInfo?.props?.currentlyUnemployed !== undefined ? (
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
};

export default Unemployment;
