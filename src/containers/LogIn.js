import React, { useState } from 'react';
import { styled } from '@material-ui/styles';
import TextField from '../components/Form/TextField';
import Button from '@material-ui/core/Button';

const StyledLogIn = styled('div')({
  flexGrow: 1,
  padding: '48px',
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
  position: 'absolute',
  bottom: '18px',
  left: '25%',
});

const SignUp = styled('span')({
  fontWeight: 'bold',
  color: '#04aeff',
});
export default function LogIn() {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = name => event => {
    setLoginForm({ ...loginForm, [name]: event.target.value });
  };

  return (
    <StyledLogIn>
      <H1>Spread</H1>
      <H2>Login</H2>
      <form>
        <TextField
          text="Email"
          value={loginForm.email}
          onChange={handleChange('email')}
        />
        <TextField
          text="Password"
          value={loginForm.password}
          type="password"
          onChange={handleChange('password')}
        />
        <SubmitButton variant="contained" color="primary" type="submit">
          Log In
        </SubmitButton>
      </form>
      <NoAccount>
        Don't have an account?
        <SignUp>{` Sign Up`}</SignUp>
      </NoAccount>
    </StyledLogIn>
  );
}
