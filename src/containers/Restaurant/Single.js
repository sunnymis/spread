import React from 'react';
import { useRestaurants } from '../../hooks';
import { firebase } from '../../firebase';

export default function Restaurant(props) {
  const { restaurants, setRestaurants } = useRestaurants();
  const {
    name,
    location,
    description,
    tags,
    docId,
  } = props.location.state

  const deleteRestaurant = () => {
    firebase
      .firestore()
      .collection('restaurants')
      .doc(docId)
      .delete()
      .then(() => {
        setRestaurants([...restaurants])
      })
  }

  return (
    <div>
      <h1>{name}</h1>
      <h2>{location}</h2>
      <h2>{description}</h2>
      {/* <img src='https://images.unsplash.com/photo-1559978137-8c560d91e9e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9'/> */}
      <button onClick={() => deleteRestaurant()}>
        Delete
      </button>
      <button onClick={() => deleteRestaurant()}>
        Edit
      </button>
    </div>
  )
}
