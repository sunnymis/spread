import React from "react";
import { Link } from "react-router-dom";
import styles from "./restaurants.module.scss";
import Badge from "../../components/Badge";
import Rating from "../../components/Rating";
import LazyImage from "../../components/LazyImage";

interface Props {
  restaurants: Restaurant[];
}

export default function List({ restaurants }: Props) {
  return (
    <div>
      <h1>{`Count: ${restaurants.length}`}</h1>
      {restaurants.map((restaurant) => (
        <Link
          className={styles.link}
          to={{
            pathname: `/restaurants/${restaurant.docId}`,
            state: restaurant,
          }}
        >
          <div className={styles.row} key={restaurant.name}>
            <div className={styles.content}>
              <p className={styles.name}>{restaurant.name}</p>
              <Rating rating={restaurant.rating} />
              <div>{restaurant.tags && restaurant.tags.map((tag) => <Badge text={tag} />)}</div>
            </div>
            <LazyImage
              className={styles.image}
              path={restaurant.thumbnailImage ? restaurant.thumbnailImage : null}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
