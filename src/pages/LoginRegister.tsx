import { TextField, Button, Checkbox, Grid, Typography, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoteType, UserType } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addManyUser, addOneUser } from '../store/modules/UserSlice';
import { useLocation } from 'react-router-dom';
import { Link, Snackbars } from '../components';
import { setMessage } from '../store/modules/SnackBarsSlice';
import { addOneNote } from '../store/modules/NoteSlice';

const LoginRegister: React.FC = () => {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.UserSlice);
  const [toSave, setToSave] = useState<boolean>(false);
  const [logged, setLogged] = useState<boolean>(false);
  const [user, setUser] = useState<UserType>({
    username: '',
    password: '',
    repassword: '',
    notes: []
  });

  const loggedUser = () => {
    return localStorage.getItem('ReccadosLoggedUser') || sessionStorage.getItem('ReccadosLoggedUser') || '';
  };

  useEffect(() => {
    if (loggedUser() != '') {
      return navigate('/notes');
    }
    if (usersData() != '{}') {
      dispatch(addManyUser(usersData()));
    }
  }, []);

  const usersData = () => {
    return JSON.parse(localStorage.getItem('userData') || '{}');
  };

  const ValidatContact = () => {
    pathName != '/' ? handleRegisterContact() : handleLoginContact();
  };

  const handleRegisterContact = () => {
    const userExists = usersData()[user.username.toLowerCase()];

    if (user.username === '' || user.password === '' || user.repassword === '') {
      return dispatch(setMessage({ message: 'Preencha os dois campos!', status: 'error' }));
    }
    if (user.password != user.repassword) {
      return dispatch(setMessage({ message: 'As senhas não coincidem!', status: 'error' }));
    }
    if (userExists) {
      return dispatch(setMessage({ message: 'Este usuário já existe!', status: 'error' }));
    }
    if (user.username.length < 5) {
      return dispatch(
        setMessage({ message: 'Utilize um nome de usuário com no mínimo 5 caracteres!', status: 'error' })
      );
    }
    if (user.password.length < 6) {
      return dispatch(setMessage({ message: 'Utilize uma senha com no mínimo 6 caracteres!', status: 'error' }));
    }

    const newUser: UserType = {
      username: user.username.toLowerCase(),
      password: user.password,
      notes: user.notes
    };
    dispatch(addOneUser(newUser));
    const newNote: NoteType = {
      id: Math.floor(Date.now() / 1000),
      detail: 'Primeiro recado',
      description:
        'Este é o seu primeiro recado, nos detalhes utilize no mínimo 5 e no máximo 20 caracteres. Na descrição utilize no mínimo 20 e no máximo 494 caracteres. \n Este recado será apagado, a menos que você o edite.'
    };
    dispatch(addOneNote(newNote));
    setToSave(true);
    return navigate('/');
  };

  const handleLoginContact = () => {
    const savedUsers = usersData();
    if (savedUsers[user.username.toLowerCase()] && savedUsers[user.username.toLowerCase()].password === user.password) {
      sessionStorage.setItem('ReccadosLoggedUser', user.username.toLowerCase());
      if (logged) {
        localStorage.setItem('ReccadosLoggedUser', user.username.toLowerCase());
      }
      return navigate('/notes');
    } else {
      return dispatch(setMessage({ message: 'Usuário ou senha incorretos!', status: 'error' }));
    }
  };

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogged(event.target.checked);
  };

  useEffect(() => {
    if (toSave) {
      localStorage.setItem('userData', JSON.stringify(userData.entities));
    }
  }, [userData]);

  return (
    <React.Fragment>
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <Snackbars />
        <Grid
          spacing={2}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            maxWidth: '500px',
            backgroundColor: '#ffffff',
            paddingBottom: '100px',
            borderRadius: '10px',
            marginLeft: '0 !important'
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              backgroundImage: 'url(/images/img-header-login.jpeg)',
              backgroundSize: 'cover'
            }}
          >
            <Typography variant="h3" gutterBottom sx={{ padding: '30px', color: 'white' }}>
              {pathName == '/' ? 'LOGIN' : 'REGISTRO'}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: '50px' }}>
            <TextField
              label="Usuário"
              value={user.username}
              onChange={ev =>
                setUser({
                  username: ev.target.value,
                  password: user.password,
                  repassword: user.password,
                  notes: user.notes
                })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Senha"
              value={user.password}
              onChange={ev =>
                setUser({
                  username: user.username,
                  password: ev.target.value,
                  repassword: user.repassword,
                  notes: user.notes
                })
              }
              variant="outlined"
              type="password"
            />
          </Grid>
          {pathName === '/register' && (
            <Grid item xs={12}>
              <TextField
                label="Repita a senha"
                type="password"
                value={user.repassword}
                onChange={ev =>
                  setUser({
                    username: user.username,
                    password: user.password,
                    notes: user.notes,
                    repassword: ev.target.value
                  })
                }
                variant="outlined"
              />
            </Grid>
          )}

          {pathName === '/' && (
            <Grid item xs={12} sx={{ mt: '-20px', mb: '-10px' }}>
              <Checkbox checked={logged} onChange={handleChangeCheckBox} />
              Manter login?
            </Grid>
          )}

          <Grid item xs={12}>
            <Button variant="contained" onClick={ValidatContact}>
              {pathName == '/' ? 'Entrar' : 'Registrar'}
            </Button>
          </Grid>
          <Grid item xs={12}>
            {pathName == '/' ? (
              <>
                Não tem conta? <Link to="/register" name="Registrar-se" />
              </>
            ) : (
              <>
                Já tem uma conta? <Link to="/" name="Fazer login" />
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default LoginRegister;
