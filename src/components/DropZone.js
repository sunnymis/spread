import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import { useDropzone } from 'react-dropzone';

export default function DropZone(props) {
  const onDrop = useCallback(acceptedFiles => {
    props.onDrop(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const useStyles = makeStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    icon: {
      height: '50px',
      width: '50px',
    },
  });

  const classes = useStyles();
  return (
    <div className={classes.container} {...getRootProps()}>
      <input multiple {...getInputProps()} />
      <p>Upload Files</p>
      <BackupOutlinedIcon className={classes.icon} />
    </div>
  );
}
