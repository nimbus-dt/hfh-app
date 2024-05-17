import React, { useState } from 'react';
import BreadCrumbs from 'components/BreadCrumbs/BreadCrumbs';
import IconButton from 'components/IconButton';
import {
  MdOutlineArrowBack,
  MdOutlineCalculate,
  MdOutlineLibraryAddCheck,
  MdOutlineNoteAlt,
  MdOutlineTextSnippet,
} from 'react-icons/md';
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import {
  useDecisionsQuery,
  useFormAnswersQuery,
  useNotesQuery,
  useTestApplicationById,
  useTestCycleById,
} from 'hooks/services';
import { set } from 'lodash';
import {
  Decision,
  FormAnswer,
  LazyFormAnswer,
  LazyNote,
  Note,
  TestApplication,
  TestCycle,
  SubmissionStatus,
  ReviewStatus,
  Habitat,
  LazyDecision,
} from 'models';
import { DataStore, RecursiveModelPredicate } from '@aws-amplify/datastore';
import { getEditorStateWithFilesInBucket } from 'utils/lexicalEditor';
import { API, Storage } from 'aws-amplify';
import { v4 } from 'uuid';
import { FileNode } from 'components/LexicalEditor/nodes/FileNode';
import { ImageNode } from 'components/LexicalEditor/nodes/ImageNode';
import { removeFiles } from 'utils/files';
import { EditorState } from 'lexical';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Loading from 'components/Loading';
import style from './AffiliateApplicationDetailsPage.module.css';
import LocalNavigation from './components/LocalNavigation';
import ApplicationTab from './components/ApplicationTab';
import NotesTab from './components/NotesTab';
import DecisionsTab from './components/DecisionsTab';
import CalculationsTab from './components/Calculations';
import {
  TDecideSchema,
  TReturnSchema,
} from './AffiliateApplicationDetailsPage.schema';
import Buttons from './components/Buttons';

const AffiliateApplicationDetailsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [triggerApplication, setTriggerApplication] = useState(false);
  const [triggerNotes, setTriggerNotes] = useState(false);
  const [loading, setLoading] = useState(0);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [decideModalOpen, setDecideModalOpen] = useState(false);
  const [noteModal, setNoteModal] = useState(false);
  const [uploadingNote, setUploadingNote] = useState(false);
  const [deletingNote, setDeletingNote] = useState(false);

  const navigate = useNavigate();

  const { applicationId } = useParams();

  const { habitat }: { habitat?: Habitat } = useOutletContext();

  const { user } = useAuthenticator((context) => [context.user]);

  const { data: application }: { data: TestApplication } =
    useTestApplicationById({
      id: applicationId,
      dependencyArray: [triggerApplication],
    });

  const { data: formAnswers }: { data: FormAnswer[] } = useFormAnswersQuery({
    criteria: (c1: RecursiveModelPredicate<LazyFormAnswer>) =>
      c1.testapplicationID.eq(application?.id || ''),
    dependencyArray: [application],
    paginationProducer: undefined,
  });

  const { data: decisions }: { data: Decision[] } = useDecisionsQuery({
    criteria: (c1: RecursiveModelPredicate<LazyDecision>) =>
      c1.testapplicationID.eq(application?.id || ''),
    dependencyArray: [application],
    paginationProducer: undefined,
  });

  const { data: cycle }: { data: TestCycle } = useTestCycleById({
    id: application?.testcycleID || '',
    dependencyArray: [application],
  });

  const { data: notes }: { data: Note[] } = useNotesQuery({
    criteria: (c: RecursiveModelPredicate<LazyNote>) =>
      c.testapplicationID.eq(applicationId || ''),
    dependencyArray: [applicationId, triggerNotes],
    paginationProducer: undefined,
  });

  const triggerApplicationRefetch = () =>
    setTriggerApplication((prevTriggerApplication) => !prevTriggerApplication);

  const triggerNotesRefetch = () =>
    setTriggerNotes((prevTriggerNotes) => !prevTriggerNotes);

  const uploadDecisionFile = async (file: File) => {
    const result = await Storage.put(
      `decision/${habitat?.urlName}/${application.id}/${v4()}_${file.name}`,
      file,
      {
        level: 'public',
      }
    );

    return result;
  };

  const handleOnValidReturn = async (data: TReturnSchema) => {
    setLoading((previousLoading) => previousLoading + 1);
    try {
      const original = await DataStore.query(
        TestApplication,
        applicationId || ''
      );

      if (!original) {
        return;
      }

      const persistedApplication = await DataStore.save(
        TestApplication.copyOf(original, (originalApplication) => {
          originalApplication.submissionStatus = SubmissionStatus.INCOMPLETE;
          originalApplication.reviewStatus = ReviewStatus.RETURNED;
        })
      );

      const editorStateWithFilesInS3 = await getEditorStateWithFilesInBucket(
        data.message,
        uploadDecisionFile
      );

      await DataStore.save(
        new Decision({
          testapplicationID: applicationId || '',
          status: ReviewStatus.RETURNED,
          serializedEditorState: JSON.stringify(editorStateWithFilesInS3),
        })
      );

      await API.post('sendEmailToApplicantAPI', '/notify', {
        body: {
          subject: 'Status update on your Habitat for Humanity application',
          body: '<p>A decision has been made on your application. Please log in to your application portal to see this.</p>',
          sub: persistedApplication.ownerID,
          habitat: habitat?.name,
        },
      });

      setReturnModalOpen(false);
      triggerApplicationRefetch();
      navigate('..');
    } catch (error) {
      console.log('An error ocurred while returning the application', error);
    }
    setLoading((previousLoading) => previousLoading - 1);
  };

  const handleDecideOnClick = () => setDecideModalOpen(true);

  const handleDecideModalOnClose = () =>
    loading === 0 && setDecideModalOpen(false);

  const handleOnValidDecide = async (data: TDecideSchema) => {
    setLoading((previousLoading) => previousLoading + 1);
    try {
      const original = await DataStore.query(TestApplication, application.id);

      if (!original) {
        return;
      }

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
          testapplicationID: applicationId || '',
          status: data.status,
          serializedEditorState: JSON.stringify(editorStateWithFilesInS3),
        })
      );

      await API.post('sendEmailToApplicantAPI', '/notify', {
        body: {
          subject: 'Status update on your Habitat for Humanity application',
          body: '<p>A decision has been made on your application. Please log in to your application portal to see this.</p>',
          sub: persistedApplication.ownerID,
          habitat: habitat?.name,
        },
      });

      setDecideModalOpen(false);
      triggerApplicationRefetch();
      navigate('..');
    } catch (error) {
      console.log('An error ocurred while returning the application');
    }
    setLoading((previousLoading) => previousLoading - 1);
  };

  const handleReturnModalOnClose = () =>
    loading === 0 && setReturnModalOpen(false);

  const handleNoteOpenClose = () => {
    if (!uploadingNote) {
      setNoteModal((prevNoteModal) => !prevNoteModal);
    }
  };

  const handleReturnOnClick = () => setReturnModalOpen(true);

  const deleteFilesOfNote = async (note: Note) => {
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

  const handleDeleteNote = async (note: Note) => {
    try {
      setDeletingNote(true);
      await deleteFilesOfNote(note);
      await DataStore.delete(Note, note.id);
    } catch (error) {
      console.log('Error deleting note');
    } finally {
      setDeletingNote(false);
      triggerNotesRefetch();
    }
  };

  const uploadNoteFile = async (file: File) => {
    const result = await Storage.put(
      `notes/${habitat?.urlName}/${application.id}/${v4()}_${file.name}`,
      file,
      {
        level: 'public',
      }
    );

    return result;
  };

  const handleOnSaveNote = async (editorState: EditorState) => {
    try {
      if (!user || !user.username) {
        return;
      }

      setUploadingNote(true);
      const editorStateWithS3Keys = await getEditorStateWithFilesInBucket(
        editorState,
        uploadNoteFile
      );
      const serializedEditorState = JSON.stringify(editorStateWithS3Keys);

      const newNote = new Note({
        ownerID: user.username,
        serializedEditorState,
        testapplicationID: applicationId || '',
      });

      await DataStore.save(newNote);

      handleNoteOpenClose();
    } catch (error) {
      console.log('Error saving note', error);
    } finally {
      triggerNotesRefetch();
      setUploadingNote(false);
    }
  };

  if (!cycle) return <Loading />;

  return (
    <div className={`${style.page}`}>
      <BreadCrumbs
        items={[
          { label: 'Active Forms' },
          { label: 'Cycles' },
          { label: 'Applications' },
          { label: 'Detail' },
        ]}
      />
      <div className={`${style.cta}`}>
        <Link to="../">
          <IconButton variation="not-outlined">
            <MdOutlineArrowBack />
          </IconButton>
        </Link>
        <span className={`theme-headline-medium ${style.title}`}>
          Application Details
        </span>
      </div>
      <div className={`${style.detailsContainer}`}>
        <LocalNavigation
          items={[
            { label: 'Applications', icon: <MdOutlineNoteAlt /> },
            { label: 'Notes', icon: <MdOutlineTextSnippet /> },
            { label: 'Decisions', icon: <MdOutlineLibraryAddCheck /> },
            { label: 'Calculations', icon: <MdOutlineCalculate /> },
          ]}
          current={activeTab}
          onChange={(newCurrent) => setActiveTab(newCurrent)}
        />
        <div className={style.tabContainer}>
          <Buttons
            application={application}
            returnModalOpen={returnModalOpen}
            handleReturnModalOnClose={handleReturnModalOnClose}
            handleOnValidReturn={handleOnValidReturn}
            decideModalOpen={decideModalOpen}
            handleDecideModalOnClose={handleDecideModalOnClose}
            handleOnValidDecide={handleOnValidDecide}
            handleReturnOnClick={handleReturnOnClick}
            handleDecideOnClick={handleDecideOnClick}
            loading={loading}
          />
          {activeTab === 0 && (
            <ApplicationTab
              application={application}
              formUrl={cycle?.formUrl}
              formAnswers={formAnswers}
            />
          )}
          {activeTab === 1 && (
            <NotesTab
              notes={notes}
              noteModal={noteModal}
              uploadingNote={uploadingNote}
              deletingNote={deletingNote}
              handleDeleteNote={handleDeleteNote}
              handleNoteOpenClose={handleNoteOpenClose}
              handleOnSaveNote={handleOnSaveNote}
            />
          )}
          {activeTab === 2 && (
            <DecisionsTab decisions={decisions} habitat={habitat} />
          )}
          {activeTab === 3 && <CalculationsTab formAnswers={formAnswers} />}
        </div>
      </div>
    </div>
  );
};

export default AffiliateApplicationDetailsPage;
