import React, { useState, useContext } from 'react';
import { styled } from '@material-ui/styles';
import TextField from '../components/Form/TextField';
import Button from '@material-ui/core/Button';
import { login, createAccount } from '../auth';

const StyledLogIn = styled('div')({
  flexGrow: 1,
  padding: '48px',
  position: 'relative',
});

const H1 = styled('h1')({
  fontSize: '64px',
  textAlign: 'center',
  fontFamily: 'Roboto',
  fontWeight: 300,
});

const H2 = styled('h1')({
  fontSize: '36px',
  fontFamily: 'Roboto',
  fontWeight: 'bold',
});

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

const SignUp = styled('span')({
  fontWeight: 'bold',
  paddingLeft: '4px',
  color: '#04aeff',
  '&:hover': {
    cursor: 'pointer',
  },
});

const ErrorMessage = styled('p')({
  color: '#d32e30',
  textAlign: 'center',
});

export default function LogIn(props) {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [error, setError] = useState(null);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [createAccountForm, setCreateAccountForm] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleLogInChange = name => event => {
    setLoginForm({ ...loginForm, [name]: event.target.value });
  };

  const handleCreateAccountChange = name => event => {
    setCreateAccountForm({ ...createAccountForm, [name]: event.target.value });
  };

  const renderTitle = () => {
    return isLoggingIn ? 'Login' : 'Create an account';
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

  const renderLoginForm = () => (
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

  const renderCreateAccountForm = () => (
    <form>
      {/* <TextField
        text="Fulll Name"
        value={createAccountForm.fullName}
        onChange={handleCreateAccountChange('fullName')}
      /> */}
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
      <SubmitButton
        onClick={handleCreateAccountSubmit}
        variant="contained"
        color="primary"
      >
        SIGN UP
      </SubmitButton>
      {error && <p>{error.message}</p>}
    </form>
  );

  const renderFooterText = () => {
    return isLoggingIn ? (
      <NoAccount>
        {` Don't have an account? `}
        <SignUp onClick={() => setIsLoggingIn(false)}>{` Sign Up`}</SignUp>
      </NoAccount>
    ) : (
      <NoAccount>
        Already have an account?
        <SignUp onClick={() => setIsLoggingIn(true)}>{` Sign In`}</SignUp>
      </NoAccount>
    );
  };

  return (
    <StyledLogIn>
      <H1>Spread</H1>
      <H2>{renderTitle()}</H2>
      {isLoggingIn ? renderLoginForm() : renderCreateAccountForm()}

      {renderFooterText()}
    </StyledLogIn>
  );
}
