import React from 'react';
import { Button, Flex, Text } from '@aws-amplify/ui-react';
import { Note } from 'models';
import { SerializedEditorState } from 'lexical';
import NoteModal from './components/NoteModal';
import NotePreview from './components/NotePreview';

interface IProperties {
  notes: Note[];
  noteModal: boolean;
  uploadingNote: boolean;
  deletingNote: boolean;
  handleNoteOpenClose: () => void;
  handleOnSaveNote: (editorState: SerializedEditorState) => void;
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
  </>
);

export default NotesTab;
