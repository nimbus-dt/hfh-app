import { CustomExpandableCard } from 'components/Test/Reusable/CustomExpandableCard';
import PropTypes from 'prop-types';
import {
  Button,
  CheckboxField,
  Flex,
  Radio,
  RadioGroupField,
  Text,
  TextField,
} from '@aws-amplify/ui-react';
import { getCheckOrExEmoji } from 'utils/misc';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const editRoute = '../applicant-optional';

const DemographicSection = ({
  applicantOptional,
  expanded,
  onExpandedChange,
  reviewedSections,
  setReviewedSections,
  onReview,
  submitted,
}) => {
  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      basicInfo: false,
    }));
  }, [setReviewedSections]);

  const customCardReference = useRef(null);

  useEffect(() => {
    if (expanded) {
      customCardReference.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [expanded]);

  return (
    <CustomExpandableCard
      title={`${getCheckOrExEmoji(
        reviewedSections.demographic || submitted
      )} Demographic Information`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
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
      <Text fontWeight="bold">Ethnicity (check one or more)</Text>
      <br />
      <CheckboxField
        checked={
          applicantOptional?.props?.demographic?.ethnicity?.hispanicOrLatino
        }
        label="Hispanic or Latino"
        isDisabled
      />
      <br />
      <CheckboxField
        checked={applicantOptional?.props?.demographic?.ethnicity?.mexican}
        label="Mexican"
        marginLeft="1.5rem"
        isDisabled
      />
      <br />
      <CheckboxField
        checked={applicantOptional?.props?.demographic?.ethnicity?.puertoRican}
        label="Puerto Rican"
        marginLeft="1.5rem"
        isDisabled
      />
      <br />
      <CheckboxField
        checked={applicantOptional?.props?.demographic?.ethnicity?.cuban}
        label="Cuban"
        marginLeft="1.5rem"
        isDisabled
      />
      <br />
      <CheckboxField
        checked={
          applicantOptional?.props?.demographic?.ethnicity
            ?.otherHispanicOrLatino
        }
        label="Other Hispanic or Latino"
        marginLeft="1.5rem"
        isDisabled
      />
      <br />
      {applicantOptional?.props?.demographic?.ethnicity
        ?.otherHispanicOrLatino && (
        <>
          <TextField
            value={
              applicantOptional?.props?.demographic?.ethnicity
                ?.otherHispanicOrLatinoValue
            }
            label="Origin"
            descriptiveText="For example: Argentinean, Colombian, Dominican, Nicaraguan, Salvadoran, Spaniard, and so on."
            marginLeft="1.5rem"
            isDisabled
            isReadOnly
          />
          <br />
        </>
      )}
      <CheckboxField
        checked={
          applicantOptional?.props?.demographic?.ethnicity?.notHispanicOrLatino
        }
        label="Not Hispanic or Latino"
        isDisabled
      />
      <br />
      <CheckboxField
        checked={
          applicantOptional?.props?.demographic?.ethnicity
            ?.iDoNotWishToProvideThisInfo
        }
        label="I do not wish to provide this information"
        isDisabled
      />
      <br />
      <Text as="label" htmlFor="sex" fontWeight="bold">
        Sex
      </Text>
      <RadioGroupField
        value={applicantOptional?.props?.demographic?.sex}
        isDisabled
      >
        <Radio value="Female">Female</Radio>
        <Radio value="Male">Male</Radio>
        <Radio value="I do not wish to provide this information">
          I do not wish to provide this information
        </Radio>
      </RadioGroupField>

      <br />
      <Text fontWeight="bold">Race (check one or more)</Text>
      <br />
      <CheckboxField
        checked={
          applicantOptional?.props?.demographic?.race
            ?.americanIndianOrAlaskaNative
        }
        label="American Indian or Alaska Native"
        isDisabled
      />
      <br />
      {applicantOptional?.props?.demographic?.race
        ?.americanIndianOrAlaskaNative && (
        <>
          <TextField
            value={
              applicantOptional?.props?.demographic?.race
                ?.nameOfEnrolledOrPrincipalTribe
            }
            label="Name of enrolled or principal tribe"
            isDisabled
            isReadOnly
          />
          <br />
        </>
      )}
      <CheckboxField
        checked={applicantOptional?.props?.demographic?.race?.asian}
        label="Asian"
        isDisabled
      />
      <br />
      <CheckboxField
        checked={applicantOptional?.props?.demographic?.race?.asianIndian}
        label="Asian Indian"
        marginLeft="1.5rem"
        isDisabled
      />
      <br />
      <CheckboxField
        checked={applicantOptional?.props?.demographic?.race?.chinese}
        label="Chinese"
        marginLeft="1.5rem"
        isDisabled
      />
      <br />
      <CheckboxField
        checked={applicantOptional?.props?.demographic?.race?.filipino}
        label="Filipino"
        marginLeft="1.5rem"
        isDisabled
      />
      <br />
      <CheckboxField
        checked={applicantOptional?.props?.demographic?.race?.japanese}
        label="Japanese"
        marginLeft="1.5rem"
        isDisabled
      />
      <br />
      <CheckboxField
        checked={applicantOptional?.props?.demographic?.race?.korean}
        label="Korean"
        marginLeft="1.5rem"
        isDisabled
      />
      <br />
      <CheckboxField
        checked={applicantOptional?.props?.demographic?.race?.vietnamese}
        label="Vietnamese"
        marginLeft="1.5rem"
        isDisabled
      />
      <br />
      <CheckboxField
        checked={applicantOptional?.props?.demographic?.race?.otherAsian}
        label="Other Asian"
        marginLeft="1.5rem"
        isDisabled
      />
      <br />
      {applicantOptional?.props?.demographic?.race?.otherAsian && (
        <>
          <TextField
            value={applicantOptional?.props?.demographic?.race?.otherAsianValue}
            label="Race"
            descriptiveText="For example: Hmong, Laotian, Thai, Pakistani, Cambodian, and so on."
            marginLeft="1.5rem"
            isDisabled
            isReadOnly
          />
          <br />
        </>
      )}
      <CheckboxField
        checked={
          applicantOptional?.props?.demographic?.race?.blackOrAfricanAmerican
        }
        label="Black or African American"
        isDisabled
      />
      <br />
      <CheckboxField
        checked={
          applicantOptional?.props?.demographic?.race
            ?.nativeHawaiianOrOtherPacificIslander
        }
        label="Native Hawaiian or Other Pacific Islander"
        isDisabled
      />
      <br />
      <CheckboxField
        checked={applicantOptional?.props?.demographic?.race?.nativeHawaiian}
        label="Native Hawaiian"
        marginLeft="1.5rem"
        isDisabled
      />
      <br />
      <CheckboxField
        checked={
          applicantOptional?.props?.demographic?.race?.guamanianOrChamorro
        }
        label="Guamanian or Chamorro"
        marginLeft="1.5rem"
        isDisabled
      />
      <br />
      <CheckboxField
        checked={applicantOptional?.props?.demographic?.race?.samoan}
        label="Samoan"
        marginLeft="1.5rem"
        isDisabled
      />
      <br />
      <CheckboxField
        checked={
          applicantOptional?.props?.demographic?.race?.otherPacificIslander
        }
        label="Other Pacifil Islander"
        marginLeft="1.5rem"
        isDisabled
      />
      <br />
      {applicantOptional?.props?.demographic?.race?.otherPacificIslander && (
        <>
          <TextField
            value={
              applicantOptional?.props?.demographic?.race
                .otherPacificIslanderValue
            }
            label="Race"
            descriptiveText="For example: Fijian, Tongan, and so on."
            marginLeft="1.5rem"
            isDisabled
            isReadOnly
          />
          <br />
        </>
      )}
      <CheckboxField
        checked={applicantOptional?.props?.race?.demographic}
        label="White"
        isDisabled
      />
      <br />
      <CheckboxField
        checked={
          applicantOptional?.props?.demographic?.race
            ?.iDoNotWishToProvideThisInfo
        }
        label="I do not wish to provide this information"
        isDisabled
      />
      <br />
      {!submitted && (
        <Flex width="100%" justifyContent="end">
          <Link to={editRoute}>
            <Button>Edit</Button>
          </Link>
          <Button variation="primary" onClick={onReview}>
            Confirm
          </Button>
        </Flex>
      )}
    </CustomExpandableCard>
  );
};

DemographicSection.propTypes = {
  applicantOptional: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  submitted: PropTypes.bool,
};

export default DemographicSection;
