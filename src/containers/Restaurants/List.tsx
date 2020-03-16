import React from "react";
import styles from './restaurants.module.scss';
import Badge from '../../components/Badge';
import Rating from '../../components/Rating';
import { Link } from "react-router-dom";

interface Props {
  restaurants: Restaurant[];
}

export default function List({ restaurants }: Props) {
  const url = "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80"

  return (
    <div>
      <h1>{`Count: ${restaurants.length}`}</h1>
      {restaurants.map(r => (
        <Link
          className={styles.link}
          to={{
            pathname: `/restaurants/${r.docId}`,
            state: r,
          }}
        >
          <div className={styles.row} key={r.name}>
            <div className={styles.content}>
              <p className={styles.name}>{r.name}</p>
              <Rating rating={r.rating} />
              <div>
                {
                  (r.tags && typeof r.tags !== 'string') && r.tags.map(tag => <Badge text={tag} />)
                }
              </div>
            </div>
            <img className={styles.image} src={url} />
          </div>
        </Link>
      ))}
    </div>
  );
}

// TODO in future if data is hard ot update when editing a restaurant
// check how to structure nested entities in this article https://redux.js.org/advanced/async-actions/
/*
<button onClick={() => onDeleteClick(r.docId || '')}>Delete Restaurant</button>
<button onClick={() => onEditClick(r)}>Edit Restaurant</button>
*/
