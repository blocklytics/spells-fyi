import React from 'react';

import { Avatar, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Blocky from '../images/fire.png'

const useStyles = makeStyles(theme => ({
    topBar: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(9),
      marginRight: theme.spacing(2),
      padding: theme.spacing(4)
    },
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      boxShadow: 'none',
    },
  }));

export const Header = () => {
    const classes = useStyles();
    return (
        <Grid className="topBar"
            container 
            direction="row" 
            alignItems="center" 
            justify="flex-start">
            <Grid item>
                <Avatar src={ Blocky } variant="square" elevation={0} className={classes.large} />
            </Grid>
            <Grid item>
                <Typography variant="h1">Spells.fyi</Typography>
            </Grid>
        </Grid>
    )
}

export default Header