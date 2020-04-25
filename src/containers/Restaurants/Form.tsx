import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from 'formik';
import Input from '../../components/Input';
import TextArea from '../../components/Input/TextArea';
import Button from '../../components/Button';
import FileUpload from '../../components/FileUpload';
import styles from './restaurants.module.scss';

export interface FormValues {
  name: string;
  location: string;
  rating: number;
  description: string;
  tags: string | string[];
}

interface Props {
  formValues: FormValues;
  editingRestaurant?: boolean;
  onSubmit(restaurant: Restaurant): void;
  onCancel(): void;
}

interface Image {
  name: string;
  data: string;
}

const RestaurantForm = (props: Props) => {
  const {
    formValues,
    editingRestaurant,
    onSubmit,
    onCancel,
  } = props;

  const [images, setImages] = useState<Image[]>([]);
  const [imagesToUpload, setImagesToUpload] = useState<File[]>([]);

  let buttonText = editingRestaurant ? 'Submit Edit' : 'Submit New';

  const handleOnSubmit = (values: FormValues) => {
    // if (editingRestaurant) {
    //   return onSubmit({
    //     ...values,
    //     docId: editingRestaurant,
    //     images: imagesToUpload,
    //   })
    // }

    onSubmit({ ...values, images: imagesToUpload, })
  }

  const handleOnDrop = (files: File[]) => {
    console.log(files);
    files.forEach(file => createImageThumbnail(file));
    setImagesToUpload(files);
  };

  function createImageThumbnail(file: File) {
    let reader = new FileReader();
    // todo refactor this. we dont need two sets of images in state
    // images vs imagesToUpload
    reader.onload = function (e) {
      const img = {
        name: file.name,
        data: e.target && e.target.result,
      } as Image;

      setImages(stateImages => [...stateImages, img]);
    };

    reader.readAsDataURL(file);
  };


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
              <Input label="Rating" type="number" name="rating" />
              <Input label="Tags" type="text" name="tags" />
              <TextArea label="Description" name="description" />
              <ErrorMessage name="name" component="div" />
              <div>
                <Button styles={styles.cancel} secondary={true} text="Cancel" onClick={onCancel} />
                <Button type="submit" text={buttonText} />
              </div>
              <FileUpload
                onDrop={handleOnDrop}
              />
              {
                images.map(img => (
                  <img alt="" className={styles.uploadedImageThumbnail} src={img.data} />
                ))
              }
            </Form>
          )
        }
      </Formik>
    </div>
  )
}

export default RestaurantForm;
