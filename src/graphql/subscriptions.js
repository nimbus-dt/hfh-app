/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($filter: ModelSubscriptionNoteFilterInput) {
    onCreateNote(filter: $filter) {
      id
      serializedEditorState
      ownerID
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
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($filter: ModelSubscriptionNoteFilterInput) {
    onUpdateNote(filter: $filter) {
      id
      serializedEditorState
      ownerID
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
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($filter: ModelSubscriptionNoteFilterInput) {
    onDeleteNote(filter: $filter) {
      id
      serializedEditorState
      ownerID
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
export const onCreateProperty = /* GraphQL */ `
  subscription OnCreateProperty($filter: ModelSubscriptionPropertyFilterInput) {
    onCreateProperty(filter: $filter) {
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
export const onUpdateProperty = /* GraphQL */ `
  subscription OnUpdateProperty($filter: ModelSubscriptionPropertyFilterInput) {
    onUpdateProperty(filter: $filter) {
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
export const onDeleteProperty = /* GraphQL */ `
  subscription OnDeleteProperty($filter: ModelSubscriptionPropertyFilterInput) {
    onDeleteProperty(filter: $filter) {
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
export const onCreateTestCycle = /* GraphQL */ `
  subscription OnCreateTestCycle(
    $filter: ModelSubscriptionTestCycleFilterInput
  ) {
    onCreateTestCycle(filter: $filter) {
      id
      startDate
      endDate
      isOpen
      props
      habitatID
      TestApplications {
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
export const onUpdateTestCycle = /* GraphQL */ `
  subscription OnUpdateTestCycle(
    $filter: ModelSubscriptionTestCycleFilterInput
  ) {
    onUpdateTestCycle(filter: $filter) {
      id
      startDate
      endDate
      isOpen
      props
      habitatID
      TestApplications {
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
export const onDeleteTestCycle = /* GraphQL */ `
  subscription OnDeleteTestCycle(
    $filter: ModelSubscriptionTestCycleFilterInput
  ) {
    onDeleteTestCycle(filter: $filter) {
      id
      startDate
      endDate
      isOpen
      props
      habitatID
      TestApplications {
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
      reviewStatus
      submissionStatus
      props
      type
      testcycleID
      Notes {
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
      reviewStatus
      submissionStatus
      props
      type
      testcycleID
      Notes {
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
      reviewStatus
      submissionStatus
      props
      type
      testcycleID
      Notes {
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
      isCoApplicant
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
      isCoApplicant
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
      isCoApplicant
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
      props {
        customStatus
        homeownershipTermsText
        homeownershipMinCurrentAddressMonths
        homeownershipMinCurrentEmploymentMonths
        homeownershipNoOpenCycle
        homeownershipHomeText
        __typename
      }
      users
      AMI
      TestCycles {
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
      props {
        customStatus
        homeownershipTermsText
        homeownershipMinCurrentAddressMonths
        homeownershipMinCurrentEmploymentMonths
        homeownershipNoOpenCycle
        homeownershipHomeText
        __typename
      }
      users
      AMI
      TestCycles {
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
      props {
        customStatus
        homeownershipTermsText
        homeownershipMinCurrentAddressMonths
        homeownershipMinCurrentEmploymentMonths
        homeownershipNoOpenCycle
        homeownershipHomeText
        __typename
      }
      users
      AMI
      TestCycles {
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
