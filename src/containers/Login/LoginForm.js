import React, { useState } from 'react';
import { styled } from '@material-ui/styles';
import TextField from '../../components/Form/TextField';
import Button from '@material-ui/core/Button';
import { login } from '../../auth';

const SubmitButton = styled(Button)({
  padding: '12px 24px',
  width: '50%',
  margin: '24px auto',
  display: 'block',
});

const NoAccount = styled('p')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  position: 'absolute',
  bottom: '18px',
});

const ErrorMessage = styled('p')({
  color: '#d32e30',
  textAlign: 'center',
});

export default function LogInForm(props) {
  const [error, setError] = useState(null);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const handleLogInChange = name => event => {
    setLoginForm({ ...loginForm, [name]: event.target.value });
  };

  const handleLogInSubmit = event => {
    event.preventDefault();

    login(loginForm.email, loginForm.password)
      .then(success => {
        localStorage.setItem('spreadUserId', success.user.uid);
        props.history.push('/');
      })
      .catch(error => {
        setError(error);
      });
  };

  return (
    <form onSubmit={handleLogInSubmit}>
      <TextField
        text="Email"
        value={loginForm.email}
        onChange={handleLogInChange('email')}
      />
      <TextField
        text="Password"
        value={loginForm.password}
        type="password"
        onChange={handleLogInChange('password')}
      />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton variant="contained" color="primary" type="submit">
        LOG IN
      </SubmitButton>
    </form>
  );
}
