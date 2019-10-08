import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import { styled } from '@material-ui/styles';
import { useRestaurants } from '../../hooks';
import { firebase } from '../../firebase';
import Carousel from '../../components/Carousel';
import FormModal from './FormModal';

export default function Restaurant(props) {
  const { restaurants, setRestaurants } = useRestaurants();
  const [open, setOpen] = useState(false);

  const {
    name,
    location,
    description,
    tags,
    docId,
    photos,
  } = props.location.state;

  const deleteRestaurant = () => {
    firebase
      .firestore()
      .collection('restaurants')
      .doc(docId)
      .delete()
      .then(() => {
        setRestaurants([...restaurants]);
      });
  };

  function openModal() {
    setOpen(true);
  }

  function handleOnClose() {
    setOpen(false);
  }

  const Div = styled('div')({
    paddingLeft: '16px',
  });

  const Tag = styled('span')({
    backgroundColor: '#00AEFF',
    border: '1px solid #0099ff',
    color: '#fff',
    borderRadius: '10%',
    padding: '8px',
  });

  return (
    <Div>
      <h1>{name}</h1>
      <Rating name="simple-controlled" value={props.rating} readOnly />

      <p>{location}</p>
      {tags && tags.map(t => <Tag>{t}</Tag>)}

      <h2>Photos</h2>
      {photos && <Carousel photos={photos} />}

      <h2>Description</h2>
      <p>{description}</p>

      <button onClick={() => deleteRestaurant()}>Delete</button>
      <button onClick={() => openModal()}>Edit</button>
      <FormModal open={open} onClose={handleOnClose} />
    </Div>
  );
}
