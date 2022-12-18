import { Button, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addOneNote, selectNotes } from '../store/modules/NoteSlice';
import { NoteType } from '../types';

const Notes: React.FC = () => {
  const dispatch = useAppDispatch();
  const noteData = useAppSelector(selectNotes);
  const [note, setNote] = useState<NoteType>({
    id: 0,
    detail: '',
    description: ''
  });

  const HandleaddNote = () => {
    if (note.detail === '' || note.description === '') {
      return alert('Digite algo nos campos!');
    }
    const newNote: NoteType = {
      id: Math.floor(Date.now() / 1000),
      detail: note.detail,
      description: note.description
    };
    dispatch(addOneNote(newNote));
    setNote({
      id: 0,
      detail: '',
      description: ''
    });
  };

  useEffect(() => {
    console.log(noteData);
  }, [noteData]);

  return (
    <React.Fragment>
      <h1>Notes</h1>
      <p>Esta é a Notes</p>
      <TextField
        label="Detail"
        value={note.detail}
        onChange={ev => {
          setNote({
            id: note.id,
            detail: ev.target.value,
            description: note.description
          });
        }}
        variant="filled"
      />
      <br />

      <TextField
        label="Description"
        value={note.description}
        onChange={ev => {
          setNote({
            id: note.id,
            detail: note.detail,
            description: ev.target.value
          });
        }}
        variant="filled"
      />
      <br />
      <Button variant="contained" onClick={HandleaddNote}>
        Save
      </Button>

      <Paper>
        {noteData.map((item, index) => {
          return (
            <div key={index}>
              <p>
                ID: {index}
                <br />
                {item.detail}
                <br />
                {item.description}
              </p>
            </div>
          );
        })}
      </Paper>
    </React.Fragment>
  );
};

export default Notes;
