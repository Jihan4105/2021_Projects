import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default function MenuBar() {
  return(
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2}} >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            To Do List
          </Typography>
          <Button href="http://localhost:3000/daily" color="inherit">Home</Button>
          <Button href="http://localhost:3000/list" color="inherit">Search</Button>
          <Button href="http://localhost:3000/login" color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}