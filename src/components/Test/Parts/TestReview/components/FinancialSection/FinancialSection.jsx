import {
  Flex,
  Tabs,
  TabItem,
  ScrollView,
  View,
  Text,
  Loader,
  Button,
} from '@aws-amplify/ui-react';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { ApplicantInfo, Member, Income, Debt, Asset } from 'models';
import { CustomCard } from 'components/Test/Reusable/CustomCard';
import { getCheckOrExEmoji } from 'utils/misc';
import PropTypes from 'prop-types';
import { CustomExpandableCard } from 'components/Test/Reusable/CustomExpandableCard';
import IncomeSection from './components/IncomeSection';
import DebtSection from './components/DebtSection';
import AssetsSection from './components/AssetsSection';

export default function FinancialSection({
  reviewedSections,
  setReviewedSections,
  onReview,
  expanded,
  setExpanded,
}) {
  const [applicantInfo, setApplicantInfo] = useState();
  const [members, setMembers] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [debts, setDebts] = useState([]);
  const [assets, setAssets] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const { application } = useOutletContext();
  const customCardReference = useRef(null);

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

  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      financial: false,
    }));
  }, [setReviewedSections]);

  useEffect(() => {
    if (expanded) {
      customCardReference.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [expanded]);

  return applicantInfo === undefined ? (
    <CustomCard width="100%">
      <Flex>
        <Loader size="large" />
        <Text>Loading financial data</Text>
      </Flex>
    </CustomCard>
  ) : (
    <>
      <CustomExpandableCard
        title={`${getCheckOrExEmoji(
          reviewedSections.financial
        )} Financial information`}
        expanded={expanded}
        onExpandedChange={setExpanded}
        ref={customCardReference}
      >
        <View width="100%" borderRadius="medium" overflow="hidden">
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
        <CustomCard width="100%">
          <Text fontWeight="bold">
            {ownerBySelectedTab !== undefined &&
              `${ownerBySelectedTab.fullName} Financial Information`}
          </Text>
        </CustomCard>
        <IncomeSection
          ownerId={ownerBySelectedTab?.id}
          incomes={filterIncomesBySelectedTab}
        />
        <DebtSection
          ownerId={ownerBySelectedTab?.id}
          debts={filterDebtsBySelectedTab}
        />
        <AssetsSection
          ownerId={ownerBySelectedTab?.id}
          assets={filterAssetsBySelectedTab}
        />
        <Flex width="100%" justifyContent="end">
          <Button onClick={onReview} variation="primary">
            Confirm
          </Button>
        </Flex>
      </CustomExpandableCard>
      <br />
    </>
  );
}

FinancialSection.propTypes = {
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  expanded: PropTypes.bool,
  setExpanded: PropTypes.func,
};
