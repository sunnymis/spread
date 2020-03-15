import React from 'react'
import styles from './badge.module.scss';

interface Props {
  text: string;
}
function Badge(props: Props) {
  const {
    text,
  } = props;

  return (
    <p className={styles.badge} >
      {text}
    </p>
  )
}

export default Badge

