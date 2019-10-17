import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const [openToast, setOpenToast] = useState(true);

<Snackbar
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
  open={openToast}
  autoHideDuration={6000}
  onClose={() => setOpenToast(false)}
>
  <SnackbarContent
    aria-describedby="client-snackbar"
    onClose={() => setOpenToast(false)}
    variant="error"
    message={
      <span id="client-snackbar">
        <ErrorIcon />
        {`some message`}
      </span>
    }
    action={[
      <IconButton
        key="close"
        aria-label="close"
        color="inherit"
        onClick={() => setOpenToast(false)}
      >
        <CloseIcon />
      </IconButton>,
    ]}
  />
</Snackbar>;
