import React, { useContext } from 'react';

// Material UI
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { PlatformAvatar } from './PlatformAvatar';
import { FilteredPlatformsContext } from './helpers';

const platforms = [
    'Maker', 'Compound', 'Dharma', 'DDEX', 'Curve', 'DyDx'
]

const useStyles = makeStyles(theme => ({
    subtitle: {
      marginBottom: theme.spacing(9),
      padding: theme.spacing(4)
    },
  }));

const filterByPlatform = (platform, context) => {
    return () => {
        const pltfrm = platform.toLowerCase();
        const { value: filteredPlatforms, set: setFilteredPlatforms } = context;

        if (filteredPlatforms && filteredPlatforms.length === 1 && filteredPlatforms[0] === pltfrm) {
            window.history.pushState(null, "", "/");
            setFilteredPlatforms([]);
        } else {
            window.history.pushState(null, "", `?platform=${pltfrm}`);
            setFilteredPlatforms([pltfrm]);
        }
    };
}

export const Header = () => {
    const classes = useStyles();
    const context = useContext(FilteredPlatformsContext);
    const { value: filteredPlatforms } = context;
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
                        <div onClick={filterByPlatform(platform, context).bind(this)}>
                            <PlatformAvatar
                                tooltip
                                clickable
                                platform={platform}
                                isUnhighlighted={filteredPlatforms && filteredPlatforms.length && !filteredPlatforms.includes(platform.toLowerCase())}
                            />
                        </div>
                    </Grid>
                )}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Header