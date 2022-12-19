/* eslint-disable no-unused-vars */
import NoteType from './NoteType';

interface NoteProps {
  Note: NoteType;
  actionEdit: (Note: NoteType) => void;
  actionDelete: (Note: NoteType) => void;
}

export default NoteProps;
