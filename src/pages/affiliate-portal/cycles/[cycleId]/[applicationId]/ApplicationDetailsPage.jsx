import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import {
  Flex,
  Button,
  useBreakpointValue,
  Text,
  TextAreaField,
  SelectField,
  Loader,
  View,
  Heading,
  Tabs,
  TabItem,
  useAuthenticator,
} from '@aws-amplify/ui-react';
import {
  useApplicantInfosQuery,
  useRecordsQuery,
  useTestApplicationById,
  useWrittensQuery,
  useMembersQuery,
  useEmploymentInfosQuery,
  useIncomesQuery,
  useDebtsQuery,
  useAssetsQuery,
  useChecklistsQuery,
  useApplicantOptionalsQuery,
  usePropertiesQuery,
  useNotesQuery,
} from 'hooks/services';
import {
  getDebtToIncomeRatio,
  getTestTotalDebts,
  getTestTotalMonthlyDebts,
  getTestTotalMonthlyIncomes,
  getTotalAssetsValue,
} from 'utils/applicationMetrics';
import { useEffect, useState } from 'react';
import Modal from 'components/Modal';
import { API, DataStore } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TestApplication,
  SubmissionStatus,
  ApplicationTypes,
  Note,
} from 'models';
import ApplicantInfoTable from './components/ApplicantInfoTable';
import GeneralInfoTable from './components/GeneralInfoTable';
import ChecklistTable from './components/ChecklistTable';
import WrittenTable from './components/WrittenTable';
import RecordsTable from './components/RecordsTable';
import EmploymentTable from './components/EmploymentTable';
import ApplicationMetricsTable from './components/ApplicationMetricsTable';
import HouseholdTable from './components/HouseholdTable';
import FinancialSection from './components/FinancialSection';
import { decideSchema, returnSchema } from './ApplicationDetailsPage.schema';
import ApplicantOptionalTable from './components/ApplicantOptionalTable';
import PaperApplicationTable from './components/PaperApplicationTable';
import PropertyTable from './components/PropertyTable';
import NoteModal from './components/NoteModal';
import NotePreview from './components/NotePreview';

const ApplicationDetailsPage = () => {
  const [userEmail, setUserEmail] = useState();
  const [trigger, setTrigger] = useState(true);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [decideModalOpen, setDecideModalOpen] = useState(false);
  const [loading, setLoading] = useState(0);
  const [noteModal, setNoteModal] = useState(false);
  const { habitat } = useOutletContext();
  const { user } = useAuthenticator((context) => [context.user]);

  const shouldRenderProperty = habitat?.props.optionalSections.propertyInfo;

  const shouldRenderBusinessOwnerOrSelfEmployed =
    habitat?.props.optionalSections.businessOwnerOrSelfEmployed;

  const shouldRenderCoApplicant = habitat?.props.optionalSections.coApplicant;

  const shouldRenderTypeOfOwnership =
    habitat?.props.optionalSections.typeOfOwnership;

  const { applicationId } = useParams();
  const { data: application } = useTestApplicationById({
    id: applicationId,
    dependencyArray: [trigger],
  });
  const queriesProps2 = {
    criteria: (c1) => c1.ownerID.eq(application?.id),
    dependencyArray: [application?.id],
  };

  const { data: applicantInfos } = useApplicantInfosQuery(queriesProps2);
  const { data: applicantOptionals } =
    useApplicantOptionalsQuery(queriesProps2);
  const { data: checklists } = useChecklistsQuery(queriesProps2);
  const { data: writtens } = useWrittensQuery(queriesProps2);
  const { data: records } = useRecordsQuery(queriesProps2);
  const { data: members } = useMembersQuery({
    criteria: (c1) => c1.testapplicationID.eq(application?.id),
    dependencyArray: [application?.id],
  });
  const { data: coApplicantMember } = useMembersQuery({
    criteria: (c1) => c1.testapplicationID.eq(application?.id),
    dependencyArray: [application?.id],
  });
  const { data: employmentInfos } = useEmploymentInfosQuery(queriesProps2);
  const { data: properties } = usePropertiesQuery(queriesProps2);
  const queriesProps1 = {
    criteria: (c1) => {
      const membersIdArray = members.map((member) => member.id);

      const applicantAndMembersIdArray = [
        applicantInfos[0].id,
        ...membersIdArray,
      ];

      return c1.or((c2) => {
        const arrayOfFilters = applicantAndMembersIdArray.map((id) =>
          c2.ownerId.eq(id)
        );

        return arrayOfFilters;
      });
    },
    dependencyArray: [application?.id, applicantInfos, members],
  };
  const { data: incomes } = useIncomesQuery(queriesProps1);
  const { data: debts } = useDebtsQuery(queriesProps1);
  const { data: assets } = useAssetsQuery(queriesProps1);
  const { data: notes } = useNotesQuery({
    criteria: (c) => c.testapplicationID.eq(applicationId),
    dependencyArray: [applicationId],
  });
  const totalAssetsValue = getTotalAssetsValue(assets);
  const totalMonthlyIncomes = getTestTotalMonthlyIncomes(incomes);
  const totalMonthlyDebts = getTestTotalMonthlyDebts(debts);
  const totalDebts = getTestTotalDebts(debts);
  const debtToIncomeRatio = getDebtToIncomeRatio(
    totalMonthlyDebts,
    totalMonthlyIncomes
  );
  const navigate = useNavigate();

  const {
    register: registerReturn,
    handleSubmit: handleSubmitReturn,
    reset: resetReturn,
    formState: { errors: errorsReturn },
  } = useForm({
    resolver: zodResolver(returnSchema),
  });

  const {
    register: registerDecide,
    handleSubmit: handleSubmitDecide,
    reset: resetDecide,
    formState: { errors: errorsDecide },
  } = useForm({
    resolver: zodResolver(decideSchema),
  });

  const sizeRenderer = useBreakpointValue({
    base: true,
    large: false,
  });

  const handleReturnOnClick = () => setReturnModalOpen(true);

  const handleReturnModalOnClose = () =>
    loading === 0 && setReturnModalOpen(false);

  const handleOnValidReturn = async (data) => {
    setLoading((previousLoading) => previousLoading + 1);
    try {
      const original = await DataStore.query(TestApplication, application.id);
      const persistedApplication = await DataStore.save(
        TestApplication.copyOf(original, (originalApplication) => {
          originalApplication.submissionStatus = SubmissionStatus.RETURNED;
        })
      );

      await API.post('sendEmailToApplicantAPI', '/notify', {
        body: {
          subject: 'Status update on your Habitat for Humanity application',
          body: data.message,
          sub: persistedApplication.ownerID,
          habitat: habitat.name,
        },
      });

      setReturnModalOpen(false);
      setTrigger((previousTrigger) => !previousTrigger);
      resetReturn();
      navigate('..');
    } catch (error) {
      console.log('An error ocurred while returning the application');
    }
    setLoading((previousLoading) => previousLoading - 1);
  };

  const handleDecideOnClick = () => setDecideModalOpen(true);

  const handleDecideModalOnClose = () =>
    loading === 0 && setDecideModalOpen(false);

  const handleOnValidDecide = async (data) => {
    setLoading((previousLoading) => previousLoading + 1);
    try {
      const original = await DataStore.query(TestApplication, application.id);
      const persistedApplication = await DataStore.save(
        TestApplication.copyOf(original, (originalApplication) => {
          originalApplication.reviewStatus = data.status;
        })
      );

      await API.post('sendEmailToApplicantAPI', '/notify', {
        body: {
          subject: 'Status update on your Habitat for Humanity application',
          body: data.message,
          sub: persistedApplication.ownerID,
          habitat: habitat.name,
        },
      });

      setDecideModalOpen(false);
      setTrigger((previousTrigger) => !previousTrigger);
      resetDecide();
      navigate('..');
    } catch (error) {
      console.log('An error ocurred while returning the application');
    }
    setLoading((previousLoading) => previousLoading - 1);
  };

  const handleNoteOpenClose = () => {
    setNoteModal((prevNoteModal) => !prevNoteModal);
  };

  const handleOnSaveNote = async (editorState) => {
    try {
      const serializedEditorState = JSON.stringify(editorState);

      console.log(editorState);
      const newNote = new Note({
        ownerID: user.username,
        serializedEditorState,
        testapplicationID: applicationId,
      });

      await DataStore.save(newNote);

      handleNoteOpenClose();
    } catch (error) {
      console.log('Error saving note', error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      if (application) {
        try {
          const response = await API.get('userAPI', '/email', {
            queryStringParameters: {
              sub: application.ownerID,
            },
          });

          setUserEmail(response.email);
        } catch (error) {
          console.log('Error while retrieving applicant email.');
        }
      }
    };

    if (application?.ownerID) {
      getUser();
    }
  }, [application]);

  return (
    <Flex width="auto" direction="column" gap="2.5rem">
      <Button
        width="fit-content"
        onClick={() => {
          navigate('../');
        }}
      >
        Go back
      </Button>

      <Tabs>
        <TabItem title="Application">
          <View marginTop="1rem">
            <Heading level={1} fontWeight="medium">
              {application?.type === ApplicationTypes.ONLINE
                ? applicantInfos[0]?.props.basicInfo.fullName
                : application?.props.name}
            </Heading>
            <Heading level={1} fontWeight="medium">
              Application
            </Heading>
          </View>

          <GeneralInfoTable
            reviewStatus={application?.reviewStatus}
            submissionStatus={application?.submissionStatus}
            submittedDate={application?.submittedDate}
          />

          {application?.type === ApplicationTypes.PAPER ? (
            <PaperApplicationTable application={application} />
          ) : (
            <>
              <ApplicantInfoTable
                applicantInfo={applicantInfos[0]}
                email={userEmail}
                shouldRenderCoApplicant={shouldRenderCoApplicant}
                shouldRenderTypeOfOwnership={shouldRenderTypeOfOwnership}
                coApplicantMember={coApplicantMember[0]}
              />

              <ApplicantOptionalTable
                applicantOptional={applicantOptionals[0]}
                applicantInfo={applicantInfos[0]}
                shouldRenderCoApplicant={shouldRenderCoApplicant}
              />

              <ChecklistTable
                questions={habitat?.props.homeownershipCheckQuestions}
                answers={checklists[0]?.props || {}}
              />

              <WrittenTable
                questions={habitat?.props.homeownershipWrittenQuestions}
                answers={writtens[0]?.props || {}}
              />

              <RecordsTable
                questions={habitat?.props.homeownershipRecordQuestions}
                answers={records[0]?.props || {}}
              />

              <HouseholdTable members={members} />

              <EmploymentTable
                employmentInfo={employmentInfos[0]}
                applicantInfo={applicantInfos[0]}
                shouldRenderBusinessOwnerOrSelfEmployed={
                  shouldRenderBusinessOwnerOrSelfEmployed
                }
                shouldRenderCoApplicant={shouldRenderCoApplicant}
              />

              {shouldRenderProperty && (
                <PropertyTable property={properties[0]} />
              )}

              <FinancialSection
                applicantInfo={applicantInfos[0]}
                members={members}
                incomes={incomes}
                debts={debts}
                assets={assets}
                sizeRenderer={sizeRenderer}
              />

              <ApplicationMetricsTable
                totalMonthlyIncomes={totalMonthlyIncomes}
                totalAssets={totalAssetsValue}
                totalMonthlyDebts={totalMonthlyDebts}
                totalDebts={totalDebts}
                debtToIncomeRatio={debtToIncomeRatio}
              />
              <Modal
                title="Return"
                open={returnModalOpen}
                onClickClose={handleReturnModalOnClose}
                width="30rem"
              >
                <form onSubmit={handleSubmitReturn(handleOnValidReturn)}>
                  <Text>
                    By returning an application you are giving an applicant the
                    chance to edit their info.
                  </Text>
                  <br />
                  <TextAreaField
                    {...registerReturn('message')}
                    label="Return message"
                    descriptiveText="We will email this to the user"
                    placeholder="We are returning your application because you lack correct financial records. For inquiries, email support@test-habitat.com"
                    rows={3}
                    hasError={errorsReturn?.message}
                    errorMessage="Invalid message"
                  />
                  {loading > 0 && (
                    <View>
                      <Text>
                        Updating application and sending email to applicant.
                      </Text>
                      <Loader variation="linear" />
                    </View>
                  )}
                  <Flex justifyContent="end" marginTop="1rem">
                    <Button
                      variation="destructive"
                      onClick={handleReturnModalOnClose}
                      isDisabled={loading > 0}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" isDisabled={loading > 0}>
                      Return
                    </Button>
                  </Flex>
                </form>
              </Modal>
              <Modal
                title="Decide"
                open={decideModalOpen}
                onClickClose={handleDecideModalOnClose}
                width="30rem"
              >
                <form onSubmit={handleSubmitDecide(handleOnValidDecide)}>
                  <Text>
                    Here is where you can render a decision for an application.
                  </Text>
                  <br />
                  <SelectField
                    {...registerDecide('status')}
                    label="Status"
                    hasError={errorsDecide?.status}
                    errorMessage="Invalid status"
                  >
                    <option value="Pending">Pending</option>
                    {(habitat?.props.customStatus
                      ? habitat.props.customStatus
                      : []
                    ).map((customStatusItem) => (
                      <option key={customStatusItem} value={customStatusItem}>
                        {customStatusItem}
                      </option>
                    ))}
                  </SelectField>
                  <br />
                  <TextAreaField
                    {...registerDecide('message')}
                    label="Decision message"
                    descriptiveText="We will email this to the user"
                    placeholder="Congratulations! We have decided to accept your application for our Homeownership Program. We will send further information via email."
                    rows={3}
                    hasError={errorsDecide?.message}
                    errorMessage="Invalid message"
                  />
                  {loading > 0 && (
                    <View>
                      <Text>
                        Updating application and sending email to applicant.
                      </Text>
                      <Loader variation="linear" />
                    </View>
                  )}
                  <Flex justifyContent="end" marginTop="1rem">
                    <Button
                      variation="destructive"
                      onClick={handleDecideModalOnClose}
                      isDisabled={loading > 0}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" isDisabled={loading > 0}>
                      Send
                    </Button>
                  </Flex>
                </form>
              </Modal>
              {application?.submissionStatus === SubmissionStatus.SUBMITTED && (
                <Flex justifyContent="end">
                  <Button onClick={handleReturnOnClick}>Return</Button>
                  <Button variation="primary" onClick={handleDecideOnClick}>
                    Decide
                  </Button>
                </Flex>
              )}
            </>
          )}
        </TabItem>
        <TabItem title="Notes">
          <Flex justifyContent="end" marginTop="1rem">
            <NoteModal
              open={noteModal}
              onClose={handleNoteOpenClose}
              onSave={handleOnSaveNote}
            />
            <Button variation="primary" onClick={handleNoteOpenClose}>
              Create Note
            </Button>
          </Flex>
          <Flex marginTop="1rem" direction="column">
            {notes.map((note) => (
              <NotePreview
                key={note.id}
                ownerID={note.ownerID}
                createdAt={note.createdAt}
              />
            ))}
          </Flex>
        </TabItem>
      </Tabs>
    </Flex>
  );
};

export default ApplicationDetailsPage;
