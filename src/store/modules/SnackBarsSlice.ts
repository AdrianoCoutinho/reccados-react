import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SnackBarsType {
  message: string;
  status: 'success' | 'error' | 'warning' | '';
}

const initialState: SnackBarsType = { message: '', status: '' };

const SnackBarsSlice = createSlice({
  name: 'SnackBarsSlice',
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<SnackBarsType>) {
      return action.payload;
    },
    clearMessage() {
      return initialState;
    }
  }
});

export const { setMessage, clearMessage } = SnackBarsSlice.actions;
export default SnackBarsSlice.reducer;
