import React, { useState } from 'react';
import { styled } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

export default function Carousel(props) {
  const { photos } = props;
  const maxSteps = photos.length;
  const [activeStep, setActiveStep] = useState(0);

  function handleBack() {
    setActiveStep(activeStep => activeStep - 1);
  }

  function handleNext() {
    setActiveStep(activeStep => activeStep + 1);
  }

  function handleStepChange(step) {
    setActiveStep(step);
  }

  const Image = styled('img')({
    height: '250px',
    width: '250px',
    margin: '0 auto',
  });

  const ImageContainer = styled('div')({
    display: 'flex',
  });

  const useStyles = makeStyles({
    mobileStepperRoot: {
      background: '#fff',
    },
  });

  const classes = useStyles();

  return (
    <div>
      <SwipeableViews
        index={activeStep}
        enableMouseEvents
        onChangeIndex={handleStepChange}
      >
        {photos.map((photo, index) => (
          <ImageContainer key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Image src={photo} alt={'placeholder'} />
            ) : null}
          </ImageContainer>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        classes={{
          root: classes.mobileStepperRoot,
        }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </div>
  );
}
