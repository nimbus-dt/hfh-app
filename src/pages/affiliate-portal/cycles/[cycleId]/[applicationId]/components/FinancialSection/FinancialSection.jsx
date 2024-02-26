import {
  Flex,
  Tabs,
  TabItem,
  ScrollView,
  Text,
  Loader,
  Heading,
  Divider,
} from '@aws-amplify/ui-react';
import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import CustomCard from 'components/CustomCard';
import IncomeSection from './components/IncomeSection';
import DebtSection from './components/DebtSection';
import AssetsSection from './components/AssetsSection';

export default function FinancialSection({
  applicantInfo,
  members,
  incomes,
  debts,
  assets,
}) {
  const [selectedTab, setSelectedTab] = useState(0);

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

  return applicantInfo === undefined ? (
    <CustomCard width="100%">
      <Flex>
        <Loader size="large" />
        <Text>Loading financial data</Text>
      </Flex>
    </CustomCard>
  ) : (
    <Flex direction="column">
      <Heading level="3">Financial information</Heading>
      <Divider />
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
      <Heading level="4">
        {`Financial information of ${ownerBySelectedTab?.fullName}`}
      </Heading>
      <IncomeSection incomes={filterIncomesBySelectedTab} />
      <DebtSection debts={filterDebtsBySelectedTab} />
      <AssetsSection assets={filterAssetsBySelectedTab} />
    </Flex>
  );
}

FinancialSection.propTypes = {
  applicantInfo: PropTypes.object,
  members: PropTypes.arrayOf(PropTypes.object),
  incomes: PropTypes.arrayOf(PropTypes.object),
  debts: PropTypes.arrayOf(PropTypes.object),
  assets: PropTypes.arrayOf(PropTypes.object),
};
