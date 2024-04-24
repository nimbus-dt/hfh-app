import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import {
  Flex,
  Button,
  Tabs,
  TabItem,
  useAuthenticator,
} from '@aws-amplify/ui-react';
import { useTestApplicationById, useNotesQuery } from 'hooks/services';
import { API, DataStore, Storage } from 'aws-amplify';
import { TestApplication, SubmissionStatus, Note, Decision } from 'models';
import { ImageNode } from 'components/LexicalEditor/nodes/ImageNode';
import { removeFiles } from 'utils/files';
import { FileNode } from 'components/LexicalEditor/nodes/FileNode';
import { v4 } from 'uuid';
import { getEditorStateWithFilesInBucket } from 'utils/lexicalEditor';
import ApplicationTab from './components/ApplicationTab';
import NotesTab from './components/NotesTab';

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
  const { applicationId } = useParams();
  const { habitat } = useOutletContext();
  const { user } = useAuthenticator((context) => [context.user]);

  const { data: application } = useTestApplicationById({
    id: applicationId,
    dependencyArray: [trigger],
  });

  const { data: notes } = useNotesQuery({
    criteria: (c) => c.testapplicationID.eq(applicationId),
    dependencyArray: [applicationId, triggerNotes],
  });

  const navigate = useNavigate();

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
          <ApplicationTab
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
            habitat={habitat}
          />
        </TabItem>
        <TabItem title="Notes">
          <NotesTab
            notes={notes}
            noteModal={noteModal}
            uploadingNote={uploadingNote}
            deletingNote={deletingNote}
            handleDeleteNote={handleDeleteNote}
            handleNoteOpenClose={handleNoteOpenClose}
            handleOnSaveNote={handleOnSaveNote}
          />
        </TabItem>
      </Tabs>
    </Flex>
  );
};

export default ApplicationDetailsPage;
