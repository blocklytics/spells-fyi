import React from 'react';

// Material UI
import { Grid, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { PlatformAvatar } from './PlatformAvatar';

const platforms = [
    'Maker', 'Compound', 'Dharma', 'DDEX', 'Curve'
]

const useStyles = makeStyles(theme => ({
    subtitle: {
      marginBottom: theme.spacing(9),
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
        <Grid container className={classes.subtitle}>
            <Grid item xs={12}>
                <Typography variant="subtitle1" align="center">See the future of protocol upgrades</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" paragraph align="center">Currently supported</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container direction="row" justify="center" spacing={4}>
                { platforms.map(platform =>
                    <Grid item>
                        <PlatformAvatar platform={platform} />
                        <Typography variant="body1" align="center">{platform}</Typography>
                    </Grid>
                )}
                    <Grid item>
                        <PlatformAvatar><Add /></PlatformAvatar>
                        <Typography variant="body1" align="center">{' '}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Header