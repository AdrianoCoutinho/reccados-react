import NoteType from './NoteType';

interface NoteProps {
  Note: NoteType;
  // eslint-disable-next-line no-unused-vars
  actionEdit: (Note: NoteType) => void;
}

export default NoteProps;
