import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';

export interface FormValues {
  name: string;
  location: string;
  rating: number;
  description: string;
}

interface Props {
  isEditing: boolean;
  formValues: FormValues;
  editingDocId: string;
  onAddClick(restaurant: Restaurant): void;
  onEditClick(restaurant: Restaurant): void;
  onSetIsEditing(): void;
}

const RestaurantForm = (props: Props) => {
  const {
    isEditing,
    formValues,
    editingDocId,
    onEditClick,
    onAddClick,
    onSetIsEditing,
  } = props;

  return (
    <Formik
      enableReinitialize
      initialValues={formValues}
      onSubmit={(values, actions) => {
        if (isEditing) {
          const newRestaurant = {
            ...values,
            docId: editingDocId
          };
          onEditClick(newRestaurant)
        } else {
          onAddClick({ ...values });
        }
      }}
    >
      {
        ({ isSubmitting }) => (
          <Form>
            <Field type="text" name="name" />
            <Field type="text" name="location" />
            <Field type="text" name="rating" />
            <Field type="text" name="description" />
            <ErrorMessage name="name" component="div" />
            {
              isEditing ? (
                <button type="submit">Submit Edit </button>
              ) : (
                  <button type="submit" disabled={isSubmitting}>Submit New </button>
                )
            }
            {isEditing && (
              <button type="button" onClick={onSetIsEditing}>Stop Edit</button>
            )}
          </Form>
        )
      }
    </Formik>
  )
}

export default RestaurantForm;
