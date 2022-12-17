import { Button, TextField } from '@mui/material';
import React from 'react';

const Notes: React.FC = () => {
  return (
    <React.Fragment>
      <h1>Contact</h1>
      <p>Esta é a Contact</p>
      <TextField label="Detail" variant="filled" />
      <br />
      <TextField label="Description" variant="filled" />
      <br />
      <Button variant="contained">Save</Button>
    </React.Fragment>
  );
};

export default Notes;
