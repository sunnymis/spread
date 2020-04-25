import React, { useState } from 'react'
import { compose } from "redux";
import { connect } from "react-redux";
import { useLocation, useHistory } from 'react-router-dom';
import { AppState } from '../../store';
import deleteRestaurant from '../../firebase/deleteRestaurant';
import updateRestaurant from "../../firebase/updateRestaurant";
import Form, { FormValues } from './Form';
import styles from './restaurants.module.scss';
import Rating from '../../components/Rating';
import Badge from '../../components/Badge';

interface Props {
  deleteRestaurant(id: string): void;
  updateRestaurant(restaurant: Restaurant): void;
}

function Details(props: Props) {
  let browserLocation = useLocation();
  let history = useHistory();
  const [showForm, setShowForm] = useState(false)
  let data = browserLocation.state as Restaurant

  const {
    deleteRestaurant,
    updateRestaurant
  } = props;

  const {
    name,
    description,
    location,
    tags,
    rating,
    docId
  } = data;

  const handleOnDelete = () => {
    const shouldDelete = window.confirm('Are you sure you want to delete this?');

    if (shouldDelete) {
      deleteRestaurant(docId as string)
      history.replace('/restaurants');
    }
  }

  const handleOnEdit = (values: FormValues) => {
    const newTags = values.tags as string; // todo figure out how to not cast. the current type is string | string[]
    const restaurant = {
      ...values,
      docId,
      tags: newTags.split(' '),
      // TODO add images to upload here as well
    };
    updateRestaurant(restaurant)
    setShowForm(false);
    // todo history replace is a hack to reload the page to get 
    // the latest data (values). probably best to create an action
    // to getRestaurantByDocId and retrieve the updated restaurant on render
    history.replace(`/restaurants/${docId}`, { ...values });
  }

  const reset = () => {
    setShowForm(false);
  }

  const formValues = {
    name,
    location,
    rating,
    description,
    tags,
  }

  if (showForm) {
    return (
      <Form
        editingRestaurant={true}
        formValues={formValues}
        onSubmit={handleOnEdit}
        onCancel={reset}
      />
    )
  }
  return (
    <div className={styles.details}>
      <h1>{name}</h1>
      <h2>{docId}</h2>
      <Rating rating={rating} />
      <h3>{location}</h3>
      {
        (tags && typeof tags !== 'string') && tags.map(tag => <Badge text={tag} />)
      }
      <p>{description}</p>
      <button onClick={handleOnDelete}>Delete</button>
      <button onClick={() => setShowForm(true)}>Edit</button>
    </div>
  )
}

export const mapStateToProps = (state: AppState) => { };

export const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteRestaurant: (id: string) => dispatch(deleteRestaurant(id)),
    updateRestaurant: (restaurant: Restaurant) => dispatch(updateRestaurant(restaurant)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Details);
