import { combineReducers } from '@reduxjs/toolkit';

import NoteSlice from './NoteSlice';
import UserSlice from './UserSlice';
import SnackBarsSlice from './SnackBarsSlice';

export default combineReducers({
  NoteSlice,
  UserSlice,
  SnackBarsSlice
});
