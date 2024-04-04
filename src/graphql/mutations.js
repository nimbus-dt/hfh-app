/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
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
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
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
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
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
export const createProperty = /* GraphQL */ `
  mutation CreateProperty(
    $input: CreatePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    createProperty(input: $input, condition: $condition) {
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
export const updateProperty = /* GraphQL */ `
  mutation UpdateProperty(
    $input: UpdatePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    updateProperty(input: $input, condition: $condition) {
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
export const deleteProperty = /* GraphQL */ `
  mutation DeleteProperty(
    $input: DeletePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    deleteProperty(input: $input, condition: $condition) {
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
export const createTestCycle = /* GraphQL */ `
  mutation CreateTestCycle(
    $input: CreateTestCycleInput!
    $condition: ModelTestCycleConditionInput
  ) {
    createTestCycle(input: $input, condition: $condition) {
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
export const updateTestCycle = /* GraphQL */ `
  mutation UpdateTestCycle(
    $input: UpdateTestCycleInput!
    $condition: ModelTestCycleConditionInput
  ) {
    updateTestCycle(input: $input, condition: $condition) {
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
export const deleteTestCycle = /* GraphQL */ `
  mutation DeleteTestCycle(
    $input: DeleteTestCycleInput!
    $condition: ModelTestCycleConditionInput
  ) {
    deleteTestCycle(input: $input, condition: $condition) {
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
export const createApplicantOptional = /* GraphQL */ `
  mutation CreateApplicantOptional(
    $input: CreateApplicantOptionalInput!
    $condition: ModelApplicantOptionalConditionInput
  ) {
    createApplicantOptional(input: $input, condition: $condition) {
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
export const updateApplicantOptional = /* GraphQL */ `
  mutation UpdateApplicantOptional(
    $input: UpdateApplicantOptionalInput!
    $condition: ModelApplicantOptionalConditionInput
  ) {
    updateApplicantOptional(input: $input, condition: $condition) {
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
export const deleteApplicantOptional = /* GraphQL */ `
  mutation DeleteApplicantOptional(
    $input: DeleteApplicantOptionalInput!
    $condition: ModelApplicantOptionalConditionInput
  ) {
    deleteApplicantOptional(input: $input, condition: $condition) {
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
export const createAsset = /* GraphQL */ `
  mutation CreateAsset(
    $input: CreateAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    createAsset(input: $input, condition: $condition) {
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
export const updateAsset = /* GraphQL */ `
  mutation UpdateAsset(
    $input: UpdateAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    updateAsset(input: $input, condition: $condition) {
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
export const deleteAsset = /* GraphQL */ `
  mutation DeleteAsset(
    $input: DeleteAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    deleteAsset(input: $input, condition: $condition) {
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
export const createDebt = /* GraphQL */ `
  mutation CreateDebt(
    $input: CreateDebtInput!
    $condition: ModelDebtConditionInput
  ) {
    createDebt(input: $input, condition: $condition) {
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
export const updateDebt = /* GraphQL */ `
  mutation UpdateDebt(
    $input: UpdateDebtInput!
    $condition: ModelDebtConditionInput
  ) {
    updateDebt(input: $input, condition: $condition) {
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
export const deleteDebt = /* GraphQL */ `
  mutation DeleteDebt(
    $input: DeleteDebtInput!
    $condition: ModelDebtConditionInput
  ) {
    deleteDebt(input: $input, condition: $condition) {
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
export const createIncome = /* GraphQL */ `
  mutation CreateIncome(
    $input: CreateIncomeInput!
    $condition: ModelIncomeConditionInput
  ) {
    createIncome(input: $input, condition: $condition) {
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
export const updateIncome = /* GraphQL */ `
  mutation UpdateIncome(
    $input: UpdateIncomeInput!
    $condition: ModelIncomeConditionInput
  ) {
    updateIncome(input: $input, condition: $condition) {
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
export const deleteIncome = /* GraphQL */ `
  mutation DeleteIncome(
    $input: DeleteIncomeInput!
    $condition: ModelIncomeConditionInput
  ) {
    deleteIncome(input: $input, condition: $condition) {
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
export const createTestApplication = /* GraphQL */ `
  mutation CreateTestApplication(
    $input: CreateTestApplicationInput!
    $condition: ModelTestApplicationConditionInput
  ) {
    createTestApplication(input: $input, condition: $condition) {
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
export const updateTestApplication = /* GraphQL */ `
  mutation UpdateTestApplication(
    $input: UpdateTestApplicationInput!
    $condition: ModelTestApplicationConditionInput
  ) {
    updateTestApplication(input: $input, condition: $condition) {
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
export const deleteTestApplication = /* GraphQL */ `
  mutation DeleteTestApplication(
    $input: DeleteTestApplicationInput!
    $condition: ModelTestApplicationConditionInput
  ) {
    deleteTestApplication(input: $input, condition: $condition) {
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
export const createEmploymentInfo = /* GraphQL */ `
  mutation CreateEmploymentInfo(
    $input: CreateEmploymentInfoInput!
    $condition: ModelEmploymentInfoConditionInput
  ) {
    createEmploymentInfo(input: $input, condition: $condition) {
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
export const updateEmploymentInfo = /* GraphQL */ `
  mutation UpdateEmploymentInfo(
    $input: UpdateEmploymentInfoInput!
    $condition: ModelEmploymentInfoConditionInput
  ) {
    updateEmploymentInfo(input: $input, condition: $condition) {
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
export const deleteEmploymentInfo = /* GraphQL */ `
  mutation DeleteEmploymentInfo(
    $input: DeleteEmploymentInfoInput!
    $condition: ModelEmploymentInfoConditionInput
  ) {
    deleteEmploymentInfo(input: $input, condition: $condition) {
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
export const createMember = /* GraphQL */ `
  mutation CreateMember(
    $input: CreateMemberInput!
    $condition: ModelMemberConditionInput
  ) {
    createMember(input: $input, condition: $condition) {
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
export const updateMember = /* GraphQL */ `
  mutation UpdateMember(
    $input: UpdateMemberInput!
    $condition: ModelMemberConditionInput
  ) {
    updateMember(input: $input, condition: $condition) {
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
export const deleteMember = /* GraphQL */ `
  mutation DeleteMember(
    $input: DeleteMemberInput!
    $condition: ModelMemberConditionInput
  ) {
    deleteMember(input: $input, condition: $condition) {
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
export const createRecord = /* GraphQL */ `
  mutation CreateRecord(
    $input: CreateRecordInput!
    $condition: ModelRecordConditionInput
  ) {
    createRecord(input: $input, condition: $condition) {
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
export const updateRecord = /* GraphQL */ `
  mutation UpdateRecord(
    $input: UpdateRecordInput!
    $condition: ModelRecordConditionInput
  ) {
    updateRecord(input: $input, condition: $condition) {
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
export const deleteRecord = /* GraphQL */ `
  mutation DeleteRecord(
    $input: DeleteRecordInput!
    $condition: ModelRecordConditionInput
  ) {
    deleteRecord(input: $input, condition: $condition) {
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
export const createWritten = /* GraphQL */ `
  mutation CreateWritten(
    $input: CreateWrittenInput!
    $condition: ModelWrittenConditionInput
  ) {
    createWritten(input: $input, condition: $condition) {
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
export const updateWritten = /* GraphQL */ `
  mutation UpdateWritten(
    $input: UpdateWrittenInput!
    $condition: ModelWrittenConditionInput
  ) {
    updateWritten(input: $input, condition: $condition) {
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
export const deleteWritten = /* GraphQL */ `
  mutation DeleteWritten(
    $input: DeleteWrittenInput!
    $condition: ModelWrittenConditionInput
  ) {
    deleteWritten(input: $input, condition: $condition) {
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
export const createChecklist = /* GraphQL */ `
  mutation CreateChecklist(
    $input: CreateChecklistInput!
    $condition: ModelChecklistConditionInput
  ) {
    createChecklist(input: $input, condition: $condition) {
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
export const updateChecklist = /* GraphQL */ `
  mutation UpdateChecklist(
    $input: UpdateChecklistInput!
    $condition: ModelChecklistConditionInput
  ) {
    updateChecklist(input: $input, condition: $condition) {
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
export const deleteChecklist = /* GraphQL */ `
  mutation DeleteChecklist(
    $input: DeleteChecklistInput!
    $condition: ModelChecklistConditionInput
  ) {
    deleteChecklist(input: $input, condition: $condition) {
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
export const createApplicantInfo = /* GraphQL */ `
  mutation CreateApplicantInfo(
    $input: CreateApplicantInfoInput!
    $condition: ModelApplicantInfoConditionInput
  ) {
    createApplicantInfo(input: $input, condition: $condition) {
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
export const updateApplicantInfo = /* GraphQL */ `
  mutation UpdateApplicantInfo(
    $input: UpdateApplicantInfoInput!
    $condition: ModelApplicantInfoConditionInput
  ) {
    updateApplicantInfo(input: $input, condition: $condition) {
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
export const deleteApplicantInfo = /* GraphQL */ `
  mutation DeleteApplicantInfo(
    $input: DeleteApplicantInfoInput!
    $condition: ModelApplicantInfoConditionInput
  ) {
    deleteApplicantInfo(input: $input, condition: $condition) {
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
export const createHabitat = /* GraphQL */ `
  mutation CreateHabitat(
    $input: CreateHabitatInput!
    $condition: ModelHabitatConditionInput
  ) {
    createHabitat(input: $input, condition: $condition) {
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
export const updateHabitat = /* GraphQL */ `
  mutation UpdateHabitat(
    $input: UpdateHabitatInput!
    $condition: ModelHabitatConditionInput
  ) {
    updateHabitat(input: $input, condition: $condition) {
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
export const deleteHabitat = /* GraphQL */ `
  mutation DeleteHabitat(
    $input: DeleteHabitatInput!
    $condition: ModelHabitatConditionInput
  ) {
    deleteHabitat(input: $input, condition: $condition) {
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
