/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const createCycles = /* GraphQL */ `
  mutation CreateCycles(
    $input: CreateCyclesInput!
    $condition: ModelCyclesConditionInput
  ) {
    createCycles(input: $input, condition: $condition) {
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
export const updateCycles = /* GraphQL */ `
  mutation UpdateCycles(
    $input: UpdateCyclesInput!
    $condition: ModelCyclesConditionInput
  ) {
    updateCycles(input: $input, condition: $condition) {
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
export const deleteCycles = /* GraphQL */ `
  mutation DeleteCycles(
    $input: DeleteCyclesInput!
    $condition: ModelCyclesConditionInput
  ) {
    deleteCycles(input: $input, condition: $condition) {
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
export const createContactForm = /* GraphQL */ `
  mutation CreateContactForm(
    $input: CreateContactFormInput!
    $condition: ModelContactFormConditionInput
  ) {
    createContactForm(input: $input, condition: $condition) {
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
export const updateContactForm = /* GraphQL */ `
  mutation UpdateContactForm(
    $input: UpdateContactFormInput!
    $condition: ModelContactFormConditionInput
  ) {
    updateContactForm(input: $input, condition: $condition) {
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
export const deleteContactForm = /* GraphQL */ `
  mutation DeleteContactForm(
    $input: DeleteContactFormInput!
    $condition: ModelContactFormConditionInput
  ) {
    deleteContactForm(input: $input, condition: $condition) {
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
export const createUserProps = /* GraphQL */ `
  mutation CreateUserProps(
    $input: CreateUserPropsInput!
    $condition: ModelUserPropsConditionInput
  ) {
    createUserProps(input: $input, condition: $condition) {
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
export const updateUserProps = /* GraphQL */ `
  mutation UpdateUserProps(
    $input: UpdateUserPropsInput!
    $condition: ModelUserPropsConditionInput
  ) {
    updateUserProps(input: $input, condition: $condition) {
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
export const deleteUserProps = /* GraphQL */ `
  mutation DeleteUserProps(
    $input: DeleteUserPropsInput!
    $condition: ModelUserPropsConditionInput
  ) {
    deleteUserProps(input: $input, condition: $condition) {
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
export const createDebtRecord = /* GraphQL */ `
  mutation CreateDebtRecord(
    $input: CreateDebtRecordInput!
    $condition: ModelDebtRecordConditionInput
  ) {
    createDebtRecord(input: $input, condition: $condition) {
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
export const updateDebtRecord = /* GraphQL */ `
  mutation UpdateDebtRecord(
    $input: UpdateDebtRecordInput!
    $condition: ModelDebtRecordConditionInput
  ) {
    updateDebtRecord(input: $input, condition: $condition) {
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
export const deleteDebtRecord = /* GraphQL */ `
  mutation DeleteDebtRecord(
    $input: DeleteDebtRecordInput!
    $condition: ModelDebtRecordConditionInput
  ) {
    deleteDebtRecord(input: $input, condition: $condition) {
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
export const createSavingRecord = /* GraphQL */ `
  mutation CreateSavingRecord(
    $input: CreateSavingRecordInput!
    $condition: ModelSavingRecordConditionInput
  ) {
    createSavingRecord(input: $input, condition: $condition) {
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
export const updateSavingRecord = /* GraphQL */ `
  mutation UpdateSavingRecord(
    $input: UpdateSavingRecordInput!
    $condition: ModelSavingRecordConditionInput
  ) {
    updateSavingRecord(input: $input, condition: $condition) {
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
export const deleteSavingRecord = /* GraphQL */ `
  mutation DeleteSavingRecord(
    $input: DeleteSavingRecordInput!
    $condition: ModelSavingRecordConditionInput
  ) {
    deleteSavingRecord(input: $input, condition: $condition) {
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
export const createIncomeRecord = /* GraphQL */ `
  mutation CreateIncomeRecord(
    $input: CreateIncomeRecordInput!
    $condition: ModelIncomeRecordConditionInput
  ) {
    createIncomeRecord(input: $input, condition: $condition) {
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
export const updateIncomeRecord = /* GraphQL */ `
  mutation UpdateIncomeRecord(
    $input: UpdateIncomeRecordInput!
    $condition: ModelIncomeRecordConditionInput
  ) {
    updateIncomeRecord(input: $input, condition: $condition) {
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
export const deleteIncomeRecord = /* GraphQL */ `
  mutation DeleteIncomeRecord(
    $input: DeleteIncomeRecordInput!
    $condition: ModelIncomeRecordConditionInput
  ) {
    deleteIncomeRecord(input: $input, condition: $condition) {
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
export const createHouseholdMember = /* GraphQL */ `
  mutation CreateHouseholdMember(
    $input: CreateHouseholdMemberInput!
    $condition: ModelHouseholdMemberConditionInput
  ) {
    createHouseholdMember(input: $input, condition: $condition) {
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
export const updateHouseholdMember = /* GraphQL */ `
  mutation UpdateHouseholdMember(
    $input: UpdateHouseholdMemberInput!
    $condition: ModelHouseholdMemberConditionInput
  ) {
    updateHouseholdMember(input: $input, condition: $condition) {
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
export const deleteHouseholdMember = /* GraphQL */ `
  mutation DeleteHouseholdMember(
    $input: DeleteHouseholdMemberInput!
    $condition: ModelHouseholdMemberConditionInput
  ) {
    deleteHouseholdMember(input: $input, condition: $condition) {
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
export const createApplication = /* GraphQL */ `
  mutation CreateApplication(
    $input: CreateApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    createApplication(input: $input, condition: $condition) {
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
export const updateApplication = /* GraphQL */ `
  mutation UpdateApplication(
    $input: UpdateApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    updateApplication(input: $input, condition: $condition) {
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
export const deleteApplication = /* GraphQL */ `
  mutation DeleteApplication(
    $input: DeleteApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    deleteApplication(input: $input, condition: $condition) {
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
