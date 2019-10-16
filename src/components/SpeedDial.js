import MUISpeedDial from '@material-ui/lab/SpeedDial';
import MUISpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SettingsIcon from '@material-ui/icons/Settings';
import MUISpeedDialAction from '@material-ui/lab/SpeedDialAction';

import React from 'react';

export default function SpeedDial(props) {
  const { actions } = props;
  const [open, setOpen] = React.useState(false);

  const handleOpenClose = () => {
    setOpen(!open);
  };

  const handleOnActionClick = action => {
    action.onClick();
    handleOpenClose();
  };

  return (
    <MUISpeedDial
      ariaLabel="SpeedDial Edit/Delete"
      icon={<SettingsIcon />}
      open={open}
      direction="up"
      hidden={false}
      onClick={handleOpenClose}
    >
      {actions.map(action => (
        <MUISpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => handleOnActionClick(action)}
        />
      ))}
    </MUISpeedDial>
  );
}
