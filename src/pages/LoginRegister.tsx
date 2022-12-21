import { TextField, Button, Checkbox, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addManyUser, addOneUser } from '../store/modules/UserSlice';
import { useLocation } from 'react-router-dom';
import { Link } from '../components';

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
      return alert('Preencha os campos');
    }
    if (user.password != user.repassword) {
      return alert('As senhas não coincidem');
    }
    if (userExists) {
      return alert('este usuário já existe');
    }

    const newUser: UserType = {
      username: user.username.toLowerCase(),
      password: user.password,
      notes: user.notes
    };
    dispatch(addOneUser(newUser));
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
      return alert('Usuário ou senha incorretos.');
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
          borderRadius: '10px'
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
          />
        </Grid>
        {pathName === '/register' && (
          <Grid item xs={12}>
            <TextField
              label="Repeat password"
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
    </React.Fragment>
  );
};

export default LoginRegister;
