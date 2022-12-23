import {
  Button,
  Grid,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DialogAction } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addManyNote,
  addOneNote,
  clearNotes,
  deleteOneNote,
  selectNotes,
  updateOneNote
} from '../store/modules/NoteSlice';
import { NoteType } from '../types';

const Notes: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const noteData = useAppSelector(selectNotes);
  const [save, setSave] = useState<boolean>(false);

  const [note, setNote] = useState<NoteType>({
    id: 0,
    detail: '',
    description: ''
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },

    '&:last-child td, &:last-child th': {
      border: 0
    }
  }));

  function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9)
  ];

  const usersData = () => {
    return JSON.parse(localStorage.getItem('userData') || '[]');
  };

  const loggedUser = () => {
    return localStorage.getItem('ReccadosLoggedUser') || sessionStorage.getItem('ReccadosLoggedUser') || '';
  };

  useEffect(() => {
    if (loggedUser() === '') {
      return navigate('/');
    }
    const savedNotes = usersData()[loggedUser().toLowerCase()].notes;
    dispatch(addManyNote(savedNotes));
  }, []);

  const HandleLogout = () => {
    localStorage.removeItem('ReccadosLoggedUser');
    sessionStorage.removeItem('ReccadosLoggedUser');
    setSave(false);
    dispatch(clearNotes());
    navigate('/');
  };

  const HandleAddNote = () => {
    if (note.detail === '' || note.description === '') {
      return alert('Digite algo nos campos!');
    }
    const newNote: NoteType = {
      id: Math.floor(Date.now() / 1000),
      detail: note.detail,
      description: note.description
    };
    dispatch(addOneNote(newNote));
    setSave(true);
  };

  const handleEditConfirm = (noteToEdit: NoteType) => {
    dispatch(
      updateOneNote({
        id: noteToEdit.id,
        changes: { detail: noteToEdit.detail, description: noteToEdit.description }
      })
    );
    setSave(true);
  };

  const handleDeleteConfirm = (noteToDelete: NoteType) => {
    dispatch(deleteOneNote(noteToDelete.id));
    setSave(true);
  };

  useEffect(() => {
    if (save) {
      const toUpdate = usersData();
      toUpdate[loggedUser()].notes = noteData;
      localStorage.setItem('userData', JSON.stringify(toUpdate));
      setNote({
        id: 0,
        detail: '',
        description: ''
      });
    }
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
      <Button variant="contained" onClick={HandleAddNote}>
        Save
      </Button>
      <br />
      <br />
      <Button variant="contained" onClick={HandleLogout}>
        Logout
      </Button>
      <br />
      <br />

      <Paper sx={{ backgroundColor: '#303030' }}>
        <br />

        {noteData.map(item => {
          return (
            <div key={item.id}>
              <p>
                ID: {item.id}
                <br />
                {item.detail}
                <br />
                {item.description}
              </p>

              <DialogAction actionEdit={handleEditConfirm} actionDelete={handleDeleteConfirm} Note={item} />
            </div>
          );
        })}
        <br />
      </Paper>
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Detalhe</StyledTableCell>
                  <StyledTableCell align="right">Descrição</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.calories}</StyledTableCell>
                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Notes;
