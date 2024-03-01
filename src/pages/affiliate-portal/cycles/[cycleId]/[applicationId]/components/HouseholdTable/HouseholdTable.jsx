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
  Heading,
  Divider,
} from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'components/Modal';
import { MdMoreHoriz } from 'react-icons/md';
import PropTypes from 'prop-types';

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

function HouseholdTable({ members }) {
  const [memberModal, setMemberModal] = useState(false);

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
    if (watchRelationship !== 'Other') {
      unregister('otherRelationship');
    }
  }, [watchRelationship]);

  return (
    <Flex direction="column">
      <Heading level="3">Household Member List</Heading>
      <Divider />

      <Table highlightOnHover style={{ wordBreak: 'break-word' }}>
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
        </Flex>
      </Modal>
    </Flex>
  );
}

HouseholdTable.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object),
};

export default HouseholdTable;
