import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { NoteType } from '../../types';

const adapter = createEntityAdapter<NoteType>({
  selectId: item => item.id
});

export const { selectAll: selectNotes, selectById } = adapter.getSelectors((state: RootState) => state.NoteSlice);

const NotesSlice = createSlice({
  name: 'NotesSlice',
  initialState: adapter.getInitialState(),
  reducers: {
    addOneNote: adapter.addOne,
    addManyNote: adapter.addMany,
    updateOneNote: adapter.updateOne
  }
});

export const { addOneNote, addManyNote, updateOneNote } = NotesSlice.actions;
export default NotesSlice.reducer;
