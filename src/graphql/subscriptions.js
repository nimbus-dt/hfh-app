/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateApplicantOptional = /* GraphQL */ `
  subscription OnCreateApplicantOptional(
    $filter: ModelSubscriptionApplicantOptionalFilterInput
  ) {
    onCreateApplicantOptional(filter: $filter) {
      id
      ownerID
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateApplicantOptional = /* GraphQL */ `
  subscription OnUpdateApplicantOptional(
    $filter: ModelSubscriptionApplicantOptionalFilterInput
  ) {
    onUpdateApplicantOptional(filter: $filter) {
      id
      ownerID
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteApplicantOptional = /* GraphQL */ `
  subscription OnDeleteApplicantOptional(
    $filter: ModelSubscriptionApplicantOptionalFilterInput
  ) {
    onDeleteApplicantOptional(filter: $filter) {
      id
      ownerID
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateAsset = /* GraphQL */ `
  subscription OnCreateAsset($filter: ModelSubscriptionAssetFilterInput) {
    onCreateAsset(filter: $filter) {
      id
      ownerId
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateAsset = /* GraphQL */ `
  subscription OnUpdateAsset($filter: ModelSubscriptionAssetFilterInput) {
    onUpdateAsset(filter: $filter) {
      id
      ownerId
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteAsset = /* GraphQL */ `
  subscription OnDeleteAsset($filter: ModelSubscriptionAssetFilterInput) {
    onDeleteAsset(filter: $filter) {
      id
      ownerId
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateDebt = /* GraphQL */ `
  subscription OnCreateDebt($filter: ModelSubscriptionDebtFilterInput) {
    onCreateDebt(filter: $filter) {
      id
      ownerId
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateDebt = /* GraphQL */ `
  subscription OnUpdateDebt($filter: ModelSubscriptionDebtFilterInput) {
    onUpdateDebt(filter: $filter) {
      id
      ownerId
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteDebt = /* GraphQL */ `
  subscription OnDeleteDebt($filter: ModelSubscriptionDebtFilterInput) {
    onDeleteDebt(filter: $filter) {
      id
      ownerId
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateIncome = /* GraphQL */ `
  subscription OnCreateIncome($filter: ModelSubscriptionIncomeFilterInput) {
    onCreateIncome(filter: $filter) {
      id
      ownerId
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateIncome = /* GraphQL */ `
  subscription OnUpdateIncome($filter: ModelSubscriptionIncomeFilterInput) {
    onUpdateIncome(filter: $filter) {
      id
      ownerId
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteIncome = /* GraphQL */ `
  subscription OnDeleteIncome($filter: ModelSubscriptionIncomeFilterInput) {
    onDeleteIncome(filter: $filter) {
      id
      ownerId
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateTestApplication = /* GraphQL */ `
  subscription OnCreateTestApplication(
    $filter: ModelSubscriptionTestApplicationFilterInput
  ) {
    onCreateTestApplication(filter: $filter) {
      id
      ownerID
      lastSection
      members {
        nextToken
        startedAt
        __typename
      }
      submittedDate
      affiliate {
        id
        name
        urlName
        state
        city
        county
        countiesServed
        props
        users
        AMI
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      reviewStatus
      submissionStatus
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      testApplicationAffiliateId
      __typename
    }
  }
`;
export const onUpdateTestApplication = /* GraphQL */ `
  subscription OnUpdateTestApplication(
    $filter: ModelSubscriptionTestApplicationFilterInput
  ) {
    onUpdateTestApplication(filter: $filter) {
      id
      ownerID
      lastSection
      members {
        nextToken
        startedAt
        __typename
      }
      submittedDate
      affiliate {
        id
        name
        urlName
        state
        city
        county
        countiesServed
        props
        users
        AMI
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      reviewStatus
      submissionStatus
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      testApplicationAffiliateId
      __typename
    }
  }
`;
export const onDeleteTestApplication = /* GraphQL */ `
  subscription OnDeleteTestApplication(
    $filter: ModelSubscriptionTestApplicationFilterInput
  ) {
    onDeleteTestApplication(filter: $filter) {
      id
      ownerID
      lastSection
      members {
        nextToken
        startedAt
        __typename
      }
      submittedDate
      affiliate {
        id
        name
        urlName
        state
        city
        county
        countiesServed
        props
        users
        AMI
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      reviewStatus
      submissionStatus
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      testApplicationAffiliateId
      __typename
    }
  }
`;
export const onCreateEmploymentInfo = /* GraphQL */ `
  subscription OnCreateEmploymentInfo(
    $filter: ModelSubscriptionEmploymentInfoFilterInput
  ) {
    onCreateEmploymentInfo(filter: $filter) {
      id
      ownerID
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateEmploymentInfo = /* GraphQL */ `
  subscription OnUpdateEmploymentInfo(
    $filter: ModelSubscriptionEmploymentInfoFilterInput
  ) {
    onUpdateEmploymentInfo(filter: $filter) {
      id
      ownerID
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteEmploymentInfo = /* GraphQL */ `
  subscription OnDeleteEmploymentInfo(
    $filter: ModelSubscriptionEmploymentInfoFilterInput
  ) {
    onDeleteEmploymentInfo(filter: $filter) {
      id
      ownerID
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateMember = /* GraphQL */ `
  subscription OnCreateMember($filter: ModelSubscriptionMemberFilterInput) {
    onCreateMember(filter: $filter) {
      id
      props
      testapplicationID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateMember = /* GraphQL */ `
  subscription OnUpdateMember($filter: ModelSubscriptionMemberFilterInput) {
    onUpdateMember(filter: $filter) {
      id
      props
      testapplicationID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteMember = /* GraphQL */ `
  subscription OnDeleteMember($filter: ModelSubscriptionMemberFilterInput) {
    onDeleteMember(filter: $filter) {
      id
      props
      testapplicationID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateRecord = /* GraphQL */ `
  subscription OnCreateRecord($filter: ModelSubscriptionRecordFilterInput) {
    onCreateRecord(filter: $filter) {
      id
      ownerID
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateRecord = /* GraphQL */ `
  subscription OnUpdateRecord($filter: ModelSubscriptionRecordFilterInput) {
    onUpdateRecord(filter: $filter) {
      id
      ownerID
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteRecord = /* GraphQL */ `
  subscription OnDeleteRecord($filter: ModelSubscriptionRecordFilterInput) {
    onDeleteRecord(filter: $filter) {
      id
      ownerID
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateWritten = /* GraphQL */ `
  subscription OnCreateWritten($filter: ModelSubscriptionWrittenFilterInput) {
    onCreateWritten(filter: $filter) {
      id
      ownerID
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateWritten = /* GraphQL */ `
  subscription OnUpdateWritten($filter: ModelSubscriptionWrittenFilterInput) {
    onUpdateWritten(filter: $filter) {
      id
      ownerID
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteWritten = /* GraphQL */ `
  subscription OnDeleteWritten($filter: ModelSubscriptionWrittenFilterInput) {
    onDeleteWritten(filter: $filter) {
      id
      ownerID
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateChecklist = /* GraphQL */ `
  subscription OnCreateChecklist(
    $filter: ModelSubscriptionChecklistFilterInput
  ) {
    onCreateChecklist(filter: $filter) {
      id
      ownerID
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateChecklist = /* GraphQL */ `
  subscription OnUpdateChecklist(
    $filter: ModelSubscriptionChecklistFilterInput
  ) {
    onUpdateChecklist(filter: $filter) {
      id
      ownerID
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteChecklist = /* GraphQL */ `
  subscription OnDeleteChecklist(
    $filter: ModelSubscriptionChecklistFilterInput
  ) {
    onDeleteChecklist(filter: $filter) {
      id
      ownerID
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateApplicantInfo = /* GraphQL */ `
  subscription OnCreateApplicantInfo(
    $filter: ModelSubscriptionApplicantInfoFilterInput
  ) {
    onCreateApplicantInfo(filter: $filter) {
      id
      ownerID
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateApplicantInfo = /* GraphQL */ `
  subscription OnUpdateApplicantInfo(
    $filter: ModelSubscriptionApplicantInfoFilterInput
  ) {
    onUpdateApplicantInfo(filter: $filter) {
      id
      ownerID
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteApplicantInfo = /* GraphQL */ `
  subscription OnDeleteApplicantInfo(
    $filter: ModelSubscriptionApplicantInfoFilterInput
  ) {
    onDeleteApplicantInfo(filter: $filter) {
      id
      ownerID
      props
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateCycles = /* GraphQL */ `
  subscription OnCreateCycles($filter: ModelSubscriptionCyclesFilterInput) {
    onCreateCycles(filter: $filter) {
      id
      cycleStartDate
      cycleEndDate
      cycleStatus
      Applications {
        nextToken
        startedAt
        __typename
      }
      habitatID
      cycleSeason
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateCycles = /* GraphQL */ `
  subscription OnUpdateCycles($filter: ModelSubscriptionCyclesFilterInput) {
    onUpdateCycles(filter: $filter) {
      id
      cycleStartDate
      cycleEndDate
      cycleStatus
      Applications {
        nextToken
        startedAt
        __typename
      }
      habitatID
      cycleSeason
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteCycles = /* GraphQL */ `
  subscription OnDeleteCycles($filter: ModelSubscriptionCyclesFilterInput) {
    onDeleteCycles(filter: $filter) {
      id
      cycleStartDate
      cycleEndDate
      cycleStatus
      Applications {
        nextToken
        startedAt
        __typename
      }
      habitatID
      cycleSeason
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateContactForm = /* GraphQL */ `
  subscription OnCreateContactForm(
    $filter: ModelSubscriptionContactFormFilterInput
  ) {
    onCreateContactForm(filter: $filter) {
      id
      name
      affiliate
      contactEmail
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateContactForm = /* GraphQL */ `
  subscription OnUpdateContactForm(
    $filter: ModelSubscriptionContactFormFilterInput
  ) {
    onUpdateContactForm(filter: $filter) {
      id
      name
      affiliate
      contactEmail
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteContactForm = /* GraphQL */ `
  subscription OnDeleteContactForm(
    $filter: ModelSubscriptionContactFormFilterInput
  ) {
    onDeleteContactForm(filter: $filter) {
      id
      name
      affiliate
      contactEmail
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateUserProps = /* GraphQL */ `
  subscription OnCreateUserProps(
    $filter: ModelSubscriptionUserPropsFilterInput
  ) {
    onCreateUserProps(filter: $filter) {
      id
      ownerID
      name
      dob
      sex
      phone
      props
      address
      zip
      email
      identityID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateUserProps = /* GraphQL */ `
  subscription OnUpdateUserProps(
    $filter: ModelSubscriptionUserPropsFilterInput
  ) {
    onUpdateUserProps(filter: $filter) {
      id
      ownerID
      name
      dob
      sex
      phone
      props
      address
      zip
      email
      identityID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteUserProps = /* GraphQL */ `
  subscription OnDeleteUserProps(
    $filter: ModelSubscriptionUserPropsFilterInput
  ) {
    onDeleteUserProps(filter: $filter) {
      id
      ownerID
      name
      dob
      sex
      phone
      props
      address
      zip
      email
      identityID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateDebtRecord = /* GraphQL */ `
  subscription OnCreateDebtRecord(
    $filter: ModelSubscriptionDebtRecordFilterInput
  ) {
    onCreateDebtRecord(filter: $filter) {
      id
      ownerID
      monthlyRecurrence
      typeOfDebt
      estimatedAmount
      applicationID
      ownerApplicant
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateDebtRecord = /* GraphQL */ `
  subscription OnUpdateDebtRecord(
    $filter: ModelSubscriptionDebtRecordFilterInput
  ) {
    onUpdateDebtRecord(filter: $filter) {
      id
      ownerID
      monthlyRecurrence
      typeOfDebt
      estimatedAmount
      applicationID
      ownerApplicant
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteDebtRecord = /* GraphQL */ `
  subscription OnDeleteDebtRecord(
    $filter: ModelSubscriptionDebtRecordFilterInput
  ) {
    onDeleteDebtRecord(filter: $filter) {
      id
      ownerID
      monthlyRecurrence
      typeOfDebt
      estimatedAmount
      applicationID
      ownerApplicant
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateSavingRecord = /* GraphQL */ `
  subscription OnCreateSavingRecord(
    $filter: ModelSubscriptionSavingRecordFilterInput
  ) {
    onCreateSavingRecord(filter: $filter) {
      id
      ownerID
      institution
      estimatedAmount
      applicationID
      ownerApplicant
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateSavingRecord = /* GraphQL */ `
  subscription OnUpdateSavingRecord(
    $filter: ModelSubscriptionSavingRecordFilterInput
  ) {
    onUpdateSavingRecord(filter: $filter) {
      id
      ownerID
      institution
      estimatedAmount
      applicationID
      ownerApplicant
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteSavingRecord = /* GraphQL */ `
  subscription OnDeleteSavingRecord(
    $filter: ModelSubscriptionSavingRecordFilterInput
  ) {
    onDeleteSavingRecord(filter: $filter) {
      id
      ownerID
      institution
      estimatedAmount
      applicationID
      ownerApplicant
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateIncomeRecord = /* GraphQL */ `
  subscription OnCreateIncomeRecord(
    $filter: ModelSubscriptionIncomeRecordFilterInput
  ) {
    onCreateIncomeRecord(filter: $filter) {
      id
      ownerID
      typeOfIncome
      employer
      estimatedMonthlyIncome
      proofOfIncome
      applicationID
      ownerApplicant
      employmentTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateIncomeRecord = /* GraphQL */ `
  subscription OnUpdateIncomeRecord(
    $filter: ModelSubscriptionIncomeRecordFilterInput
  ) {
    onUpdateIncomeRecord(filter: $filter) {
      id
      ownerID
      typeOfIncome
      employer
      estimatedMonthlyIncome
      proofOfIncome
      applicationID
      ownerApplicant
      employmentTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteIncomeRecord = /* GraphQL */ `
  subscription OnDeleteIncomeRecord(
    $filter: ModelSubscriptionIncomeRecordFilterInput
  ) {
    onDeleteIncomeRecord(filter: $filter) {
      id
      ownerID
      typeOfIncome
      employer
      estimatedMonthlyIncome
      proofOfIncome
      applicationID
      ownerApplicant
      employmentTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateHouseholdMember = /* GraphQL */ `
  subscription OnCreateHouseholdMember(
    $filter: ModelSubscriptionHouseholdMemberFilterInput
  ) {
    onCreateHouseholdMember(filter: $filter) {
      id
      name
      dateOfBirth
      sex
      relationship
      isUnemployed
      applicationID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateHouseholdMember = /* GraphQL */ `
  subscription OnUpdateHouseholdMember(
    $filter: ModelSubscriptionHouseholdMemberFilterInput
  ) {
    onUpdateHouseholdMember(filter: $filter) {
      id
      name
      dateOfBirth
      sex
      relationship
      isUnemployed
      applicationID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteHouseholdMember = /* GraphQL */ `
  subscription OnDeleteHouseholdMember(
    $filter: ModelSubscriptionHouseholdMemberFilterInput
  ) {
    onDeleteHouseholdMember(filter: $filter) {
      id
      name
      dateOfBirth
      sex
      relationship
      isUnemployed
      applicationID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateApplication = /* GraphQL */ `
  subscription OnCreateApplication(
    $filter: ModelSubscriptionApplicationFilterInput
  ) {
    onCreateApplication(filter: $filter) {
      id
      ownerID
      habitatID
      HouseholdMembers {
        nextToken
        startedAt
        __typename
      }
      IncomeRecords {
        nextToken
        startedAt
        __typename
      }
      SavingRecords {
        nextToken
        startedAt
        __typename
      }
      DebtRecords {
        nextToken
        startedAt
        __typename
      }
      submitted
      dateSubmitted
      submittedStatus
      habitatRevisor
      dateRevised
      ownerName
      timeStatus
      cyclesID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateApplication = /* GraphQL */ `
  subscription OnUpdateApplication(
    $filter: ModelSubscriptionApplicationFilterInput
  ) {
    onUpdateApplication(filter: $filter) {
      id
      ownerID
      habitatID
      HouseholdMembers {
        nextToken
        startedAt
        __typename
      }
      IncomeRecords {
        nextToken
        startedAt
        __typename
      }
      SavingRecords {
        nextToken
        startedAt
        __typename
      }
      DebtRecords {
        nextToken
        startedAt
        __typename
      }
      submitted
      dateSubmitted
      submittedStatus
      habitatRevisor
      dateRevised
      ownerName
      timeStatus
      cyclesID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteApplication = /* GraphQL */ `
  subscription OnDeleteApplication(
    $filter: ModelSubscriptionApplicationFilterInput
  ) {
    onDeleteApplication(filter: $filter) {
      id
      ownerID
      habitatID
      HouseholdMembers {
        nextToken
        startedAt
        __typename
      }
      IncomeRecords {
        nextToken
        startedAt
        __typename
      }
      SavingRecords {
        nextToken
        startedAt
        __typename
      }
      DebtRecords {
        nextToken
        startedAt
        __typename
      }
      submitted
      dateSubmitted
      submittedStatus
      habitatRevisor
      dateRevised
      ownerName
      timeStatus
      cyclesID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateHabitat = /* GraphQL */ `
  subscription OnCreateHabitat($filter: ModelSubscriptionHabitatFilterInput) {
    onCreateHabitat(filter: $filter) {
      id
      name
      urlName
      state
      city
      county
      countiesServed
      props
      Applications {
        nextToken
        startedAt
        __typename
      }
      users
      AMI
      Cycles {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateHabitat = /* GraphQL */ `
  subscription OnUpdateHabitat($filter: ModelSubscriptionHabitatFilterInput) {
    onUpdateHabitat(filter: $filter) {
      id
      name
      urlName
      state
      city
      county
      countiesServed
      props
      Applications {
        nextToken
        startedAt
        __typename
      }
      users
      AMI
      Cycles {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteHabitat = /* GraphQL */ `
  subscription OnDeleteHabitat($filter: ModelSubscriptionHabitatFilterInput) {
    onDeleteHabitat(filter: $filter) {
      id
      name
      urlName
      state
      city
      county
      countiesServed
      props
      Applications {
        nextToken
        startedAt
        __typename
      }
      users
      AMI
      Cycles {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
