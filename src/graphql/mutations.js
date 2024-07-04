/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMaintenance = /* GraphQL */ `
  mutation CreateMaintenance(
    $input: CreateMaintenanceInput!
    $condition: ModelMaintenanceConditionInput
  ) {
    createMaintenance(input: $input, condition: $condition) {
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
export const updateMaintenance = /* GraphQL */ `
  mutation UpdateMaintenance(
    $input: UpdateMaintenanceInput!
    $condition: ModelMaintenanceConditionInput
  ) {
    updateMaintenance(input: $input, condition: $condition) {
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
export const deleteMaintenance = /* GraphQL */ `
  mutation DeleteMaintenance(
    $input: DeleteMaintenanceInput!
    $condition: ModelMaintenanceConditionInput
  ) {
    deleteMaintenance(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createRootForm = /* GraphQL */ `
  mutation CreateRootForm(
    $input: CreateRootFormInput!
    $condition: ModelRootFormConditionInput
  ) {
    createRootForm(input: $input, condition: $condition) {
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
export const updateRootForm = /* GraphQL */ `
  mutation UpdateRootForm(
    $input: UpdateRootFormInput!
    $condition: ModelRootFormConditionInput
  ) {
    updateRootForm(input: $input, condition: $condition) {
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
export const deleteRootForm = /* GraphQL */ `
  mutation DeleteRootForm(
    $input: DeleteRootFormInput!
    $condition: ModelRootFormConditionInput
  ) {
    deleteRootForm(input: $input, condition: $condition) {
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
export const createDecision = /* GraphQL */ `
  mutation CreateDecision(
    $input: CreateDecisionInput!
    $condition: ModelDecisionConditionInput
  ) {
    createDecision(input: $input, condition: $condition) {
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
export const updateDecision = /* GraphQL */ `
  mutation UpdateDecision(
    $input: UpdateDecisionInput!
    $condition: ModelDecisionConditionInput
  ) {
    updateDecision(input: $input, condition: $condition) {
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
export const deleteDecision = /* GraphQL */ `
  mutation DeleteDecision(
    $input: DeleteDecisionInput!
    $condition: ModelDecisionConditionInput
  ) {
    deleteDecision(input: $input, condition: $condition) {
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
export const createFormAnswer = /* GraphQL */ `
  mutation CreateFormAnswer(
    $input: CreateFormAnswerInput!
    $condition: ModelFormAnswerConditionInput
  ) {
    createFormAnswer(input: $input, condition: $condition) {
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
export const updateFormAnswer = /* GraphQL */ `
  mutation UpdateFormAnswer(
    $input: UpdateFormAnswerInput!
    $condition: ModelFormAnswerConditionInput
  ) {
    updateFormAnswer(input: $input, condition: $condition) {
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
export const deleteFormAnswer = /* GraphQL */ `
  mutation DeleteFormAnswer(
    $input: DeleteFormAnswerInput!
    $condition: ModelFormAnswerConditionInput
  ) {
    deleteFormAnswer(input: $input, condition: $condition) {
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
export const createTestApplication = /* GraphQL */ `
  mutation CreateTestApplication(
    $input: CreateTestApplicationInput!
    $condition: ModelTestApplicationConditionInput
  ) {
    createTestApplication(input: $input, condition: $condition) {
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
export const updateTestApplication = /* GraphQL */ `
  mutation UpdateTestApplication(
    $input: UpdateTestApplicationInput!
    $condition: ModelTestApplicationConditionInput
  ) {
    updateTestApplication(input: $input, condition: $condition) {
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
export const deleteTestApplication = /* GraphQL */ `
  mutation DeleteTestApplication(
    $input: DeleteTestApplicationInput!
    $condition: ModelTestApplicationConditionInput
  ) {
    deleteTestApplication(input: $input, condition: $condition) {
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
export const createHabitat = /* GraphQL */ `
  mutation CreateHabitat(
    $input: CreateHabitatInput!
    $condition: ModelHabitatConditionInput
  ) {
    createHabitat(input: $input, condition: $condition) {
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
export const updateHabitat = /* GraphQL */ `
  mutation UpdateHabitat(
    $input: UpdateHabitatInput!
    $condition: ModelHabitatConditionInput
  ) {
    updateHabitat(input: $input, condition: $condition) {
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
export const deleteHabitat = /* GraphQL */ `
  mutation DeleteHabitat(
    $input: DeleteHabitatInput!
    $condition: ModelHabitatConditionInput
  ) {
    deleteHabitat(input: $input, condition: $condition) {
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
