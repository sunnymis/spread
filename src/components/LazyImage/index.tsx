import React, { useState, useEffect } from "react";
import firebase from "../../firebase";

export default function LazyImage(props: any) {
  const [image, setImage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const { path, className } = props;
  const fallbackUrl =
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80";

  useEffect(() => {
    if (!path) {
      return;
    }

    firebase
      .storage()
      .ref()
      .child(path)
      .getDownloadURL()
      .then((imageUrl) => {
        setImage(imageUrl);
        setLoaded(true);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!loaded) {
    return <img className={className} alt="" src={fallbackUrl} />;
  }

  return <img className={className} alt="" src={image} />;
}
