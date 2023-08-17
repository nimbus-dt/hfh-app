/* eslint-disable react/prop-types */
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
import { useEffect, useState } from 'react';
import { Application, UserProps } from '../../../../models';
import { HouseholdList } from '../Household/HouseholdList';
import { IncomeList } from '../Income/IncomeList';
import { SavingsList } from '../Savings/SavingsList';
import { DebtList } from '../Debt/DebtList';

export function ConfirmForm({ application }) {
  const [userDataBool, setUserDataBool] = useState(false);
  const [userID, setUserID] = useState('');
  const [formData, setFormData] = useState({});
  const [previousDataId, setPreviousDataId] = useState(null);
  const [householdMembers, setHouseholdMembers] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [incomes, setIncomes] = useState([]);
  const [savings, setSavings] = useState([]);
  const [debts, setDebts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function setApplicationChildren() {
      const applicationObject = await DataStore.query(
        Application,
        application.id
      );

      setSelectedApplication(applicationObject);

      try {
        const householdMemberArray =
          await selectedApplication?.HouseholdMembers.toArray();
        const incomeArray = await selectedApplication?.IncomeRecords.toArray();
        const savingArray = await selectedApplication?.SavingRecords.toArray();
        const debtArray = await selectedApplication?.DebtRecords.toArray();

        setHouseholdMembers(householdMemberArray);
        setIncomes(incomeArray);
        setSavings(savingArray);
        setDebts(debtArray);
      } catch (error) {
        console.log(`Error fetching application children: ${error}`);
      }
    }
    setApplicationChildren();
  }, [application.id, selectedApplication]);

  useEffect(() => {
    async function checkSubmittedStatus() {
      if (selectedApplication?.submitted) {
        navigate('../apps');
      }
    }
    checkSubmittedStatus();
  }, [navigate, selectedApplication?.submitted]);

  async function submitApplication() {
    const applicationObject = await DataStore.query(
      Application,
      application.id
    );

    const current = new Date();
    const currentDate = current.toISOString();
    const cutDate = currentDate.substring(0, 10);

    try {
      const newApp = await DataStore.save(
        Application.copyOf(applicationObject, (updated) => {
          updated.submitted = true;
          updated.ownerName = `${formData.name}`;
          updated.submittedStatus = 'PENDING';
          updated.dateSubmitted = cutDate;
          // Include other properties that need to be updated
        })
      );
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
        setUserID(currentUser.username);

        const userDataObject = await DataStore.query(UserProps, (u) =>
          u.ownerID.eq(currentUser.username)
        );

        if (userDataObject.length > 0) {
          setUserDataBool(true);
          const previousData = userDataObject[0];
          setPreviousDataId(previousData.id);
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

          <TableRow>
            <TableCell as="th" width="25%">
              Name
            </TableCell>
            <TableCell>{formData.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Date of Birth
            </TableCell>
            <TableCell>{formData.dob}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Sex
            </TableCell>
            <TableCell>{formData.sex}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Phone Number
            </TableCell>
            <TableCell>{formData.phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Address
            </TableCell>
            <TableCell>{formData.address}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Zip
            </TableCell>
            <TableCell>{formData.zip}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Email
            </TableCell>
            <TableCell>{formData.email}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell as="th" colSpan="2">
              <Heading level="3" textAlign="center">
                Household Information
              </Heading>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan="2">
              <HouseholdList items={householdMembers} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell as="th" colSpan="2">
              <Heading level="3" textAlign="center">
                Savings Information
              </Heading>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan="2">
              <SavingsList items={savings} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell as="th" colSpan="2">
              <Heading level="3" textAlign="center">
                Debt Information
              </Heading>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan="2">
              <DebtList items={debts} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell as="th" colSpan="2">
              <Heading level="3" textAlign="center">
                Income Information
              </Heading>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan="2">
              <IncomeList items={incomes} />
            </TableCell>
          </TableRow>
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
      >
        Submit
      </Button>
    </Flex>
  );

  return prescreenDetail;
}
