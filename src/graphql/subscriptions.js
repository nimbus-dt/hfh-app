/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMaintenance = /* GraphQL */ `
  subscription OnCreateMaintenance(
    $filter: ModelSubscriptionMaintenanceFilterInput
  ) {
    onCreateMaintenance(filter: $filter) {
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
export const onUpdateMaintenance = /* GraphQL */ `
  subscription OnUpdateMaintenance(
    $filter: ModelSubscriptionMaintenanceFilterInput
  ) {
    onUpdateMaintenance(filter: $filter) {
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
export const onDeleteMaintenance = /* GraphQL */ `
  subscription OnDeleteMaintenance(
    $filter: ModelSubscriptionMaintenanceFilterInput
  ) {
    onDeleteMaintenance(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateRootForm = /* GraphQL */ `
  subscription OnCreateRootForm($filter: ModelSubscriptionRootFormFilterInput) {
    onCreateRootForm(filter: $filter) {
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
export const onUpdateRootForm = /* GraphQL */ `
  subscription OnUpdateRootForm($filter: ModelSubscriptionRootFormFilterInput) {
    onUpdateRootForm(filter: $filter) {
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
export const onDeleteRootForm = /* GraphQL */ `
  subscription OnDeleteRootForm($filter: ModelSubscriptionRootFormFilterInput) {
    onDeleteRootForm(filter: $filter) {
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
export const onCreateDecision = /* GraphQL */ `
  subscription OnCreateDecision($filter: ModelSubscriptionDecisionFilterInput) {
    onCreateDecision(filter: $filter) {
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
export const onUpdateDecision = /* GraphQL */ `
  subscription OnUpdateDecision($filter: ModelSubscriptionDecisionFilterInput) {
    onUpdateDecision(filter: $filter) {
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
export const onDeleteDecision = /* GraphQL */ `
  subscription OnDeleteDecision($filter: ModelSubscriptionDecisionFilterInput) {
    onDeleteDecision(filter: $filter) {
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
export const onCreateFormAnswer = /* GraphQL */ `
  subscription OnCreateFormAnswer(
    $filter: ModelSubscriptionFormAnswerFilterInput
  ) {
    onCreateFormAnswer(filter: $filter) {
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
export const onUpdateFormAnswer = /* GraphQL */ `
  subscription OnUpdateFormAnswer(
    $filter: ModelSubscriptionFormAnswerFilterInput
  ) {
    onUpdateFormAnswer(filter: $filter) {
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
export const onDeleteFormAnswer = /* GraphQL */ `
  subscription OnDeleteFormAnswer(
    $filter: ModelSubscriptionFormAnswerFilterInput
  ) {
    onDeleteFormAnswer(filter: $filter) {
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
export const onCreateTestApplication = /* GraphQL */ `
  subscription OnCreateTestApplication(
    $filter: ModelSubscriptionTestApplicationFilterInput
  ) {
    onCreateTestApplication(filter: $filter) {
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
export const onUpdateTestApplication = /* GraphQL */ `
  subscription OnUpdateTestApplication(
    $filter: ModelSubscriptionTestApplicationFilterInput
  ) {
    onUpdateTestApplication(filter: $filter) {
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
export const onDeleteTestApplication = /* GraphQL */ `
  subscription OnDeleteTestApplication(
    $filter: ModelSubscriptionTestApplicationFilterInput
  ) {
    onDeleteTestApplication(filter: $filter) {
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
export const onCreateHabitat = /* GraphQL */ `
  subscription OnCreateHabitat($filter: ModelSubscriptionHabitatFilterInput) {
    onCreateHabitat(filter: $filter) {
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
export const onUpdateHabitat = /* GraphQL */ `
  subscription OnUpdateHabitat($filter: ModelSubscriptionHabitatFilterInput) {
    onUpdateHabitat(filter: $filter) {
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
export const onDeleteHabitat = /* GraphQL */ `
  subscription OnDeleteHabitat($filter: ModelSubscriptionHabitatFilterInput) {
    onDeleteHabitat(filter: $filter) {
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
