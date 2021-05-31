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
import transformFormValuesToRestaurant from "../../util/transformFormValuesToRestaurant";
import updateRestaurant from "../../firebase/updateRestaurant";

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

  const handleOnEdit = async (values: FormValues) => {
    console.log("values", values);
    const restaurant = transformFormValuesToRestaurant(values);

    await updateRestaurant(restaurant, documentId);
    setShowEditForm(false);

    fetchImages();
    history.replace(`/restaurants/${documentId}`, { restaurant, documentId });
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
      {tags && typeof tags !== "string" && tags.map((tag, idx) => <Badge key={idx} text={tag} />)}
      <h3>Description</h3>
      <p>{description}</p>
      {images.map((img, idx) => (
        <img key={idx} className={styles.uploadedImage} src={img} alt="" />
      ))}
      <div>
        <button onClick={handleOnDelete}>Delete</button>
        <button onClick={() => setShowEditForm(true)}>Edit</button>
      </div>
    </div>
  );
}
