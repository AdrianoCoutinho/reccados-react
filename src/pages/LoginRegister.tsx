import { TextField, Button, Checkbox, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addManyUser, addOneUser } from '../store/modules/UserSlice';
import { useLocation } from 'react-router-dom';

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
  }, []);

  const usersData = () => {
    return JSON.parse(localStorage.getItem('userData') || '{}');
  };

  const ValidatContact = () => {
    pathName != '/' ? handleRegisterContact() : handleLoginContact();
  };

  const handleRegisterContact = () => {
    const userExists = usersData()[user.username];

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
      username: user.username,
      password: user.password,
      notes: user.notes
    };
    dispatch(addOneUser(newUser));
    setToSave(true);
    return navigate('/');
  };

  const handleLoginContact = () => {
    const savedUsers = usersData();
    if (savedUsers[user.username] && savedUsers[user.username].password === user.password) {
      sessionStorage.setItem('ReccadosLoggedUser', user.username);
      if (logged) {
        localStorage.setItem('ReccadosLoggedUser', user.username);
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
    if (usersData() != '{}') {
      dispatch(addManyUser(usersData()));
    }
  }, []);

  useEffect(() => {
    if (toSave) {
      localStorage.setItem('userData', JSON.stringify(userData.entities));
    }
  }, [userData]);

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <h1>Contact</h1>
          <p>Esta é a Contact</p>
          <TextField
            label="Username"
            value={user.username}
            onChange={ev =>
              setUser({
                username: ev.target.value,
                password: user.password,
                repassword: user.password,
                notes: user.notes
              })
            }
            variant="filled"
          />
          <br />
          <TextField
            label="Password"
            value={user.password}
            onChange={ev =>
              setUser({
                username: user.username,
                password: ev.target.value,
                repassword: user.repassword,
                notes: user.notes
              })
            }
            variant="filled"
          />
          <br />
          {pathName === '/register' && (
            <>
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
                variant="filled"
              />
              <div>
                Já possui conta?
                <a style={{ color: 'red' }} onClick={() => navigate('/')}>
                  Login
                </a>
              </div>
            </>
          )}
          {pathName === '/' && (
            <>
              <Checkbox checked={logged} onChange={handleChangeCheckBox} />
              Manter login?
            </>
          )}

          <br />
          <Button variant="contained" onClick={ValidatContact}>
            {pathName == '/' ? 'Entrar' : 'Registrar'}
          </Button>
          {pathName === '/' && (
            <>
              <br /> Não possui conta?
              <a style={{ color: 'red' }} onClick={() => navigate('/register')}>
                Registra-se
              </a>
            </>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default LoginRegister;
