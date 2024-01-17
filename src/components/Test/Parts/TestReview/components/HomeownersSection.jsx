import {
  Flex,
  Button,
  TextField,
  SelectField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ThemeProvider,
} from '@aws-amplify/ui-react';
import { Link, useOutletContext } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import { Member } from 'models';
import Modal from 'components/Modal';
import { MdMoreHoriz } from 'react-icons/md';
import { CustomExpandableCard } from 'components/Test/Reusable/CustomExpandableCard';
import PropTypes from 'prop-types';
import { getCheckOrExEmoji } from 'utils/misc';

const relationshipOptions = [
  'Parent',
  'Child',
  'Sibling',
  'Spouse',
  'Grandparent',
  'Grandchild',
  'Aunt/Uncle',
  'Niece/Nephew',
  'Cousin',
  'Other',
];

function HomeownersSection({
  expanded,
  setExpanded,
  reviewedSections,
  setReviewedSections,
  onReview,
}) {
  const [members, setMembers] = useState([]);
  const [memberModal, setMemberModal] = useState(false);
  const customCardReference = useRef(null);

  const { application } = useOutletContext();
  const { unregister, register, reset, watch } = useForm();

  const watchRelationship = watch('relationship');

  const handleOnClickCloseMemberModal = () => {
    reset({
      fullName: undefined,
      birthDay: undefined,
      sex: undefined,
      relationship: undefined,
      otherRelationship: undefined,
    });
    setMemberModal(false);
  };

  useEffect(() => {
    const getMembers = async (applicationID) => {
      try {
        const existingMembers = await DataStore.query(Member, (c) =>
          c.testapplicationID.eq(applicationID)
        );
        setMembers(existingMembers);
      } catch (error) {
        console.log('Error fetching the members data.');
      }
    };
    if (application) {
      getMembers(application.id);
    }
  }, [application]);

  useEffect(() => {
    if (watchRelationship !== 'Other') {
      unregister('otherRelationship');
    }
  }, [watchRelationship]);

  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      homeowners: false,
    }));
  }, [setReviewedSections]);

  useEffect(() => {
    if (expanded) {
      customCardReference.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [expanded]);

  return (
    <>
      <CustomExpandableCard
        title={`${getCheckOrExEmoji(reviewedSections.homeowners)} Household`}
        expanded={expanded}
        onExpandedChange={setExpanded}
        ref={customCardReference}
      >
        <ThemeProvider
          theme={{
            tokens: {
              components: {
                table: {
                  header: {
                    borderColor: 'black',
                  },
                  data: {
                    borderColor: 'black',
                  },
                },
              },
            },
          }}
        >
          <Table variation="small" style={{ wordBreak: 'break-word' }}>
            <TableHead>
              <TableRow>
                <TableCell as="th" width="40%">
                  Name
                </TableCell>
                <TableCell as="th" width="40%">
                  Relationship
                </TableCell>
                <TableCell as="th" width="20%">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.length > 0 ? (
                members.map((member) => {
                  const handleOnClickMore = () => {
                    const hasOtherRelationship = !relationshipOptions.includes(
                      member.props.relationship
                    );
                    reset({
                      ...member.props,
                      relationship: hasOtherRelationship
                        ? 'Other'
                        : member.props.relationship,
                      otherRelationship: hasOtherRelationship
                        ? member.props.relationship
                        : undefined,
                    });
                    setMemberModal(true);
                  };
                  return (
                    <TableRow key={member.id}>
                      <TableCell>{member.props.fullName}</TableCell>
                      <TableCell>{member.props.relationship}</TableCell>
                      <TableCell>
                        <Flex
                          direction={{ base: 'column', small: 'row' }}
                          width="100%"
                          justifyContent="center"
                        >
                          <Button
                            height="2rem"
                            width="2rem"
                            padding="0"
                            title="Open"
                            onClick={handleOnClickMore}
                          >
                            <MdMoreHoriz size="1.25rem" />
                          </Button>
                        </Flex>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={3} textAlign="center">
                    No members added yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <br />
          <Flex width="100%" justifyContent="end">
            <Link to="../homeowners">
              <Button>Edit</Button>
            </Link>
            <Button onClick={onReview} variation="primary">
              Review
            </Button>
          </Flex>
        </ThemeProvider>
        <Modal
          title="Member"
          open={memberModal}
          onClickClose={handleOnClickCloseMemberModal}
          width={{ large: '35rem', medium: '65%', base: '95%' }}
        >
          <Flex
            direction="column"
            gap="1rem"
            justifyContent="center"
            alignItems="stretch"
          >
            <TextField
              {...register('fullName')}
              label="Full legal name"
              type="text"
              isDisabled
            />
            <TextField
              {...register('birthDay')}
              label="Date of birth"
              type="date"
              isDisabled
            />
            <SelectField {...register('sex')} label="Sex" isDisabled>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </SelectField>
            <SelectField
              {...register('relationship')}
              label="Relationship"
              isDisabled
            >
              {relationshipOptions.map((relationshipOption) => (
                <option key={relationshipOption} value={relationshipOption}>
                  {relationshipOption}
                </option>
              ))}
            </SelectField>
            {watchRelationship === 'Other' && (
              <TextField
                {...register('otherRelationship')}
                label="Please describe this relationship"
                isDisabled
              />
            )}
            <Flex width="100%" justifyContent="end">
              <Link to="../homeowners">
                <Button variation="primary">Edit</Button>
              </Link>
            </Flex>
          </Flex>
        </Modal>
      </CustomExpandableCard>
      <br />
    </>
  );
}

HomeownersSection.propTypes = {
  expanded: PropTypes.bool,
  setExpanded: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
};

export default HomeownersSection;
