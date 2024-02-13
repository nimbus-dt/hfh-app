import { zodResolver } from '@hookform/resolvers/zod';
import { CustomExpandableCard } from 'components/Test/Reusable/CustomExpandableCard';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  CheckboxField,
  Flex,
  Radio,
  RadioGroupField,
  Text,
  TextField,
} from '@aws-amplify/ui-react';
import { demographicSchema } from '../aplicantOptional.schema';

const DemographicSection = ({
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
    resolver: zodResolver(demographicSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: applicantOptional?.props.demographic,
  });

  const otherHispanicOrLatino = watch('ethnicity.otherHispanicOrLatino');

  const americanIndianOrAlaskaNative = watch(
    'race.americanIndianOrAlaskaNative'
  );

  const otherAsian = watch('race.otherAsian');

  const otherPacificIslander = watch('race.otherPacificIslander');

  const isEnabled = !applicantOptional?.props?.demographic || edit;

  return (
    <CustomExpandableCard
      title={`${
        applicantOptional?.props?.demographic !== undefined ? '✔️' : '❌'
      } Demographic Information`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <Text fontWeight="bold">
        PLEASE READ THIS STATEMENT BEFORE COMPLETING THE FIELDS BELOW
      </Text>
      <Text as="p" textAlign="justify">
        <Text as="span" fontWeight="bold">
          The purpose of collecting this information
        </Text>{' '}
        is to help ensure that all applicants are being treated fairly, that the
        housing needs of communities and neighborhoods are being fulfilled, and
        to otherwise evaluate our programs and reports to our funders. For
        residential mortgage lending, Federal law requires that we ask
        applicants for their demographic information (ethnicity, sex and race)
        in order to monitor our compliance with equal credit opportunity, fair
        housing and home mortgage disclousure laws. You are not required to
        provide this information but are encouraged to do so. You may select one
        or more signations for "Ethnicity" and one or more designations for
        "Race".{' '}
        <Text as="span" fontWeight="bold">
          The law provides that we may not discriminate
        </Text>{' '}
        on the basis of this information or on whether you choose to provide it.
        However, if you choose not to provide the information and you have made
        this application in person, federal regulations require us to note your
        ethnicity, sex and race on the basis of visual observation or surname.
        The law also provides that we may not discriminate on the basis of age
        or marital status information you provide in this application. If you do
        not wish to provide some or all of this information, please check below.
      </Text>
      <form onSubmit={handleSubmit(onValid)}>
        <Text fontWeight="bold">Ethnicity (check one or more)</Text>
        <br />
        <CheckboxField
          {...register('ethnicity.hispanicOrLatino')}
          label="Hispanic or Latino"
          isDisabled={!isEnabled}
        />
        <br />
        <CheckboxField
          {...register('ethnicity.mexican')}
          label="Mexican"
          marginLeft="1.5rem"
          isDisabled={!isEnabled}
        />
        <br />
        <CheckboxField
          {...register('ethnicity.puertoRican')}
          label="Puerto Rican"
          marginLeft="1.5rem"
          isDisabled={!isEnabled}
        />
        <br />
        <CheckboxField
          {...register('ethnicity.cuban')}
          label="Cuban"
          marginLeft="1.5rem"
          isDisabled={!isEnabled}
        />
        <br />
        <CheckboxField
          {...register('ethnicity.otherHispanicOrLatino')}
          label="Other Hispanic or Latino"
          marginLeft="1.5rem"
          isDisabled={!isEnabled}
        />
        <br />
        {otherHispanicOrLatino && (
          <>
            <TextField
              {...register('ethnicity.otherHispanicOrLatinoValue')}
              label="Origin"
              descriptiveText="For example: Argentinean, Colombian, Dominican, Nicaraguan, Salvadoran, Spaniard, and so on."
              marginLeft="1.5rem"
              isDisabled={!isEnabled}
            />
            <br />
          </>
        )}
        <CheckboxField
          {...register('ethnicity.notHispanicOrLatino')}
          label="Not Hispanic or Latino"
          isDisabled={!isEnabled}
        />
        <br />
        <CheckboxField
          {...register('ethnicity.iDoNotWishToProvideThisInfo')}
          label="I do not wish to provide this information"
          isDisabled={!isEnabled}
        />
        <br />
        <Text as="label" htmlFor="sex" fontWeight="bold">
          Sex
        </Text>
        <Controller
          control={control}
          name="sex"
          defaultValue={null}
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroupField
              name="sex"
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              value={value}
              hasError={errors?.sex !== undefined}
              isDisabled={!isEnabled}
            >
              <Radio value="Female">Female</Radio>
              <Radio value="Male">Male</Radio>
              <Radio value="I do not wish to provide this information">
                I do not wish to provide this information
              </Radio>
            </RadioGroupField>
          )}
        />
        <br />
        <Text fontWeight="bold">Race (check one or more)</Text>
        <br />
        <CheckboxField
          {...register('race.americanIndianOrAlaskaNative')}
          label="American Indian or Alaska Native"
          isDisabled={!isEnabled}
        />
        <br />
        {americanIndianOrAlaskaNative && (
          <>
            <TextField
              {...register('race.nameOfEnrolledOrPrincipalTribe')}
              label="Name of enrolled or principal tribe"
              isDisabled={!isEnabled}
            />
            <br />
          </>
        )}
        <CheckboxField
          {...register('race.asian')}
          label="Asian"
          isDisabled={!isEnabled}
        />
        <br />
        <CheckboxField
          {...register('race.asianIndian')}
          label="Asian Indian"
          marginLeft="1.5rem"
          isDisabled={!isEnabled}
        />
        <br />
        <CheckboxField
          {...register('race.chinese')}
          label="Chinese"
          marginLeft="1.5rem"
          isDisabled={!isEnabled}
        />
        <br />
        <CheckboxField
          {...register('race.filipino')}
          label="Filipino"
          marginLeft="1.5rem"
          isDisabled={!isEnabled}
        />
        <br />
        <CheckboxField
          {...register('race.japanese')}
          label="Japanese"
          marginLeft="1.5rem"
          isDisabled={!isEnabled}
        />
        <br />
        <CheckboxField
          {...register('race.korean')}
          label="Korean"
          marginLeft="1.5rem"
          isDisabled={!isEnabled}
        />
        <br />
        <CheckboxField
          {...register('race.vietnamese')}
          label="Vietnamese"
          marginLeft="1.5rem"
          isDisabled={!isEnabled}
        />
        <br />
        <CheckboxField
          {...register('race.otherAsian')}
          label="Other Asian"
          marginLeft="1.5rem"
          isDisabled={!isEnabled}
        />
        <br />
        {otherAsian && (
          <>
            <TextField
              {...register('race.otherAsianValue')}
              label="Race"
              descriptiveText="For example: Hmong, Laotian, Thai, Pakistani, Cambodian, and so on."
              marginLeft="1.5rem"
              isDisabled={!isEnabled}
            />
            <br />
          </>
        )}
        <CheckboxField
          {...register('race.blackOrAfricanAmerican')}
          label="Black or African American"
          isDisabled={!isEnabled}
        />
        <br />
        <CheckboxField
          {...register('race.nativeHawaiianOrOtherPacificIslander')}
          label="Native Hawaiian or Other Pacific Islander"
          isDisabled={!isEnabled}
        />
        <br />
        <CheckboxField
          {...register('race.nativeHawaiian')}
          label="Native Hawaiian"
          marginLeft="1.5rem"
          isDisabled={!isEnabled}
        />
        <br />
        <CheckboxField
          {...register('race.guamanianOrChamorro')}
          label="Guamanian or Chamorro"
          marginLeft="1.5rem"
          isDisabled={!isEnabled}
        />
        <br />
        <CheckboxField
          {...register('race.samoan')}
          label="Samoan"
          marginLeft="1.5rem"
          isDisabled={!isEnabled}
        />
        <br />
        <CheckboxField
          {...register('race.otherPacificIslander')}
          label="Other Pacifil Islander"
          marginLeft="1.5rem"
          isDisabled={!isEnabled}
        />
        <br />
        {otherPacificIslander && (
          <>
            <TextField
              {...register('race.otherPacificIslanderValue')}
              label="Race"
              descriptiveText="For example: Fijian, Tongan, and so on."
              marginLeft="1.5rem"
              isDisabled={!isEnabled}
            />
            <br />
          </>
        )}
        <CheckboxField
          {...register('race.white')}
          label="White"
          isDisabled={!isEnabled}
        />
        <br />
        <CheckboxField
          {...register('race.iDoNotWishToProvideThisInfo')}
          label="I do not wish to provide this information"
          isDisabled={!isEnabled}
        />
        <br />
        <Flex width="100%" justifyContent="end">
          {applicantOptional?.props.demographic ? (
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

DemographicSection.propTypes = {
  applicantOptional: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onValid: PropTypes.func,
  edit: PropTypes.bool,
  onClickEdit: PropTypes.func,
};

export default DemographicSection;
