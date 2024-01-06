import {
  Flex,
  Button,
  Alert,
  Tabs,
  TabItem,
  ScrollView,
  View,
  Text,
  Loader,
} from '@aws-amplify/ui-react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { ApplicantInfo, Member, Income, Debt, Asset } from 'models';
import { CustomCard } from '../../Reusable/CustomCard';
import IncomeSection from './components/IncomeSection';
import DebtSection from './components/DebtSection';
import AssetsSection from './components/AssetsSection';

export function TestFinancial() {
  const [applicantInfo, setApplicantInfo] = useState();
  const [members, setMembers] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [debts, setDebts] = useState([]);
  const [assets, setAssets] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const [alert, setAlert] = useState();
  const { habitat, application, updateApplicationLastSection } =
    useOutletContext();
  const navigate = useNavigate();

  const handleSelectedTabOnChange = (newTab) => setSelectedTab(Number(newTab));

  const ownerBySelectedTab = useMemo(() => {
    if (applicantInfo !== undefined) {
      return selectedTab === 0
        ? {
            id: applicantInfo.id,
            fullName: applicantInfo.props.basicInfo.fullName,
          }
        : {
            id: members[selectedTab - 1].id,
            fullName: members[selectedTab - 1].props.fullName,
          };
    }
    return undefined;
  }, [applicantInfo, members, selectedTab]);

  const filterIncomesBySelectedTab = useMemo(
    () => incomes.filter((income) => income.ownerId === ownerBySelectedTab.id),
    [incomes, ownerBySelectedTab]
  );

  const filterDebtsBySelectedTab = useMemo(
    () => debts.filter((debt) => debt.ownerId === ownerBySelectedTab.id),
    [debts, ownerBySelectedTab]
  );

  const filterAssetsBySelectedTab = useMemo(
    () => assets.filter((asset) => asset.ownerId === ownerBySelectedTab.id),
    [assets, ownerBySelectedTab]
  );

  const handleOnClickNext = () => {
    navigate('../employment');
  };

  useEffect(() => {
    const getFinancial = async (applicationID) => {
      try {
        const existingMembers = await DataStore.query(Member, (c) =>
          c.testapplicationID.eq(applicationID)
        );
        setMembers(existingMembers);
        const existingApplicantInfo = await DataStore.query(
          ApplicantInfo,
          (c) => c.ownerID.eq(applicationID)
        );
        setApplicantInfo(existingApplicantInfo[0]);
        const membersIdArray = existingMembers.map(
          (existingMember) => existingMember.id
        );

        const applicantAndMembersIdArray = [
          existingApplicantInfo[0].id,
          ...membersIdArray,
        ];

        const existingIncomes = await DataStore.query(Income, (c) =>
          c.or((c2) => {
            const arrayOfFilters = applicantAndMembersIdArray.map((id) =>
              c2.ownerId.eq(id)
            );

            return arrayOfFilters;
          })
        );

        setIncomes(existingIncomes);

        const existingDebts = await DataStore.query(Debt, (c) =>
          c.or((c2) => {
            const arrayOfFilters = applicantAndMembersIdArray.map((id) =>
              c2.ownerId.eq(id)
            );

            return arrayOfFilters;
          })
        );

        setDebts(existingDebts);

        const existingAssets = await DataStore.query(Asset, (c) =>
          c.or((c2) => {
            const arrayOfFilters = applicantAndMembersIdArray.map((id) =>
              c2.ownerId.eq(id)
            );

            return arrayOfFilters;
          })
        );

        setAssets(existingAssets);
      } catch (error) {
        console.log('Error fetching the financial data.', error);
      }
    };

    if (application) {
      getFinancial(application.id);
    }
  }, [application]);

  return (
    <Flex direction="column" alignItems="center" width="100%">
      {applicantInfo === undefined ? (
        <CustomCard>
          <Flex>
            <Loader size="large" />
            <Text>Loading data</Text>
          </Flex>
        </CustomCard>
      ) : (
        <>
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
          <View
            width={{ base: '80%', medium: '500px' }}
            borderRadius="medium"
            overflow="hidden"
          >
            <ScrollView backgroundColor="white">
              <Tabs
                spacing="equal"
                whiteSpace="nowrap"
                currentIndex={selectedTab}
                onChange={handleSelectedTabOnChange}
              >
                <TabItem title={applicantInfo?.props.basicInfo.fullName} />
                {members.map((member) => (
                  <TabItem key={member.id} title={member?.props.fullName} />
                ))}
              </Tabs>
            </ScrollView>
          </View>
          <CustomCard>
            <Text fontWeight="bold">
              {ownerBySelectedTab !== undefined &&
                `${ownerBySelectedTab.fullName} Financial Information`}
            </Text>
          </CustomCard>
          <IncomeSection
            ownerId={ownerBySelectedTab?.id}
            incomes={filterIncomesBySelectedTab}
            setIncomes={setIncomes}
            setAlert={setAlert}
            applicationId={application?.id}
            updateApplicationLastSection={updateApplicationLastSection}
            habitat={habitat}
          />
          <DebtSection
            ownerId={ownerBySelectedTab?.id}
            debts={filterDebtsBySelectedTab}
            setDebts={setDebts}
            setAlert={setAlert}
            applicationId={application?.id}
            updateApplicationLastSection={updateApplicationLastSection}
            habitat={habitat}
          />
          <AssetsSection
            ownerId={ownerBySelectedTab?.id}
            assets={filterAssetsBySelectedTab}
            setAssets={setAssets}
            setAlert={setAlert}
            applicationId={application?.id}
            updateApplicationLastSection={updateApplicationLastSection}
            habitat={habitat}
          />
        </>
      )}
      <CustomCard>
        <Flex width="100%" justifyContent="space-between">
          <Link to="../employment">
            <Button variation="primary">Back</Button>
          </Link>
          <Button
            variation="primary"
            onClick={handleOnClickNext}
            isDisabled={members.length === 0}
          >
            Next
          </Button>
        </Flex>
      </CustomCard>
    </Flex>
  );
}
