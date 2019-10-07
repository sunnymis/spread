import React from 'react'
import { styled } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";

export default function CategoryCard(props) {
  const { title, ...restProps } = props;
  
  return (
    <StyledLink to={{
      pathname: '/restaurants/',
    }}
    >
      <StyledCategoryCard {...restProps}>
        {props.title}
      </StyledCategoryCard>
    </StyledLink>
  )
}

CategoryCard.defaultProps = {
  elevation: 10,
}

const StyledCategoryCard = styled(Paper)(props => ({
  paddingTop: '80px',
  paddingBottom: '80px',
  paddingLeft: '16px',
  paddingRight: '16px',
  textAlign: 'center',
  color: '#fff',
  fontWeight: 'bold',
  background: props.background,
}));

const StyledLink = styled(Link)({
  textDecoration: 'none',
})
