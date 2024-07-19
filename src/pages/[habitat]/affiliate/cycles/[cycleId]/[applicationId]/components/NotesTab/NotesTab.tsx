import { Button, Flex, Text } from '@aws-amplify/ui-react';
import { Note } from 'models';
import { EditorState } from 'lexical';
import { useTranslation } from 'react-i18next';
import NoteModal from './components/NoteModal';
import NotePreview from './components/NotePreview';

interface IProperties {
  notes: Note[];
  noteModal: boolean;
  uploadingNote: boolean;
  deletingNote: boolean;
  handleNoteOpenClose: () => void;
  handleOnSaveNote: (editorState: EditorState) => void;
  handleDeleteNote: (note: Note) => void;
}

const NotesTab = ({
  notes,
  noteModal,
  uploadingNote,
  deletingNote,
  handleDeleteNote,
  handleNoteOpenClose,
  handleOnSaveNote,
}: IProperties) => {
  const { t } = useTranslation();
  return (
    <>
      <Flex justifyContent="end" marginTop="1rem">
        <NoteModal
          open={noteModal}
          onClose={handleNoteOpenClose}
          onSave={handleOnSaveNote}
          uploading={uploadingNote}
        />
        <Button variation="primary" onClick={handleNoteOpenClose}>
          {t(
            'pages.habitat.affiliate.cycles.cycle.application.components.notesTab.createNote'
          )}
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
            {t(
              'pages.habitat.affiliate.cycles.cycle.application.components.notesTab.noNotes'
            )}
          </Text>
        )}
      </Flex>
    </>
  );
};

export default NotesTab;
