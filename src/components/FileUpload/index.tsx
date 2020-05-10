import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onDrop(files: File[]): void;
}

function FileUpload(props: Props) {
  const onDrop = useCallback((acceptedFiles) => {
    props.onDrop(acceptedFiles);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input multiple {...getInputProps()} />
      <p>Upload Files</p>
    </div>
  );
}

export default FileUpload;
