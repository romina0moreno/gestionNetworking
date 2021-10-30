import React from 'react';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/colors';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles({
  avatar: {
    margin: 10,
  },
});

export default function LetterAvatars() {
  const classes = useStyles();

  return (
      <Avatar className={classes.avatar}>D</Avatar>
  );
}
