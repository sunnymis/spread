import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmationModal(props) {
  const { open, onClose, onNo, onYes } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This will permanently delete this entry
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onNo} color="primary" autoFocus>
          No
        </Button>
        <Button onClick={onYes} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
