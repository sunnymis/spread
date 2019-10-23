import React from 'react';
import { styled } from '@material-ui/styles';

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

export default function Footer(props) {
  const { isLoggingIn, onClick } = props;

  return isLoggingIn ? (
    <NoAccount>
      {` Don't have an account? `}
      <SignUp onClick={() => onClick(false)}>{` Sign Up`}</SignUp>
    </NoAccount>
  ) : (
    <NoAccount>
      Already have an account?
      <SignUp onClick={() => onClick(true)}>{` Sign In`}</SignUp>
    </NoAccount>
  );
}
