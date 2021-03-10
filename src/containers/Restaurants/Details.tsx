import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Form from "./Form";
import styles from "./restaurants.module.scss";
import Rating from "../../components/Rating";
import Badge from "../../components/Badge";

import getImagesByDocId from "../../firebase/getImagesByDocId";
import deleteRestaurant from "../../firebase/deleteRestaurant";
import { FormValues, RestaurantDTO } from "../../types/restaurant";
import transformRestaurantToFormValues from "../../util/transformRestaurantToFormValues";

export default function Details() {
  const [showEditForm, setShowEditForm] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const browserLocation = useLocation();

  const currentRestaurantDTO = browserLocation.state as RestaurantDTO;
  console.log("CURRENTRDTO", currentRestaurantDTO.restaurant);
  const {
    restaurant: { name, description, location, tags, rating },
    documentId,
  } = currentRestaurantDTO;

  let history = useHistory();

  useEffect(() => {
    fetchImages();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchImages = async () => {
    const imgs = await getImagesByDocId(documentId);

    setImages(imgs);
  };

  const handleOnDelete = () => {
    const shouldDelete = window.confirm("Are you sure you want to delete this?");

    if (shouldDelete) {
      deleteRestaurant(documentId);
      history.replace("/restaurants");
    }
  };

  const handleOnEdit = (values: FormValues) => {
    console.log("values", values);

    // let newTags = values.tags;
    // if (typeof values.tags === "string") {
    //   newTags = values.tags.split(" ");
    // } // todo figure out how to not cast. the current type is string | string[]

    // const restaurant = {
    //   ...values,
    //   docId: docId,
    //   tags: newTags,
    //   thumbnailImage,
    //   // TODO add images to upload here as well
    // };

    // updateRestaurant(restaurant);
    // setShowForm(false);
    // // todo history replace is a hack to reload the page to get
    // // the latest data (values). probably best to create an action
    // // to getRestaurantByDocId and retrieve the updated restaurant on render
    // history.replace(`/restaurants/${docId}`, { ...restaurant });
  };

  const reset = () => {
    setShowEditForm(false);
  };

  if (showEditForm) {
    const formValues = transformRestaurantToFormValues(currentRestaurantDTO.restaurant);

    return (
      <Form
        editingRestaurant={true}
        formValues={formValues}
        onSubmit={handleOnEdit}
        onCancel={reset}
      />
    );
  }
  return (
    <div className={styles.details}>
      <h1>{name}</h1>
      <Rating rating={rating} />
      <h3>
        <i className="material-icons">place</i>
        {location}
      </h3>
      {tags && typeof tags !== "string" && tags.map((tag) => <Badge text={tag} />)}
      <h3>Description</h3>
      <p>{description}</p>
      {images.map((img) => (
        <img className={styles.uploadedImage} src={img} alt="" />
      ))}
      <button onClick={handleOnDelete}>Delete</button>
      <button onClick={() => setShowEditForm(true)}>Edit</button>
    </div>
  );
}
