import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export interface interfaceName {
  uid: string;
  title: string;
}

const adapter = createEntityAdapter<interfaceName>({
  selectId: item => item.uid
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const { selectAll, selectById } = adapter.getSelectors((state: any) => state.NotesSlice);

const NotesSlice = createSlice({
  name: 'NotesSlice',
  initialState: adapter.getInitialState(),
  reducers: {
    addOne: adapter.addOne,
    addMany: adapter.addMany,
    updateOne: adapter.updateOne
  }
});

export const { addOne, addMany, updateOne } = NotesSlice.actions;
export default NotesSlice.reducer;
