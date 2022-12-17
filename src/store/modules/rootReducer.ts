import { combineReducers } from '@reduxjs/toolkit';

import NoteSlice from './NoteSlice';
import UserSlice from './UserSlice';

export default combineReducers({
  NoteSlice,
  UserSlice
});
