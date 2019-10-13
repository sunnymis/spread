import React, { useState, useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';
import { styled } from '@material-ui/styles';
import { useRestaurants } from '../../hooks';
import { firebase } from '../../firebase';
import Carousel from '../../components/Carousel';
import FormModal from './FormModal';
import ConfirmationModal from '../../components/ConfirmationModal';

export default function Restaurant(props) {
  const { restaurants, setRestaurants } = useRestaurants();
  const [openForm, setOpenForm] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [savedImages, setSavedImages] = useState([]);

  const { name, location, description, tags, docId } = props.location.state;

  useEffect(() => {
    const storage = firebase.storage();
    const storageRef = storage.ref(`images/user1235/${docId}`);

    storageRef.listAll().then(data => {
      data.items.forEach(file => {
        file.getDownloadURL().then(url => {
          setSavedImages(imgs => [...imgs, url]);
        });
      });
    });
  }, []);

  const deleteRestaurant = () => {
    const { history } = props;

    firebase
      .firestore()
      .collection('restaurants')
      .doc(docId)
      .delete()
      .then(() => {
        setRestaurants([...restaurants]);
        history.replace('/restaurants');
      });
  };

  const Div = styled('div')({
    paddingLeft: '16px',
  });

  const Tag = styled('span')({
    backgroundColor: '#00AEFF',
    border: '1px solid #0099ff',
    color: '#fff',
    borderRadius: '10%',
    padding: '8px',
  });

  return (
    <Div>
      <h1>{name}</h1>
      <Rating name="simple-controlled" value={props.rating} readOnly />

      <p>{location}</p>
      {tags && tags.map(t => <Tag>{t}</Tag>)}

      {savedImages.length > 0 && (
        <React.Fragment>
          <h2>Photos</h2>
          <Carousel photos={savedImages} />
        </React.Fragment>
      )}

      <h2>Description</h2>
      <p>{description}</p>

      <button onClick={() => setOpenConfirmation(true)}>Delete</button>
      <button onClick={() => setOpenForm(true)}>
        Edit (this technically adds)
      </button>
      <FormModal
        title="Edit Restaurant"
        open={openForm}
        onClose={() => setOpenForm(false)}
        data={props.location.state}
      />
      <ConfirmationModal
        open={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
        onNo={() => setOpenConfirmation(false)}
        onYes={() => deleteRestaurant()}
      />
    </Div>
  );
}
