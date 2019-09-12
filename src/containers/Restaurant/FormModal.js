import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


export default function FormModal(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
      height: 'auto',
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const {
    open
  } = props;

  const handleClose = () => {
    props.onClose();
  }
  
  const tags = [
    'pizza',
    'burgers',
    'cuisine',
  ]

  const StyledRating = withStyles({
    iconFilled: {
      color: '#ff6d75',
    },
    iconHover: {
      color: '#ff3d47',
    },
  })(Rating);
  
  function getLabelText(value) {
    return `${value} Heart${value !== 1 ? 's' : ''}`;
  }
  
  const classes = useStyles();
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit/New</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="location"
            label="Location"
            type="text"
            fullWidth
            variant="outlined"
          />
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography component="legend">Rating</Typography>
            <StyledRating
              name="customized-color"
              value={2}
              getLabelText={getLabelText}
              precision={0.5}
              icon={<FavoriteIcon fontSize="inherit" />}
            />
          </Box>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-chip">Tags</InputLabel>
            <Select
              multiple
              value={['pizza', 'burger', 'italian','pizza', 'burger', 'italian','pizza', 'burger', 'italian']}
              onChange={(event) => console.log('event', event.target.value)}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
              // MenuProps={MenuProps}
            >
              {tags.map(tag => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            rowsMax="4"
            value={null}
            onChange={(event) => console.log('value', event.target.value)}
            margin="normal"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

