import React from "react";
import cx from "classnames";
import styles from "./rating.module.scss";

interface Props {
  rating: number;
}

function Rating(props: Props) {
  const { rating } = props;

  const renderStars = () => {
    const stars = [];
    let classes = ["material-icons", "md-24"];

    for (let i = 0; i < 5; i++) {
      const style = i < rating ? styles.filled : styles.unfilled;

      stars.push(
        <i key={i} className={cx(...classes, style)}>
          star
        </i>
      );
    }

    return stars;
  };

  return <>{renderStars()}</>;
}

export default Rating;
