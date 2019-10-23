import React, { useState } from 'react';
import { styled } from '@material-ui/styles';
import LoginForm from './LoginForm';
import CreateAccountForm from './CreateAccountForm';
import Footer from './Footer';

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

export default function LogIn(props) {
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  return (
    <StyledLogIn>
      <H1>Spread</H1>
      <H2>{isLoggingIn ? 'Login' : 'Create an account'}</H2>
      {isLoggingIn ? (
        <LoginForm {...props} />
      ) : (
        <CreateAccountForm {...props} />
      )}
      <Footer isLoggingIn={isLoggingIn} onClick={setIsLoggingIn} />
    </StyledLogIn>
  );
}
