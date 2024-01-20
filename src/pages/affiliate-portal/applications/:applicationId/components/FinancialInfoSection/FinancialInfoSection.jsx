import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Heading, ScrollView, TabItem, Tabs } from '@aws-amplify/ui-react';
import IncomeList from '../IncomeList';
import DebtList from '../DebtList';
import AssetList from '../AssetList';

const FinancialInfoSection = ({
  applicantInfo,
  members,
  incomes,
  debts,
  assets,
  sizeRenderer,
}) => {
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

  return (
    <>
      <Heading level="3" textAlign="center">
        Financial information
      </Heading>
      <ScrollView>
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
      <Heading level="4" textAlign="center">
        {`Financial information of ${ownerBySelectedTab?.fullName}`}
      </Heading>
      <IncomeList
        items={filterIncomesBySelectedTab}
        sizeRenderer={sizeRenderer}
      />
      <DebtList items={filterDebtsBySelectedTab} sizeRenderer={sizeRenderer} />
      <AssetList
        items={filterAssetsBySelectedTab}
        sizeRenderer={sizeRenderer}
      />
    </>
  );
};

FinancialInfoSection.propTypes = {
  applicantInfo: PropTypes.object,
  members: PropTypes.arrayOf(PropTypes.object),
  incomes: PropTypes.arrayOf(PropTypes.object),
  debts: PropTypes.arrayOf(PropTypes.object),
  assets: PropTypes.arrayOf(PropTypes.object),
  sizeRenderer: PropTypes.bool,
};

export default FinancialInfoSection;
