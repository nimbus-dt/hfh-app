/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMaintenance = /* GraphQL */ `
  query GetMaintenance($id: ID!) {
    getMaintenance(id: $id) {
      id
      maintenance
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listMaintenances = /* GraphQL */ `
  query ListMaintenances(
    $filter: ModelMaintenanceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMaintenances(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        maintenance
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
export const syncMaintenances = /* GraphQL */ `
  query SyncMaintenances(
    $filter: ModelMaintenanceFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMaintenances(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        maintenance
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
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstName
      lastName
      dateOfBirth
      sex
      phoneNumber
      affiliateProps {
        titleAtHabitat
        roleDescription
        joinDate
        joinMonth
        joinYear
        __typename
      }
      applicantProps {
        state
        city
        street
        householdMembersNumber
        householdAnnualIncome
        currentlyUnemployed
        currentWorkTitle
        nameOfEmployer
        howDidYouHearAbout
        firstTimeApplying
        whatAreYouInterestedIn
        __typename
      }
      type
      owner
      verified
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        dateOfBirth
        sex
        phoneNumber
        type
        owner
        verified
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
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        firstName
        lastName
        dateOfBirth
        sex
        phoneNumber
        type
        owner
        verified
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
export const getRootForm = /* GraphQL */ `
  query GetRootForm($id: ID!) {
    getRootForm(id: $id) {
      id
      name
      status
      description
      files
      Cycles {
        nextToken
        startedAt
        __typename
      }
      habitatID
      formUrls
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listRootForms = /* GraphQL */ `
  query ListRootForms(
    $filter: ModelRootFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRootForms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        status
        description
        files
        habitatID
        formUrls
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
export const syncRootForms = /* GraphQL */ `
  query SyncRootForms(
    $filter: ModelRootFormFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRootForms(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        status
        description
        files
        habitatID
        formUrls
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
export const rootFormsByHabitatID = /* GraphQL */ `
  query RootFormsByHabitatID(
    $habitatID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRootFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    rootFormsByHabitatID(
      habitatID: $habitatID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        status
        description
        files
        habitatID
        formUrls
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
export const getDecision = /* GraphQL */ `
  query GetDecision($id: ID!) {
    getDecision(id: $id) {
      id
      status
      serializedEditorState
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
export const listDecisions = /* GraphQL */ `
  query ListDecisions(
    $filter: ModelDecisionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDecisions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        status
        serializedEditorState
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
export const syncDecisions = /* GraphQL */ `
  query SyncDecisions(
    $filter: ModelDecisionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDecisions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        status
        serializedEditorState
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
export const decisionsByTestapplicationID = /* GraphQL */ `
  query DecisionsByTestapplicationID(
    $testapplicationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDecisionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    decisionsByTestapplicationID(
      testapplicationID: $testapplicationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        serializedEditorState
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
export const getFormAnswer = /* GraphQL */ `
  query GetFormAnswer($id: ID!) {
    getFormAnswer(id: $id) {
      id
      values
      page
      section
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
export const listFormAnswers = /* GraphQL */ `
  query ListFormAnswers(
    $filter: ModelFormAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFormAnswers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        values
        page
        section
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
export const syncFormAnswers = /* GraphQL */ `
  query SyncFormAnswers(
    $filter: ModelFormAnswerFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFormAnswers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        values
        page
        section
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
export const formAnswersByTestapplicationID = /* GraphQL */ `
  query FormAnswersByTestapplicationID(
    $testapplicationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFormAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    formAnswersByTestapplicationID(
      testapplicationID: $testapplicationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        values
        page
        section
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
export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
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
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncNotes = /* GraphQL */ `
  query SyncNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNotes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const notesByTestapplicationID = /* GraphQL */ `
  query NotesByTestapplicationID(
    $testapplicationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notesByTestapplicationID(
      testapplicationID: $testapplicationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getTestCycle = /* GraphQL */ `
  query GetTestCycle($id: ID!) {
    getTestCycle(id: $id) {
      id
      startDate
      endDate
      isOpen
      props
      TestApplications {
        nextToken
        startedAt
        __typename
      }
      rootformID
      name
      closedCycleMessage
      formUrl
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listTestCycles = /* GraphQL */ `
  query ListTestCycles(
    $filter: ModelTestCycleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTestCycles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        startDate
        endDate
        isOpen
        props
        rootformID
        name
        closedCycleMessage
        formUrl
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
export const syncTestCycles = /* GraphQL */ `
  query SyncTestCycles(
    $filter: ModelTestCycleFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTestCycles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        startDate
        endDate
        isOpen
        props
        rootformID
        name
        closedCycleMessage
        formUrl
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
export const testCyclesByRootformID = /* GraphQL */ `
  query TestCyclesByRootformID(
    $rootformID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTestCycleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    testCyclesByRootformID(
      rootformID: $rootformID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        startDate
        endDate
        isOpen
        props
        rootformID
        name
        closedCycleMessage
        formUrl
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
      FormAnswers {
        nextToken
        startedAt
        __typename
      }
      Decisions {
        nextToken
        startedAt
        __typename
      }
      customStatus
      lastPage
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        props
        type
        testcycleID
        customStatus
        lastPage
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
        props
        type
        testcycleID
        customStatus
        lastPage
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
export const testApplicationsByTestcycleID = /* GraphQL */ `
  query TestApplicationsByTestcycleID(
    $testcycleID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTestApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    testApplicationsByTestcycleID(
      testcycleID: $testcycleID
      sortDirection: $sortDirection
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
        props
        type
        testcycleID
        customStatus
        lastPage
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
      longName
      state
      city
      props {
        customStatus
        closedCycleMessages
        __typename
      }
      users
      authenticationHeader
      RootForms {
        nextToken
        startedAt
        __typename
      }
      urlName
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
        longName
        state
        city
        users
        authenticationHeader
        urlName
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
        longName
        state
        city
        users
        authenticationHeader
        urlName
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
