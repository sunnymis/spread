import React from 'react'
import { compose } from "redux";
import { connect } from "react-redux";
import { useLocation, useHistory } from 'react-router-dom';
import { AppState } from '../../store';
import deleteRestaurant from '../../firebase/deleteRestaurant';
import styles from './restaurants.module.scss';
import Rating from '../../components/Rating';
import Badge from '../../components/Badge';

interface Props {
  deleteRestaurant(id: string): void;
}

function Details(props: Props) {
  let location = useLocation();
  let history = useHistory();
  let data = location.state as Restaurant

  const {
    deleteRestaurant
  } = props;
  const {
    name,
    description,
    location: loc,
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

  return (
    <div className={styles.details}>
      <h1>{name}</h1>
      <h2>{docId}</h2>
      <Rating rating={rating} />
      <h3>{loc}</h3>
      {
        (tags && typeof tags !== 'string') && tags.map(tag => <Badge text={tag} />)
      }
      <p>{description}</p>
      <button onClick={handleOnDelete}>Delete</button>
    </div>
  )
}

export const mapStateToProps = (state: AppState) => { };

export const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteRestaurant: (id: string) => dispatch(deleteRestaurant(id)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Details);
