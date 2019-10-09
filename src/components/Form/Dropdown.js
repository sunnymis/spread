import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';

export default function Dropdown(props) {
  const { items, selectedItems } = props;

  const handleChangeItems = event => {
    props.onChange(event.target.value);
  };

  const useStyles = makeStyles(theme => ({
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
  }));

  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <p htmlFor="select-multiple-chip">Tags</p>
      <Select
        multiple
        value={selectedItems}
        onChange={handleChangeItems}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(value => (
              <Chip key={value} label={value} />
            ))}
          </div>
        )}
      >
        {items.map(item => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
