import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import { styled } from '@material-ui/styles';
import { useRestaurants } from '../../hooks';
import { firebase } from '../../firebase';
import Carousel from '../../components/Carousel';
import FormModal from './FormModal';
import ConfirmationModal from '../../components/ConfirmationModal';
import SpeedDial from '../../components/SpeedDial';
import EditIcon from '@material-ui/icons/Edit';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

import DeleteIcon from '@material-ui/icons/Delete';

import { useRestaurantsActions } from '../../hooks/commands/useRestaurantsActions';

export default function Restaurant(props) {
  const [openForm, setOpenForm] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    name,
    location,
    description,
    tags,
    docId,
    rating,
  } = props.location.state;

  const { fetchRestaurantImages, deleteRestaurant } = useRestaurantsActions();
  const savedImages = useSelector(state => state.selectedRestaurantImages);

  useEffect(() => {
    fetchRestaurantImages(docId);
  }, []);

  // const deleteRestaurant = () => {
  //   const { history } = props;

  // };

  const Div = styled('div')({
    paddingLeft: '24px',
    paddingRight: '24px',
  });

  const H1 = styled('h1')({
    marginBottom: '8px',
  });

  const Tag = styled('span')({
    backgroundColor: '#00AEFF',
    border: '1px solid #0099ff',
    color: '#fff',
    borderRadius: '10%',
    padding: '8px',
    marginRight: '8px',
    display: 'inline-block',
    minWidth: '36px',
    textAlign: 'center',
  });

  const SpeedDialContainer = styled('div')({
    position: 'absolute',
    right: '24px',
    bottom: '24px',
  });

  const LocationContainer = styled('div')({
    display: 'flex',
    marginBottom: '6px',
  });

  const StyledLocationIcon = styled(LocationOnOutlinedIcon)({
    position: 'relative',
    top: '5px',
  });

  const Location = styled('p')({
    fontSize: '18px',
    marginTop: '8px',
    marginLeft: '8px',
  });

  const FullscreenImageContainer = styled('div')({
    width: '90%',
    height: '90%',
    zIndex: '10',
    position: 'absolute',
    top: '0px',
  });

  const Image = styled('img')({
    maxWidth: '90vw',
    maxHeight: '450px',
    width: 'auto',
    height: 'auto',
    position: 'relative',
    top: '25%',
  });

  const Overlay = styled('div')({
    position: 'absolute',
    top: '0',
    height: '100%',
    width: '100%',
    left: '0',
    backgroundColor: 'rgba(0,0,0, 0.8)',
  });

  const actions = [
    {
      icon: <EditIcon />,
      name: 'Edit',
      onClick: () => setOpenForm(true),
    },
    {
      icon: <DeleteIcon />,
      name: 'Delete',
      onClick: () => {
        console.log('??');
        setOpenConfirmation(true);
      },
    },
  ];

  const handleOnImageClick = image => {
    setSelectedImage(image);
  };

  return (
    <Div>
      <H1>{name}</H1>
      <Rating name="simple-controlled" value={rating} readOnly />

      <LocationContainer>
        <StyledLocationIcon />
        <Location>{location}</Location>
      </LocationContainer>
      {tags && tags.map(t => <Tag>{t}</Tag>)}

      {savedImages.length > 0 && (
        <React.Fragment>
          <h2>Photos</h2>
          <Carousel onImageClick={handleOnImageClick} photos={savedImages} />
        </React.Fragment>
      )}

      <h2>Description</h2>
      <p>{description}</p>

      <SpeedDialContainer>
        <SpeedDial actions={actions} />
      </SpeedDialContainer>
      <FormModal
        title="Edit Restaurant"
        open={openForm}
        editing
        onClose={() => setOpenForm(false)}
        data={props.location.state}
      />
      <ConfirmationModal
        open={true}
        onClose={() => setOpenConfirmation(false)}
        onNo={() => setOpenConfirmation(false)}
        onYes={() => deleteRestaurant(docId)}
      />
      {selectedImage && (
        <React.Fragment>
          <Overlay />
          <FullscreenImageContainer
            onClick={() => selectedImage && setSelectedImage(null)}
          >
            <Image src={selectedImage} />
          </FullscreenImageContainer>
        </React.Fragment>
      )}
    </Div>
  );
}
