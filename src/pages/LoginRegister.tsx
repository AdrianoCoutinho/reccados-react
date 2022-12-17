import { TextField, Button } from '@mui/material';
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
  const [user, setUser] = useState<UserType>({
    username: '',
    password: '',
    repassword: '',
    notes: []
  });

  const usersData = () => {
    return JSON.parse(localStorage.getItem('userData') || '{}');
  };

  const ValidatContact = () => {
    pathName != '/' ? handleRegisterContact() : handleLoginContact();
  };

  const handleRegisterContact = () => {
    const savedUsers = Object.keys(usersData());
    const userExists = savedUsers.findIndex(item => item === user.username);
    if (user.username === '' || user.password === '' || user.repassword === '') {
      return alert('Preencha os campos');
    }
    if (user.password != user.repassword) {
      return alert('As senhas não coincidem');
    }
    if (userExists != -1) {
      return alert('este usuário já existe');
    }

    const newUser: UserType = {
      username: user.username,
      password: user.password,
      notes: user.notes
    };
    dispatch(addOneUser(newUser));
    setToSave(true);
  };

  const handleLoginContact = () => {
    const savedUsers = usersData();
    if (savedUsers[user.username] && savedUsers[user.username].password === user.password) {
      return navigate('/notes');
    } else {
      return alert('Usuário ou senha incorretos.');
    }
  };

  useEffect(() => {
    if (usersData() != '{}') {
      dispatch(addManyUser(usersData()));
    }
  }, []);

  useEffect(() => {
    if (toSave) {
      console.log(userData.entities);
      localStorage.setItem('userData', JSON.stringify(userData.entities));
    }
  }, [userData]);

  return (
    <React.Fragment>
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
          Não possui conta?
          <a style={{ color: 'red' }} onClick={() => navigate('/register')}>
            Registra-se
          </a>
        </>
      )}

      <br />
      <Button variant="contained" onClick={ValidatContact}>
        {pathName == '/' ? 'Entrar' : 'Registrar'}
      </Button>
    </React.Fragment>
  );
};

export default LoginRegister;
