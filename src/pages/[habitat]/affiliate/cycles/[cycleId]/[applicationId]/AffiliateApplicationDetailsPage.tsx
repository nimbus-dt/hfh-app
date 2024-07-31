import { useEffect, useState } from 'react';
import BreadCrumbs from 'components/BreadCrumbs/BreadCrumbs';
import {
  MdOutlineCalculate,
  MdOutlineLibraryAddCheck,
  MdOutlineNoteAlt,
  MdOutlineTextSnippet,
} from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDecisionsQuery,
  useFormAnswersQuery,
  useNotesQuery,
  useTestApplicationById,
  useTestCycleById,
} from 'hooks/services';
import {
  Decision,
  FormAnswer,
  LazyFormAnswer,
  LazyNote,
  Note,
  TestApplication,
  TestCycle,
  ReviewStatus,
  LazyDecision,
  ApplicationTypes,
  SubmissionStatus,
  RootForm,
  User,
} from 'models';
import { DataStore, RecursiveModelPredicate } from 'aws-amplify/datastore';
import { getEditorStateWithFilesInBucket } from 'utils/lexicalEditor';
import { uploadData } from 'aws-amplify/storage';
import { get, post } from 'aws-amplify/api';
import { v4 } from 'uuid';
import { FileNode } from 'components/LexicalEditor/nodes/FileNode';
import { ImageNode } from 'components/LexicalEditor/nodes/ImageNode';
import GoBack from 'components/GoBack';
import { removeFiles } from 'utils/files';
import { EditorState } from 'lexical';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Loading from 'components/Loading';
import { usePostHog } from 'posthog-js/react';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import JSZIP from 'jszip';
import { saveAs } from 'file-saver';
import { flattenObject, getValueFromPath } from 'utils/objects';
import useHabitat from 'hooks/utils/useHabitat';
import { useTranslation } from 'react-i18next';
import style from './AffiliateApplicationDetailsPage.module.css';
import LocalNavigation from './components/LocalNavigation';
import ApplicationTab from './components/ApplicationTab';
import NotesTab from './components/NotesTab';
import DecisionsTab from './components/DecisionsTab';
import CalculationsTab from './components/Calculations';
import { TDecideSchema } from './AffiliateApplicationDetailsPage.schema';
import Buttons from './components/Buttons';

const s3client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.REACT_APP_PUBLIC_S3_IDKEY || '',
    secretAccessKey: process.env.REACT_APP_PUBLIC_S3_SECRETKEY || '',
  },
});

const AffiliateApplicationDetailsPage = () => {
  const posthog = usePostHog();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(1);
  const [triggerApplication, setTriggerApplication] = useState(false);
  const [triggerNotes, setTriggerNotes] = useState(false);
  const [loading, setLoading] = useState(0);
  const [decideModalOpen, setDecideModalOpen] = useState(false);
  const [noteModal, setNoteModal] = useState(false);
  const [uploadingNote, setUploadingNote] = useState(false);
  const [deletingNote, setDeletingNote] = useState(false);
  const [downloadingFiles, setDownloadingFiles] = useState(0);

  const navigate = useNavigate();

  const { applicationId } = useParams();

  const { habitat } = useHabitat();

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
    const result = await uploadData({
      path: `public/decision/${habitat?.urlName}/${application.id}/${v4()}_${
        file.name
      }`,
      data: file,
    }).result;

    return result;
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
          if (data.status === ReviewStatus.RETURNED) {
            originalApplication.submissionStatus = SubmissionStatus.INCOMPLETE;
          }
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

      let type = '';

      if (data.status === ReviewStatus.ACCEPTED) {
        type = 'application_accepted';
      } else if (data.status === ReviewStatus.DENIED) {
        type = 'application_denied';
      } else if (data.status === ReviewStatus.RETURNED) {
        type = 'application_returned';
      } else {
        type = 'application_pending';
      }

      posthog?.capture(type, {
        data,
        application,
        habitat,
        cycle,
        posthogAction: 'application_reviewed',
      });

      await post({
        apiName: 'sendEmailToApplicantAPI',
        path: '/notify',
        options: {
          body: {
            subject: 'Status update on your Habitat for Humanity application',
            body: '<p>A decision has been made on your application. Please log in to your application portal to see this.</p>',
            sub: persistedApplication.ownerID || '',
            habitat: habitat?.name || '',
          },
        },
      }).response;

      setDecideModalOpen(false);
      triggerApplicationRefetch();
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
      console.log('Error deleting note', error);
    } finally {
      setDeletingNote(false);
      triggerNotesRefetch();
    }
  };

  const uploadNoteFile = async (file: File) => {
    const result = await uploadData({
      path: `public/notes/${habitat?.urlName}/${application.id}/${v4()}_${
        file.name
      }`,
      data: file,
    }).result;

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

  const handleDownloadApplication = async () => {
    try {
      setDownloadingFiles((prevDownloadingFiles) => prevDownloadingFiles + 1);

      const zip = new JSZIP();

      const pdfBase64Response = await get({
        apiName: 'habitat',
        path: `/application-pdf`,
        options: {
          headers: {
            Accept: 'application/pdf',
          },
          queryParams: {
            applicationId: application.id,
            language: 'en',
          },
        },
      }).response;

      const pdfBlob = await pdfBase64Response.body.blob();

      zip.file('Application.pdf', pdfBlob);

      for (const formAnswer of formAnswers) {
        const { values } = formAnswer;

        const flatValues = flattenObject(values);

        const fileValuesPath = flatValues.filter((flatValue) =>
          flatValue.path.endsWith('.originalName')
        );

        if (fileValuesPath.length > 0 && values) {
          for (const fileValuePath of fileValuesPath) {
            const path = fileValuePath.path.replace('.originalName', '');

            const fileValue = getValueFromPath(
              values as unknown as object,
              path
            );

            const { key, bucket } = fileValue as {
              key: string;
              bucket: string;
            };

            const s3Name = key.split('/').at(-1);

            const command = new GetObjectCommand({
              Bucket: bucket,
              Key: key,
            });

            const response = await s3client.send(command);

            const byteArr = await response.Body?.transformToByteArray();

            if (!byteArr) {
              return;
            }

            zip.file(`files/${s3Name}`, byteArr);
          }
        }
      }

      const rootForm = await DataStore.query(RootForm, cycle?.rootformID);

      const userData = await DataStore.query(User, (c) =>
        c.owner.eq(application?.ownerID || '')
      );

      zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(
          content,
          `${rootForm?.name}-${cycle?.name}-${userData[0].firstName} ${userData[0].lastName}.zip`
        );
      });
    } catch (error) {
      console.log('Error downloading files', error);
    } finally {
      setDownloadingFiles((prevDownloadingFiles) => prevDownloadingFiles - 1);
    }
  };

  useEffect(() => {
    if (application && cycle && habitat && posthog) {
      posthog?.capture('application_opened', {
        application,
        habitat,
        cycle,
      });
    }
  }, [application, cycle, habitat, posthog]);

  if (!cycle) return <Loading />;

  const breadCrumbsItems = [
    { label: t('pages.habitat.affiliate.forms.name'), to: '../../../forms' },
    { label: t('pages.habitat.affiliate.cycles.name'), to: '../..' },
    { label: t('pages.habitat.affiliate.cycles.cycle.name'), to: '..' },
    { label: t('pages.habitat.affiliate.cycles.cycle.application.name') },
  ];

  return (
    <div className={`${style.page}`}>
      <BreadCrumbs items={breadCrumbsItems} />
      <div className={`${style.ctaContainer}`}>
        <div className={`${style.cta}`}>
          <GoBack />
          <span className={`theme-headline-medium ${style.title}`}>
            {t('pages.habitat.affiliate.cycles.cycle.application.title')}
          </span>
        </div>
      </div>
      <div>
        <Buttons
          application={application}
          decideModalOpen={decideModalOpen}
          handleDecideModalOnClose={handleDecideModalOnClose}
          handleOnValidDecide={handleOnValidDecide}
          handleDecideOnClick={handleDecideOnClick}
          handleDownloadApplicationOnClick={handleDownloadApplication}
          loading={loading}
          downloading={downloadingFiles > 0}
        />
      </div>
      <div className={`${style.detailsContainer}`}>
        <LocalNavigation
          items={[
            {
              label: t(
                'pages.habitat.affiliate.cycles.cycle.application.tabs.submission'
              ),
              icon: <MdOutlineNoteAlt />,
            },
            {
              label: t(
                'pages.habitat.affiliate.cycles.cycle.application.tabs.notes'
              ),
              icon: <MdOutlineTextSnippet />,
            },
            ...(application?.type === ApplicationTypes.ONLINE
              ? [
                  {
                    label: t(
                      'pages.habitat.affiliate.cycles.cycle.application.tabs.decisions'
                    ),
                    icon: <MdOutlineLibraryAddCheck />,
                  },
                  {
                    label: t(
                      'pages.habitat.affiliate.cycles.cycle.application.tabs.calculations'
                    ),
                    icon: <MdOutlineCalculate />,
                  },
                ]
              : []),
          ]}
          current={activeTab}
          onChange={(newCurrent) => setActiveTab(newCurrent)}
        />
        <div className={style.tabContainer}>
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
          {activeTab === 2 && <DecisionsTab decisions={decisions} />}
          {activeTab === 3 && <CalculationsTab formAnswers={formAnswers} />}
        </div>
      </div>
    </div>
  );
};

export default AffiliateApplicationDetailsPage;
