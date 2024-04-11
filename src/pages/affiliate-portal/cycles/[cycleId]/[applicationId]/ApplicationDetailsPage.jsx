import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import {
  Flex,
  Button,
  useBreakpointValue,
  Text,
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
import { API, DataStore, Storage } from 'aws-amplify';
import {
  TestApplication,
  SubmissionStatus,
  ApplicationTypes,
  Note,
  Decision,
} from 'models';
import { ImageNode } from 'components/LexicalEditor/nodes/ImageNode';
import { removeFiles } from 'utils/files';
import { FileNode } from 'components/LexicalEditor/nodes/FileNode';
import { v4 } from 'uuid';
import { getEditorStateWithFilesInBucket } from 'utils/lexicalEditor';
import ApplicantInfoTable from './components/ApplicantInfoTable';
import GeneralInfoTable from './components/GeneralInfoTable';
import ChecklistTable from './components/ChecklistTable';
import WrittenTable from './components/WrittenTable';
import RecordsTable from './components/RecordsTable';
import EmploymentTable from './components/EmploymentTable';
import ApplicationMetricsTable from './components/ApplicationMetricsTable';
import HouseholdTable from './components/HouseholdTable';
import FinancialSection from './components/FinancialSection';
import ApplicantOptionalTable from './components/ApplicantOptionalTable';
import PaperApplicationTable from './components/PaperApplicationTable';
import PropertyTable from './components/PropertyTable';
import NoteModal from './components/NoteModal';
import NotePreview from './components/NotePreview';
import ReturnModal from './components/ReturnModal';
import DecideModal from './components/DecideModal';

const ApplicationDetailsPage = () => {
  const [userEmail, setUserEmail] = useState();
  const [trigger, setTrigger] = useState(true);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [decideModalOpen, setDecideModalOpen] = useState(false);
  const [loading, setLoading] = useState(0);
  const [noteModal, setNoteModal] = useState(false);
  const [uploadingNote, setUploadingNote] = useState(false);
  const [deletingNote, setDeletingNote] = useState(false);
  const [triggerNotes, setTriggerNotes] = useState(true);
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
    dependencyArray: [applicationId, triggerNotes],
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

  const sizeRenderer = useBreakpointValue({
    base: true,
    large: false,
  });

  const handleReturnOnClick = () => setReturnModalOpen(true);

  const handleReturnModalOnClose = () =>
    loading === 0 && setReturnModalOpen(false);

  const uploadDecisionFile = async (file) => {
    const result = await Storage.put(
      `decision/${habitat?.urlName}/${application.id}/${v4()}_${file.name}`,
      file,
      {
        level: 'public',
      }
    );

    return result;
  };

  const handleOnValidReturn = async (data) => {
    setLoading((previousLoading) => previousLoading + 1);
    try {
      const original = await DataStore.query(TestApplication, applicationId);

      const persistedApplication = await DataStore.save(
        TestApplication.copyOf(original, (originalApplication) => {
          originalApplication.submissionStatus = SubmissionStatus.RETURNED;
        })
      );

      const editorStateWithFilesInS3 = await getEditorStateWithFilesInBucket(
        data.message,
        uploadDecisionFile
      );

      await DataStore.save(
        new Decision({
          testapplicationID: applicationId,
          status: SubmissionStatus.RETURNED,
          serializedEditorState: JSON.stringify(editorStateWithFilesInS3),
        })
      );

      await API.post('sendEmailToApplicantAPI', '/notify', {
        body: {
          subject: 'Status update on your Habitat for Humanity application',
          body: '<p>A decision has been made on your application. Please log in to your application portal to see this.</p>',
          sub: persistedApplication.ownerID,
          habitat: habitat.name,
        },
      });

      setReturnModalOpen(false);
      setTrigger((previousTrigger) => !previousTrigger);
      navigate('..');
    } catch (error) {
      console.log('An error ocurred while returning the application', error);
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

      const editorStateWithFilesInS3 = await getEditorStateWithFilesInBucket(
        data.message,
        uploadDecisionFile
      );

      await DataStore.save(
        new Decision({
          testapplicationID: applicationId,
          status: data.status,
          serializedEditorState: JSON.stringify(editorStateWithFilesInS3),
        })
      );

      await API.post('sendEmailToApplicantAPI', '/notify', {
        body: {
          subject: 'Status update on your Habitat for Humanity application',
          body: '<p>A decision has been made on your application. Please log in to your application portal to see this.</p>',
          sub: persistedApplication.ownerID,
          habitat: habitat.name,
        },
      });

      setDecideModalOpen(false);
      setTrigger((previousTrigger) => !previousTrigger);
      navigate('..');
    } catch (error) {
      console.log('An error ocurred while returning the application');
    }
    setLoading((previousLoading) => previousLoading - 1);
  };

  const handleNoteOpenClose = () => {
    if (!uploadingNote) {
      setNoteModal((prevNoteModal) => !prevNoteModal);
    }
  };

  const uploadNoteFile = async (file) => {
    const result = await Storage.put(
      `notes/${habitat?.urlName}/${application.id}/${v4()}_${file.name}`,
      file,
      {
        level: 'public',
      }
    );

    return result;
  };

  const handleOnSaveNote = async (editorState) => {
    try {
      setUploadingNote(true);
      const editorStateWithS3Keys = await getEditorStateWithFilesInBucket(
        editorState,
        uploadNoteFile
      );
      const serializedEditorState = JSON.stringify(editorStateWithS3Keys);

      const newNote = new Note({
        ownerID: user.username,
        serializedEditorState,
        testapplicationID: applicationId,
      });

      await DataStore.save(newNote);

      handleNoteOpenClose();
    } catch (error) {
      console.log('Error saving note', error);
    } finally {
      setTriggerNotes((prevTrigger) => !prevTrigger);
      setUploadingNote(false);
    }
  };

  const deleteFilesOfNote = async (note) => {
    const editorState = JSON.parse(note.serializedEditorState);
    const s3Keys = [];
    for (const children of editorState.root.children) {
      if (
        children.type === FileNode.getType() ||
        (children.type === ImageNode.getType() && children.s3Key)
      ) {
        s3Keys.push(children.s3Key);
      }
    }
    await removeFiles(s3Keys);
  };

  const handleDeleteNote = async (note) => {
    try {
      setDeletingNote(true);
      await deleteFilesOfNote(note);
      await DataStore.delete(Note, note.id);
    } catch (error) {
      console.log('Error deleting note');
    } finally {
      setDeletingNote(false);
      setTriggerNotes((prevTrigger) => !prevTrigger);
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
              <ReturnModal
                open={returnModalOpen}
                onClose={handleReturnModalOnClose}
                onValidReturn={handleOnValidReturn}
                loading={loading}
              />
              <DecideModal
                open={decideModalOpen}
                onClose={handleDecideModalOnClose}
                onValid={handleOnValidDecide}
                loading={loading}
                customStatus={habitat?.props.customStatus}
              />
              {application?.submissionStatus === SubmissionStatus.SUBMITTED && (
                <>
                  <br />
                  <Flex justifyContent="end">
                    <Button onClick={handleReturnOnClick}>Return</Button>
                    <Button variation="primary" onClick={handleDecideOnClick}>
                      Decide
                    </Button>
                  </Flex>
                </>
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
              uploading={uploadingNote}
            />
            <Button variation="primary" onClick={handleNoteOpenClose}>
              Create Note
            </Button>
          </Flex>
          <Flex marginTop="1rem" direction="column">
            {notes.length > 0 ? (
              notes.map((note) => (
                <NotePreview
                  key={note.id}
                  ownerID={note.ownerID}
                  createdAt={note.createdAt}
                  serializedEditorState={note.serializedEditorState}
                  onDelete={() => handleDeleteNote(note)}
                  deleting={deletingNote}
                />
              ))
            ) : (
              <Text textAlign="center" fontWeight="bold">
                There are no notes for this application
              </Text>
            )}
          </Flex>
        </TabItem>
      </Tabs>
    </Flex>
  );
};

export default ApplicationDetailsPage;
