import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearMessage } from '../store/modules/SnackBarsSlice';
import { useEffect } from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBars: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const SnackBarsRedux = useAppSelector(state => state.SnackBarsSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (SnackBarsRedux.message !== '' && SnackBarsRedux.status !== '') {
      setOpen(true);
    }
  }, [SnackBarsRedux]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    dispatch(clearMessage());
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={SnackBarsRedux.status ? SnackBarsRedux.status : 'info'}
          sx={{ width: '100%' }}
        >
          {SnackBarsRedux.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SnackBars;
