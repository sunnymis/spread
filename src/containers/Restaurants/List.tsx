import React from "react";
import { Link } from "react-router-dom";
import styles from "./restaurants.module.scss";
import Badge from "../../components/Badge";
import Rating from "../../components/Rating";
import LazyImage from "../../components/LazyImage";
import { RestaurantDTO } from "../../types/restaurant";

interface Props {
  restaurants: RestaurantDTO[];
}

export default function List({ restaurants }: Props) {
  return (
    <div>
      <h1>Restaurants</h1>
      {restaurants.map((restaurantDTO) => {
        const {
          restaurant: { name, rating, tags, thumbnailImage },
          documentId,
        } = restaurantDTO;

        return (
          <Link
            className={styles.link}
            to={{
              pathname: `/restaurants/${documentId}`,
              state: restaurantDTO,
            }}
          >
            <div className={styles.row} key={name}>
              <div className={styles.content}>
                <p className={styles.name}>{name}</p>
                <Rating rating={rating} />
                <div>{tags && tags.map((tag) => <Badge text={tag} />)}</div>
              </div>
              <LazyImage className={styles.image} path={thumbnailImage ? thumbnailImage : null} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
