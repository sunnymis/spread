import React from 'react'
import { useLocation } from 'react-router-dom';
import styles from './restaurants.module.scss';
import Rating from '../../components/Rating';
import Badge from '../../components/Badge';


function Details() {
  let location = useLocation();
  let data = location.state as Restaurant

  const {
    name,
    description,
    location: loc,
    tags,
    rating
  } = data;

  return (
    <div className={styles.details}>
      <h1>{name}</h1>
      <Rating rating={rating} />
      <h3>{loc}</h3>
      {
        (tags && typeof tags !== 'string') && tags.map(tag => <Badge text={tag} />)
      }
      <p>{description}</p>
    </div>
  )
}

export default Details

