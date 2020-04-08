import React from 'react';

// Material UI
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { PlatformAvatar } from './PlatformAvatar';

const platforms = [
    'Maker', 'Compound', 'Dharma', 'DDEX', 'Curve', 'DyDx'
]

const useStyles = makeStyles(theme => ({
    subtitle: {
      marginBottom: theme.spacing(9),
      padding: theme.spacing(4)
    },
  }));

export const Header = () => {
    const classes = useStyles();
    return (
        <Grid container className={classes.subtitle}>
            <Grid item xs={12}>
                <Typography variant="subtitle1" align="center">See the future</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary" paragraph align="center">Review upcoming changes for supported platforms:</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container direction="row" justify="center" spacing={2}>
                { platforms.map(platform =>
                    <Grid item key={platform}>
                        <PlatformAvatar platform={platform} tooltip />
                    </Grid>
                )}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Header