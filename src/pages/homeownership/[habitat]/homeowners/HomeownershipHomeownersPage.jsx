import {
  Flex,
  Button,
  Alert,
  TextField,
  SelectField,
  Text,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ThemeProvider,
} from '@aws-amplify/ui-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Member } from 'models';
import { createAlert } from 'utils/factories';
import Modal from 'components/Modal';
import { MdAdd, MdClose, MdMoreHoriz } from 'react-icons/md';
import CustomCard from 'components/CustomCard';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { memberSchema } from './HomeownershipHomeownersPage.schema';

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

export default function HomeownershipHomeownersPage() {
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState();
  const [memberToDelete, setMemberToDelete] = useState();
  const [memberModal, setMemberModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [alert, setAlert] = useState();
  const [noMembersModalOpen, setNoMembersModalOpen] = useState(false);
  const { application, updateApplicationLastSection } = useOutletContext();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    unregister,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(memberSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
  });

  const watchRelationship = watch('relationship');

  const handleOnExpandedChange = (newExpanded) => setExpanded(newExpanded);

  const handleOnClickAdd = () => setMemberModal(true);

  const handleOnClickCloseMemberModal = () => {
    reset({
      fullName: undefined,
      birthDay: undefined,
      sex: undefined,
      relationship: undefined,
      otherRelationship: undefined,
    });
    setMemberModal(false);
    setEditingMember(undefined);
    setEdit(false);
  };

  const handleOnClickCloseDelete = () => setMemberToDelete(undefined);

  const handleOnClickAcceptDelete = async () => {
    try {
      const original = await DataStore.query(Member, memberToDelete.id);
      const deletedMember = await DataStore.delete(original);
      setMembers((previousMembers) =>
        previousMembers.filter(
          (previousMember) => previousMember.id !== deletedMember.id
        )
      );
      setAlert(
        createAlert(
          'success',
          'Success',
          'The member was deleted successfully.'
        )
      );
    } catch {
      setAlert(
        createAlert('error', 'Error', "The member couldn't be deleted.")
      );
    }
    setMemberToDelete(undefined);
  };

  const onValidSubmitMember = async (data) => {
    try {
      const memberProps = {
        fullName: data.fullName,
        birthDay: data.birthDay,
        sex: data.sex,
        relationship: data.otherRelationship
          ? data.otherRelationship
          : data.relationship,
      };
      if (editingMember) {
        const original = await DataStore.query(Member, editingMember.id);
        const persistedMember = await DataStore.save(
          Member.copyOf(original, (originalMember) => {
            originalMember.testapplicationID = application.id;
            originalMember.props = memberProps;
          })
        );
        setMembers((previousMembers) => {
          const editedMemberIndex = previousMembers.findIndex(
            (memberCopy) => memberCopy.id === persistedMember.id
          );
          if (editedMemberIndex !== -1) {
            previousMembers[editedMemberIndex] = persistedMember;
          }
          return [...previousMembers];
        });
        setAlert(
          createAlert(
            'success',
            'Success',
            'The member was updated successfully.'
          )
        );
      } else {
        const persistedMember = await DataStore.save(
          new Member({ testapplicationID: application.id, props: memberProps })
        );
        setMembers((previousMembers) => [...previousMembers, persistedMember]);
        setAlert(
          createAlert(
            'success',
            'Success',
            'The member was added successfully.'
          )
        );
      }
      handleOnClickCloseMemberModal();

      updateApplicationLastSection();
    } catch {
      setAlert(createAlert('error', 'Error', "The member couldn't be saved."));
    }
  };

  const handleOnClickNext = () => {
    if (members.length > 0) {
      navigate('../employment');
    } else {
      setNoMembersModalOpen(true);
    }
  };

  const handleOnAcceptNoMembers = () => {
    navigate('../employment');
  };

  const handleOnCancelNoMembers = () => {
    setNoMembersModalOpen(false);
  };

  const handleOnClickEdit = () => setEdit((previousEdit) => !previousEdit);

  const isEnabled = editingMember === undefined || edit;

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

  return (
    <Flex direction="column" alignItems="center" width="100%">
      {alert && (
        <Alert
          variation={alert.variation}
          heading={alert.heading}
          onDismiss={() => setAlert()}
          isDismissible
          hasIcon
        >
          {alert.body}
        </Alert>
      )}
      <Modal
        title="Alert"
        open={memberToDelete !== undefined}
        onClickClose={handleOnClickCloseDelete}
      >
        <Text>Are you sure you want to delete this record?</Text>
        <br />
        <Flex width="100%" justifyContent="end">
          <Button variation="primary" onClick={handleOnClickAcceptDelete}>
            Accept
          </Button>
          <Button variation="secondary" onClick={handleOnClickCloseDelete}>
            Cancel
          </Button>
        </Flex>
      </Modal>
      <Modal
        title="Alert"
        open={noMembersModalOpen}
        onClickClose={handleOnCancelNoMembers}
      >
        <Text>
          Are you sure you want to continue? If so, it means that you are the
          only member of your household.
        </Text>
        <br />
        <Flex width="100%" justifyContent="end">
          <Button variation="primary" onClick={handleOnAcceptNoMembers}>
            Accept
          </Button>
          <Button variation="secondary" onClick={handleOnCancelNoMembers}>
            Cancel
          </Button>
        </Flex>
      </Modal>
      <CustomExpandableCard
        title={`${members.length > 0 ? '✔️' : '❌'} Household`}
        expanded={expanded}
        onExpandedChange={handleOnExpandedChange}
      >
        <Text>Please enter all members of your household.</Text>
        <Flex direction="row" justifyContent="end">
          <Button
            height="2rem"
            width="2rem"
            padding="0"
            onClick={handleOnClickAdd}
          >
            <MdAdd size="1.25rem" />
          </Button>
        </Flex>
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
                  const handleOnClickDelete = () => {
                    setMemberToDelete(member);
                  };

                  const handleOnClickMore = () => {
                    setEditingMember(member);
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
                          gap="0.5rem"
                        >
                          <Button
                            height="2rem"
                            width="2rem"
                            padding="0"
                            title="Delete"
                            onClick={handleOnClickDelete}
                          >
                            <MdClose size="1.25rem" />
                          </Button>
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
        </ThemeProvider>
        <Modal
          title="Member"
          open={memberModal || editingMember !== undefined}
          onClickClose={handleOnClickCloseMemberModal}
          width={{ large: '35rem', medium: '65%', base: '95%' }}
        >
          <form onSubmit={handleSubmit(onValidSubmitMember)}>
            <Flex
              direction="column"
              gap="1rem"
              justifyContent="center"
              alignItems="stretch"
            >
              <TextField
                {...register('fullName')}
                label="Full legal name"
                placeholder="John Doe"
                type="text"
                hasError={errors.fullName !== undefined}
                errorMessage={errors.fullName?.message}
                isRequired
                isDisabled={!isEnabled}
              />
              <TextField
                {...register('birthDay')}
                label="Date of birth"
                type="date"
                hasError={errors.birthDay !== undefined}
                errorMessage={errors.birthDay?.message}
                isRequired
                isDisabled={!isEnabled}
              />
              <SelectField
                {...register('sex')}
                label="Sex"
                hasError={errors.sex !== undefined}
                errorMessage={errors.sex?.message}
                isRequired
                isDisabled={!isEnabled}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </SelectField>
              <SelectField
                {...register('relationship')}
                label="Relationship"
                hasError={errors.relationship !== undefined}
                errorMessage={errors.relationship?.message}
                isRequired
                isDisabled={!isEnabled}
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
                  hasError={errors.otherRelationship !== undefined}
                  errorMessage={errors.otherRelationship?.message}
                  isRequired
                  isDisabled={!isEnabled}
                />
              )}
              <Flex width="100%" justifyContent="end">
                {editingMember ? (
                  <Button onClick={handleOnClickEdit} variation="secondary">
                    {edit ? 'Cancel' : 'Edit'}
                  </Button>
                ) : null}
                {isEnabled ? (
                  <Button type="submit" variation="primary">
                    Save
                  </Button>
                ) : null}
              </Flex>
            </Flex>
          </form>
        </Modal>
      </CustomExpandableCard>
      <CustomCard>
        <Flex width="100%" justifyContent="space-between">
          <Button variation="primary" onClick={() => navigate('../records')}>
            Back
          </Button>
          <Button variation="primary" onClick={handleOnClickNext}>
            Next
          </Button>
        </Flex>
      </CustomCard>
    </Flex>
  );
}
