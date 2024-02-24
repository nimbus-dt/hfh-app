import { zodResolver } from '@hookform/resolvers/zod';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Flex,
  Radio,
  RadioGroupField,
  TextField,
} from '@aws-amplify/ui-react';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { militaryServiceSchema } from '../HomeownershipApplicantOptionalPage.schema';

const AnyoneElseMilitaryServiceSection = ({
  applicantOptional,
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
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(militaryServiceSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: applicantOptional?.props.anyoneElseMilitaryService,
  });

  const serveOrServedWatch = watch('serveOrServedInUSAF');

  const currentlyServingWatch = watch('currentlyServing');

  const isEnabled =
    !applicantOptional?.props?.anyoneElseMilitaryService || edit;

  return (
    <CustomExpandableCard
      title={`${
        applicantOptional?.props?.anyoneElseMilitaryService !== undefined
          ? '✔️'
          : '❌'
      } Household Member Military Service`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <Controller
          control={control}
          name="serveOrServedInUSAF"
          defaultValue={null}
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroupField
              name="serveOrServedInUSAF"
              label="Is anyone else in your household serving, or did they save, in the United States Armed Forces?"
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              value={value}
              hasError={errors?.serveOrServedInUSAF !== undefined}
              isDisabled={!isEnabled}
            >
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </RadioGroupField>
          )}
        />
        <br />
        {serveOrServedWatch === 'Yes' && (
          <>
            <Controller
              control={control}
              name="currentlyServing"
              defaultValue={null}
              render={({ field: { onChange, onBlur, value } }) => (
                <RadioGroupField
                  name="currentlyServing"
                  label="Currently serving on active duty?"
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                  value={value}
                  hasError={errors?.currentlyServing !== undefined}
                  isDisabled={!isEnabled}
                >
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </RadioGroupField>
              )}
            />
            <br />
            {currentlyServingWatch === 'Yes' && (
              <>
                <TextField
                  {...register('projectedExpirationDateOfServiceTour')}
                  type="date"
                  label="Projected expiration date of service/tour"
                  isDisabled={!isEnabled}
                />
                <br />
              </>
            )}
            <Controller
              control={control}
              name="currentlyRetiredDischargedOrSeparated"
              defaultValue={null}
              render={({ field: { onChange, onBlur, value } }) => (
                <RadioGroupField
                  name="currentlyRetiredDischargedOrSeparated"
                  label="Currently retired, discharged, or separted from service?"
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                  value={value}
                  hasError={
                    errors?.currentlyRetiredDischargedOrSeparated !== undefined
                  }
                  isDisabled={!isEnabled}
                >
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </RadioGroupField>
              )}
            />
            <br />
            <Controller
              control={control}
              name="onlyPeriodWasNonActive"
              defaultValue={null}
              render={({ field: { onChange, onBlur, value } }) => (
                <RadioGroupField
                  name="onlyPeriodWasNonActive"
                  label="Only period of service was a non-activated member of the Reserve of National Guard?"
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                  value={value}
                  hasError={errors?.onlyPeriodWasNonActive !== undefined}
                  isDisabled={!isEnabled}
                >
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </RadioGroupField>
              )}
            />
            <br />
          </>
        )}
        <Flex width="100%" justifyContent="end">
          {applicantOptional?.props.anyoneElseMilitaryService ? (
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

AnyoneElseMilitaryServiceSection.propTypes = {
  applicantOptional: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onValid: PropTypes.func,
  edit: PropTypes.bool,
  onClickEdit: PropTypes.func,
};

export default AnyoneElseMilitaryServiceSection;
