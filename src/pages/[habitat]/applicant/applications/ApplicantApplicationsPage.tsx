import {
  Button,
  Flex,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
  View,
} from '@aws-amplify/ui-react';
import { SubmissionStatus } from 'models';
import React from 'react';
import { MdOutlineOpenInNew } from 'react-icons/md';

const dummyData = [
  {
    name: 'Homeownership',
    affiliate: 'Habitat for Humanity of Kenosha',
    type: 'Online',
    dateSubmitted: '04/20/2024',
    status: SubmissionStatus.SUBMITTED,
  },
  {
    name: 'Repairs',
    affiliate: 'Habitat for Humanity',
    type: 'Online',
    dateSubmitted: '04/20/2024',
    status: SubmissionStatus.UNSUBMITTED,
  },
  {
    name: 'Pre-Screen',
    affiliate: 'Habitat for Humanity of Loudon County',
    type: 'Online',
    dateSubmitted: '04/20/2024',
    status: SubmissionStatus.RETURNED,
  },
];

const ApplicantApplicationsPage = () => (
  <Flex padding="24px" direction="column">
    <Flex justifyContent="space-between">
      <Flex direction="column">
        <Heading level={3}>Application Dashboard</Heading>
        <Text>Select the type of application</Text>
      </Flex>
      <Flex>
        <Button>Current</Button>
      </Flex>
    </Flex>
    <Text>Current Applications</Text>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell as="th">Name</TableCell>
          <TableCell as="th">Affiliate</TableCell>
          <TableCell as="th">Type</TableCell>
          <TableCell as="th">Date Submitted</TableCell>
          <TableCell as="th">Status</TableCell>
          <TableCell as="th">View</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dummyData.map((data) => (
          <TableRow>
            <TableCell>{data.name}</TableCell>
            <TableCell>{data.affiliate}</TableCell>
            <TableCell>{data.type}</TableCell>
            <TableCell>{data.dateSubmitted}</TableCell>
            <TableCell>{data.status}</TableCell>
            <TableCell>
              <Button>
                <MdOutlineOpenInNew />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Flex>
);

export default ApplicantApplicationsPage;
