import React, { useState } from 'react';
import { styled } from '@material-ui/styles';
import TextField from '../../components/Form/TextField';
import Button from '@material-ui/core/Button';
import { createAccount } from '../../auth';

const ErrorMessage = styled('p')({
  color: '#d32e30',
  textAlign: 'center',
});

const SubmitButton = styled(Button)({
  padding: '12px 24px',
  width: '50%',
  margin: '24px auto',
  display: 'block',
});

export default function CreateAccountForm(props) {
  const [error, setError] = useState(null);
  const [createAccountForm, setCreateAccountForm] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleCreateAccountChange = name => event => {
    setCreateAccountForm({ ...createAccountForm, [name]: event.target.value });
  };

  const handleCreateAccountSubmit = () => {
    createAccount(createAccountForm.email, createAccountForm.password)
      .then(success => {
        localStorage.setItem('spreadUserId', success.user.uid);
        props.history.push('/');
      })
      .catch(error => {
        setError(error);
      });
  };

  return (
    <form>
      <TextField
        text="Email"
        value={createAccountForm.email}
        onChange={handleCreateAccountChange('email')}
      />
      <TextField
        text="Password"
        value={createAccountForm.password}
        type="password"
        onChange={handleCreateAccountChange('password')}
      />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton
        onClick={handleCreateAccountSubmit}
        variant="contained"
        color="primary"
      >
        SIGN UP
      </SubmitButton>
    </form>
  );
}
