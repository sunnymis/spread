import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';

export interface FormValues {
  name: string;
  location: string;
  rating: number;
  description: string;
}

interface Props {
  formValues: FormValues;
  editingRestaurant?: string;
  onSubmit(restaurant: Restaurant): void;
}

const RestaurantForm = (props: Props) => {
  const {
    formValues,
    editingRestaurant,
    onSubmit,
  } = props;

  let buttonText = editingRestaurant ? 'Submit Edit' : 'Submit New';

  const handleOnSubmit = (values: FormValues) => {
    if (editingRestaurant) {
      return onSubmit({
        ...values,
        docId: editingRestaurant
      })
    }

    onSubmit({ ...values })
  }

  return (
    <Formik
      enableReinitialize
      initialValues={formValues}
      onSubmit={handleOnSubmit}
    >
      {
        () => (
          <Form>
            <Field type="text" name="name" />
            <Field type="text" name="location" />
            <Field type="text" name="rating" />
            <Field type="text" name="description" />
            <ErrorMessage name="name" component="div" />
            <button type="submit">{buttonText}</button>
          </Form>
        )
      }
    </Formik>
  )
}

export default RestaurantForm;
