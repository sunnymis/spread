import React from "react";
import { Formik, Form, ErrorMessage } from 'formik';
import Input from '../../components/Input';
import styles from './restaurants.module.scss';

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
    <div className={styles.formContainer}>
      <Formik
        enableReinitialize
        initialValues={formValues}
        onSubmit={handleOnSubmit}
      >
        {
          () => (
            <Form>
              <Input label="Name" type="text" name="name" />
              <Input label="Location" type="text" name="location" />
              <Input label="Rating" type="text" name="rating" />
              <Input label="Description" placeholder="hello" type="text" name="description" />
              <ErrorMessage name="name" component="div" />
              <button type="submit">{buttonText}</button>
            </Form>
          )
        }
      </Formik>
    </div>
  )
}

export default RestaurantForm;
