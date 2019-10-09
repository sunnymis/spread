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

export default function FormModal(props) {
  const { open, data, title } = props;
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
      setImages(imgs => [...imgs, e.target.result]);
    };

    reader.readAsDataURL(file);
  }

  const handleRemoveImage = image => {
    setImages(imgs => imgs.filter(img => img !== image));
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
            <Image src={image} onClick={e => handleRemoveImage(image)} />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
