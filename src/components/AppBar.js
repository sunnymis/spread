import React, { useState } from 'react';
import { AppBar as MUIAppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import firebase from 'firebase';

export default function AppBar(props) {
  const { drawerItems, history } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: '#00AEFF',
    },
  }));

  const classes = useStyles();

  const logOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        localStorage.removeItem('spreadUserId');
        setDrawerOpen(false);
        history.push('/login');
      })
      .catch(function(error) {
        console.log('error', error);
      });
  };

  const menuItems = [
    {
      text: 'Log out',
      icon: <InboxIcon />,
      callback: logOutUser,
    },
  ];

  const sideList = () => (
    <List>
      {menuItems.map((item, index) => (
        <ListItem button key={index} onClick={item.callback}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <MUIAppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Spread
        </Typography>
      </Toolbar>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {sideList()}
      </Drawer>
    </MUIAppBar>
  );
}
