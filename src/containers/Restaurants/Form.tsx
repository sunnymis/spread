import React from "react";
import { Formik, Form, ErrorMessage } from 'formik';
import Input from '../../components/Input';
import TextArea from '../../components/Input/TextArea';
import Button from '../../components/Button';
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
  onCancel(): void;
}

const RestaurantForm = (props: Props) => {
  const {
    formValues,
    editingRestaurant,
    onSubmit,
    onCancel,
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
              <TextArea label="Description" name="description" />
              <ErrorMessage name="name" component="div" />
              <div>
                <Button styles={styles.cancel} secondary={true} text="Cancel" onClick={onCancel} />
                <Button type="submit" text={buttonText} />
              </div>
            </Form>
          )
        }
      </Formik>
    </div>
  )
}

export default RestaurantForm;
