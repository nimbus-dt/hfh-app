/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { DataStore, Auth } from 'aws-amplify';
import {
  Flex,
  Heading,
  Text,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { Application, UserProps } from '../../../../models';
import { HouseholdList } from '../Household/HouseholdList';
import { IncomeList } from '../Income/IncomeList';
import { SavingsList } from '../Savings/SavingsList';
import { DebtList } from '../Debt/DebtList';

export function ConfirmForm({
  application,
  householdMembers,
  savingRecords,
  debtRecords,
  incomeRecords,
}) {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const isAnySectionEmpty =
    householdMembers.length <= 0 ||
    savingRecords.length <= 0 ||
    debtRecords.length <= 0 ||
    incomeRecords.length <= 0;

  // check if application is already submitted
  useEffect(() => {
    if (!application?.submitted) {
      return;
    }

    navigate('../apps');
  }, [application?.submitted]);

  async function submitApplication() {
    if (isAnySectionEmpty) {
      console.log('not submitting mf');
      return;
    }

    const current = new Date();
    const currentDate = current.toISOString();
    const cutDate = currentDate.substring(0, 10);

    try {
      await DataStore.save(
        Application.copyOf(application, (updated) => {
          updated.submitted = true;
          updated.ownerName = `${formData.name}`;
          updated.submittedStatus = 'PENDING';
          updated.dateSubmitted = cutDate;
          // Include other properties that need to be updated
        })
      );

      navigate('../apps');
    } catch (error) {
      console.log(`Error submitting application: ${error}`);
    }
  }

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser({
          bypassCache: false,
        });

        const userDataObject = await DataStore.query(UserProps, (u) =>
          u.ownerID.eq(currentUser.username)
        );

        if (userDataObject.length > 0) {
          const userData = userDataObject[0];
          setFormData({
            name: userData.name,
            dob: userData.dob,
            sex: userData.sex,
            phone: userData.phone,
            address: userData.address,
            zip: userData.zip,
            email: userData.email,
          });
        }
      } catch (error) {
        console.log('Error fetching UserData:', error);
      }
    };

    checkUserData();
  }, []);

  const generalInformationData = [
    {
      header: 'Name',
      value: formData.name,
    },
    {
      header: 'Date of Birth',
      value: formData.dob,
    },
    {
      header: 'Sex',
      value: formData.sex,
    },
    {
      header: 'Phone Number',
      value: formData.phone,
    },
    {
      header: 'Address',
      value: formData.address,
    },
    {
      header: 'Zip',
      value: formData.zip,
    },

    {
      header: 'Email',
      value: formData.email,
    },
  ];

  const sectionsListsData = [
    {
      header: 'Household',
      ListComponent: <HouseholdList items={householdMembers} />,
    },
    {
      header: 'Savings',
      ListComponent: <SavingsList items={savingRecords} />,
    },
    {
      header: 'Debt',
      ListComponent: <DebtList items={debtRecords} />,
    },
    {
      header: 'Income',
      ListComponent: <IncomeList items={incomeRecords} />,
    },
  ];

  const prescreenDetail = (
    <Flex width="100%" direction="column">
      <Table caption="" highlightOnHover variation="bordered">
        <TableBody>
          <TableRow>
            <TableCell as="th" colSpan="2">
              <Heading level="3" textAlign="center">
                General Information
              </Heading>
            </TableCell>
          </TableRow>

          {generalInformationData.map((data) => (
            <TableRow key={data.header}>
              <TableCell as="th" width="25%">
                {data.header}
              </TableCell>
              <TableCell>{data.value}</TableCell>
            </TableRow>
          ))}

          {sectionsListsData.map((data) => (
            <Fragment key={data.header}>
              <TableRow>
                <TableCell as="th" colSpan="2">
                  <Heading level="3" textAlign="center">
                    {data.header} Information
                  </Heading>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan="2">{data.ListComponent}</TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>

      <Text textAlign="center" width="100%">
        Please make sure that you have added at least ONE RECORD per section. If
        you have not, your application will not be considered.
      </Text>

      <Button
        type="submit"
        variation="primary"
        onClick={() => {
          submitApplication();
        }}
        disabled={isAnySectionEmpty}
      >
        Submit
      </Button>
    </Flex>
  );

  return prescreenDetail;
}

ConfirmForm.propTypes = {
  application: PropTypes.object,
  householdMembers: PropTypes.array,
  savingRecords: PropTypes.array,
  debtRecords: PropTypes.array,
  incomeRecords: PropTypes.array,
};
