import React from 'react';
import MUITextField from '@material-ui/core/TextField';
import kebabCase from 'lodash/kebabCase';

export default function TextField(props) {
  const { text, onChange } = props;

  const handleOnChange = event => {
    onChange(event.target.value);
  };

  return (
    <MUITextField
      margin="normal"
      id={kebabCase(text)}
      label={text}
      type="text"
      fullWidth
      variant="outlined"
      value={props.value}
      onChange={handleOnChange}
      {...props}
    />
  );
}
