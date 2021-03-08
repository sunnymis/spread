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
      {restaurants.map((r) => (
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
                {r.tags && typeof r.tags !== "string" && r.tags.map((tag) => <Badge text={tag} />)}
              </div>
            </div>
            <LazyImage className={styles.image} path={r.thumbnailImage ? r.thumbnailImage : null} />
          </div>
        </Link>
      ))}
    </div>
  );
}
