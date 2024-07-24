import React from 'react';
import { Flex, Text } from '@aws-amplify/ui-react';
import { Note } from 'models';
import { EditorState } from 'lexical';
import CustomButton from 'components/CustomButton';
import { MdOutlineAdd } from 'react-icons/md';
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
}: IProperties) => (
  <>
    <Flex justifyContent="end" marginTop="1rem">
      <NoteModal
        open={noteModal}
        onClose={handleNoteOpenClose}
        onSave={handleOnSaveNote}
        uploading={uploadingNote}
      />
      <CustomButton onClick={handleNoteOpenClose} icon={<MdOutlineAdd />}>
        Create Note
      </CustomButton>
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
  </>
);

export default NotesTab;
