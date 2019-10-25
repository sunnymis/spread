import React, { useState } from 'react';
import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import TextField from '../../components/Form/TextField';
import Dropdown from '../../components/Form/Dropdown';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Rating from '@material-ui/lab/Rating';
import { CUISINES } from '../constants';
import DropZone from '../../components/DropZone';
import get from 'lodash/get';
import firebase from 'firebase';

export default function FormModal(props) {
  const { open, data, title, editing } = props;
  const name = get(data, 'name', '');
  const location = get(data, 'location', '');
  const rating = get(data, 'rating', 0);
  const description = get(data, 'description', '');
  const tags = get(data, 'tags', []);

  const [formData, setFormData] = useState({
    name,
    location,
    rating,
    description,
    tags,
  });
  const [images, setImages] = useState([]);

  const handleClose = () => {
    props.onClose();
  };

  const handleChange = name => event => {
    setFormData({ ...formData, [name]: event.target.value });
  };

  const handleOnTagChange = event => {
    setFormData({ ...formData, tags: event });
  };

  const handleOnRatingChange = newRating => {
    setFormData({ ...formData, rating: newRating });
  };

  const handleOnDrop = files => {
    files.forEach(file => createImageThumbnail(file));
  };

  function createImageThumbnail(file) {
    let reader = new FileReader();

    reader.onload = function(e) {
      setImages(imgs => [
        ...imgs,
        {
          name: file.name,
          data: e.target.result,
        },
      ]);
    };

    reader.readAsDataURL(file);
  }

  const handleRemoveImage = image => {
    setImages(imgs => imgs.filter(img => img.data !== image.data));
  };

  const saveNewEntry = () => {
    const userId = get(firebase.auth().currentUser, 'uid', null);
    const restaurants = firebase
      .firestore()
      .collection(`restaurants/users/${userId}`);

    restaurants
      .add({
        ...formData,
        images,
      })
      .then(result => {
        const docId = result.id;
        const storageRef = firebase.storage().ref();

        images.forEach(img => {
          const uniqueFilename = new Date().getUTCMilliseconds();

          const folderRef = storageRef.child(
            `images/users/${userId}/${docId}/${uniqueFilename}`
          );

          folderRef.putString(img.data, 'data_url').then(function(snapshot) {
            console.log('Uploaded a data_url string!', snapshot);
          });
        });

        handleClose();
      });
  };

  const editEntry = () => {
    const userId = get(firebase.auth().currentUser, 'uid', null);
    const restaurants = firebase
      .firestore()
      .collection(`restaurants/users/${userId}`);
    const { data } = props;
    const docId = data.docId;

    restaurants
      .doc(docId)
      .update({
        ...formData,
        images,
      })
      .then(updateRes => {
        const storageRef = firebase.storage().ref();

        images.forEach(img => {
          const uniqueFilename = new Date().getUTCMilliseconds();

          const folderRef = storageRef.child(
            `images/users/${userId}/${docId}/${uniqueFilename}`
          );

          folderRef.putString(img.data, 'data_url').then(function(snapshot) {
            console.log('Uploaded a data_url string!', snapshot);
          });
        });

        handleClose();
      });
  };

  const submitForm = () => {
    if (editing) {
      editEntry();
    } else {
      saveNewEntry();
    }
  };

  const Image = styled('img')({
    height: '100px',
    width: '100px',
    marginRight: '12px',
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <TextField
          text="Name"
          value={formData.name}
          onChange={handleChange('name')}
        />
        <TextField
          text="Location"
          value={formData.location}
          onChange={handleChange('location')}
        />
        <div>
          <p>Rating</p>
          <Rating
            value={formData.rating}
            onChange={(event, newValue) => {
              handleOnRatingChange(newValue);
            }}
          />
        </div>
        <Dropdown
          items={CUISINES}
          selectedItems={formData.tags}
          onChange={handleOnTagChange}
        />
        <TextField
          text="Description"
          multiline
          rowsMax="6"
          value={formData.description}
          onChange={handleChange('description')}
        />
        <DropZone onDrop={handleOnDrop} />
        <div>
          {images.map(image => (
            <Image src={image.data} onClick={e => handleRemoveImage(image)} />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={submitForm} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
