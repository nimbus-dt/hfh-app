/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getApplicantOptional = /* GraphQL */ `
  query GetApplicantOptional($id: ID!) {
    getApplicantOptional(id: $id) {
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
export const listApplicantOptionals = /* GraphQL */ `
  query ListApplicantOptionals(
    $filter: ModelApplicantOptionalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApplicantOptionals(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncApplicantOptionals = /* GraphQL */ `
  query SyncApplicantOptionals(
    $filter: ModelApplicantOptionalFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncApplicantOptionals(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getAsset = /* GraphQL */ `
  query GetAsset($id: ID!) {
    getAsset(id: $id) {
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
export const listAssets = /* GraphQL */ `
  query ListAssets(
    $filter: ModelAssetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAssets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncAssets = /* GraphQL */ `
  query SyncAssets(
    $filter: ModelAssetFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAssets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getDebt = /* GraphQL */ `
  query GetDebt($id: ID!) {
    getDebt(id: $id) {
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
export const listDebts = /* GraphQL */ `
  query ListDebts(
    $filter: ModelDebtFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDebts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncDebts = /* GraphQL */ `
  query SyncDebts(
    $filter: ModelDebtFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDebts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getIncome = /* GraphQL */ `
  query GetIncome($id: ID!) {
    getIncome(id: $id) {
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
export const listIncomes = /* GraphQL */ `
  query ListIncomes(
    $filter: ModelIncomeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIncomes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncIncomes = /* GraphQL */ `
  query SyncIncomes(
    $filter: ModelIncomeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncIncomes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getTestApplication = /* GraphQL */ `
  query GetTestApplication($id: ID!) {
    getTestApplication(id: $id) {
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
export const listTestApplications = /* GraphQL */ `
  query ListTestApplications(
    $filter: ModelTestApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTestApplications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        ownerID
        lastSection
        submittedDate
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncTestApplications = /* GraphQL */ `
  query SyncTestApplications(
    $filter: ModelTestApplicationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTestApplications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        ownerID
        lastSection
        submittedDate
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getEmploymentInfo = /* GraphQL */ `
  query GetEmploymentInfo($id: ID!) {
    getEmploymentInfo(id: $id) {
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
export const listEmploymentInfos = /* GraphQL */ `
  query ListEmploymentInfos(
    $filter: ModelEmploymentInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmploymentInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncEmploymentInfos = /* GraphQL */ `
  query SyncEmploymentInfos(
    $filter: ModelEmploymentInfoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEmploymentInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getMember = /* GraphQL */ `
  query GetMember($id: ID!) {
    getMember(id: $id) {
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
export const listMembers = /* GraphQL */ `
  query ListMembers(
    $filter: ModelMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncMembers = /* GraphQL */ `
  query SyncMembers(
    $filter: ModelMemberFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMembers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const membersByTestapplicationID = /* GraphQL */ `
  query MembersByTestapplicationID(
    $testapplicationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    membersByTestapplicationID(
      testapplicationID: $testapplicationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getRecord = /* GraphQL */ `
  query GetRecord($id: ID!) {
    getRecord(id: $id) {
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
export const listRecords = /* GraphQL */ `
  query ListRecords(
    $filter: ModelRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncRecords = /* GraphQL */ `
  query SyncRecords(
    $filter: ModelRecordFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRecords(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getWritten = /* GraphQL */ `
  query GetWritten($id: ID!) {
    getWritten(id: $id) {
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
export const listWrittens = /* GraphQL */ `
  query ListWrittens(
    $filter: ModelWrittenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWrittens(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncWrittens = /* GraphQL */ `
  query SyncWrittens(
    $filter: ModelWrittenFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWrittens(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getChecklist = /* GraphQL */ `
  query GetChecklist($id: ID!) {
    getChecklist(id: $id) {
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
export const listChecklists = /* GraphQL */ `
  query ListChecklists(
    $filter: ModelChecklistFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChecklists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncChecklists = /* GraphQL */ `
  query SyncChecklists(
    $filter: ModelChecklistFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncChecklists(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getApplicantInfo = /* GraphQL */ `
  query GetApplicantInfo($id: ID!) {
    getApplicantInfo(id: $id) {
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
export const listApplicantInfos = /* GraphQL */ `
  query ListApplicantInfos(
    $filter: ModelApplicantInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApplicantInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncApplicantInfos = /* GraphQL */ `
  query SyncApplicantInfos(
    $filter: ModelApplicantInfoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncApplicantInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getCycles = /* GraphQL */ `
  query GetCycles($id: ID!) {
    getCycles(id: $id) {
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
export const listCycles = /* GraphQL */ `
  query ListCycles(
    $filter: ModelCyclesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCycles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cycleStartDate
        cycleEndDate
        cycleStatus
        habitatID
        cycleSeason
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncCycles = /* GraphQL */ `
  query SyncCycles(
    $filter: ModelCyclesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCycles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        cycleStartDate
        cycleEndDate
        cycleStatus
        habitatID
        cycleSeason
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const cyclesByHabitatID = /* GraphQL */ `
  query CyclesByHabitatID(
    $habitatID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCyclesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    cyclesByHabitatID(
      habitatID: $habitatID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        cycleStartDate
        cycleEndDate
        cycleStatus
        habitatID
        cycleSeason
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getContactForm = /* GraphQL */ `
  query GetContactForm($id: ID!) {
    getContactForm(id: $id) {
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
export const listContactForms = /* GraphQL */ `
  query ListContactForms(
    $filter: ModelContactFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContactForms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncContactForms = /* GraphQL */ `
  query SyncContactForms(
    $filter: ModelContactFormFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncContactForms(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getUserProps = /* GraphQL */ `
  query GetUserProps($id: ID!) {
    getUserProps(id: $id) {
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
export const listUserProps = /* GraphQL */ `
  query ListUserProps(
    $filter: ModelUserPropsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUserProps = /* GraphQL */ `
  query SyncUserProps(
    $filter: ModelUserPropsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserProps(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getDebtRecord = /* GraphQL */ `
  query GetDebtRecord($id: ID!) {
    getDebtRecord(id: $id) {
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
export const listDebtRecords = /* GraphQL */ `
  query ListDebtRecords(
    $filter: ModelDebtRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDebtRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncDebtRecords = /* GraphQL */ `
  query SyncDebtRecords(
    $filter: ModelDebtRecordFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDebtRecords(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const debtRecordsByApplicationID = /* GraphQL */ `
  query DebtRecordsByApplicationID(
    $applicationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDebtRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    debtRecordsByApplicationID(
      applicationID: $applicationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getSavingRecord = /* GraphQL */ `
  query GetSavingRecord($id: ID!) {
    getSavingRecord(id: $id) {
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
export const listSavingRecords = /* GraphQL */ `
  query ListSavingRecords(
    $filter: ModelSavingRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSavingRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncSavingRecords = /* GraphQL */ `
  query SyncSavingRecords(
    $filter: ModelSavingRecordFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSavingRecords(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const savingRecordsByApplicationID = /* GraphQL */ `
  query SavingRecordsByApplicationID(
    $applicationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSavingRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    savingRecordsByApplicationID(
      applicationID: $applicationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getIncomeRecord = /* GraphQL */ `
  query GetIncomeRecord($id: ID!) {
    getIncomeRecord(id: $id) {
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
export const listIncomeRecords = /* GraphQL */ `
  query ListIncomeRecords(
    $filter: ModelIncomeRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIncomeRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncIncomeRecords = /* GraphQL */ `
  query SyncIncomeRecords(
    $filter: ModelIncomeRecordFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncIncomeRecords(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const incomeRecordsByApplicationID = /* GraphQL */ `
  query IncomeRecordsByApplicationID(
    $applicationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelIncomeRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    incomeRecordsByApplicationID(
      applicationID: $applicationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getHouseholdMember = /* GraphQL */ `
  query GetHouseholdMember($id: ID!) {
    getHouseholdMember(id: $id) {
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
export const listHouseholdMembers = /* GraphQL */ `
  query ListHouseholdMembers(
    $filter: ModelHouseholdMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHouseholdMembers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncHouseholdMembers = /* GraphQL */ `
  query SyncHouseholdMembers(
    $filter: ModelHouseholdMemberFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncHouseholdMembers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const householdMembersByApplicationID = /* GraphQL */ `
  query HouseholdMembersByApplicationID(
    $applicationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelHouseholdMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    householdMembersByApplicationID(
      applicationID: $applicationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getApplication = /* GraphQL */ `
  query GetApplication($id: ID!) {
    getApplication(id: $id) {
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
export const listApplications = /* GraphQL */ `
  query ListApplications(
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApplications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ownerID
        habitatID
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncApplications = /* GraphQL */ `
  query SyncApplications(
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncApplications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        ownerID
        habitatID
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const applicationsByHabitatID = /* GraphQL */ `
  query ApplicationsByHabitatID(
    $habitatID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    applicationsByHabitatID(
      habitatID: $habitatID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        ownerID
        habitatID
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const applicationsByCyclesID = /* GraphQL */ `
  query ApplicationsByCyclesID(
    $cyclesID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    applicationsByCyclesID(
      cyclesID: $cyclesID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        ownerID
        habitatID
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getHabitat = /* GraphQL */ `
  query GetHabitat($id: ID!) {
    getHabitat(id: $id) {
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
export const listHabitats = /* GraphQL */ `
  query ListHabitats(
    $filter: ModelHabitatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHabitats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncHabitats = /* GraphQL */ `
  query SyncHabitats(
    $filter: ModelHabitatFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncHabitats(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
