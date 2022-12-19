import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { NoteType } from '../types';
import NoteProps from '../types/NoteProps';

const DialogAction: React.FC<NoteProps> = ({ Note, actionEdit }) => {
  const [open, setOpen] = React.useState(false);
  const [noteToEdit, setNoteToEdit] = React.useState<NoteType>({
    id: Note.id,
    detail: Note.detail,
    description: Note.description
  });

  const handleClickOpenEdit = () => {
    setOpen(true);
  };

  const handleClickOpenDelete = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    actionEdit(noteToEdit);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpenEdit}>
        Editar
      </Button>
      <Button variant="outlined" onClick={handleClickOpenDelete}>
        Excluir
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ID: {Note.id}</DialogTitle>
        <DialogContent>
          <DialogContentText>{`Você esta editando o recado "${Note.detail}"`}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            value={noteToEdit.detail}
            onChange={ev => {
              setNoteToEdit({ id: Note.id, detail: ev.target.value, description: noteToEdit.description });
            }}
            label="Detalhes"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            value={noteToEdit.description}
            onChange={ev => {
              setNoteToEdit({ id: Note.id, detail: noteToEdit.detail, description: ev.target.value });
            }}
            label="Detalhes"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleEdit}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogAction;
