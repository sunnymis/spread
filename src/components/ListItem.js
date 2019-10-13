import React from 'react';
import { styled } from '@material-ui/styles';
import MUIListItem from '@material-ui/core/ListItem';
import Rating from '@material-ui/lab/Rating';
import ListItemText from '@material-ui/core/ListItemText';

const H3 = styled('h3')({
  marginBottom: '8px',
});

const StyledRating = styled(Rating)({
  marginBottom: '16px',
});

const Image = styled('img')({
  height: 'auto',
  width: '50%',
});

export default function ListItem(props) {
  const { text, rating, tags, image } = props;

  return (
    <MUIListItem button selected={false} onClick={props.onClick}>
      <ListItemText
        primary={
          <React.Fragment>
            <H3>{text}</H3>
            <StyledRating name="simple-controlled" value={rating} readOnly />
          </React.Fragment>
        }
        secondary={
          <React.Fragment>{tags && tags.map(t => <p>{t}</p>)}</React.Fragment>
        }
      />
      <Image src={image} />
    </MUIListItem>
  );
}
