import React from 'react';

// Material UI
import { Chip, Grid, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink'

import Blocky from '../images/fireball.png'

const useStyles = makeStyles(theme => ({
    topBar: {
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2)
    },
    logo: {
      height: 90,
    },
    logoText: {
      fontFamily: 'Roboto',
      fontWeight: 900,
      fontSize: '3rem',
      color: 'rgba(0,0,0,1)',
      letterSpacing: '-0.05625rem',
    },
    fyiTag: {
      background: pink['500'],
      color: 'rgba(255, 255, 255, 0.87)',
      border: '1px solid rgba(255, 255, 255, 0.87)',
      borderRadius: 2,
      height: 20,
      marginTop: -22,
      marginLeft: -9,
      width: 30,
    },
  }));

export const Header = () => {
    const classes = useStyles();
    return (
      <Grid className={classes.topBar}
          container 
          direction="row" 
          alignItems="center" 
          justify="space-between"
      >
      <Grid item>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          wrap="nowrap"
        >
          <img src={ Blocky } className={classes.logo} alt="Blocklytics" />
          <Typography className={classes.logoText}>Spells</Typography>
          <Chip label=".fyi" className={classes.fyiTag} />
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" alignItems="center" justify="flex-end" spacing={4}>
          <Grid item>
            <Typography>
            <Link href="https://github.com/blocklytics/spells-fyi" target="_blank">Code</Link>
            </Typography>
          </Grid>
          <Grid item>
            <Link href="https://thegraph.com/explorer/subgraph/blocklytics/spells" target="_blank">Data</Link>
          </Grid>
          {/* <Grid item>
            <Link>Bounties</Link>
          </Grid> */}
          <Grid item>
            <Link href="https://twitter.com/spellsfyi" target="_blank">Twitter</Link>
          </Grid>
          <Grid item>
            <Link href="https://discordapp.com/invite/GFxFN3K" target="_blank">Chat</Link>
          </Grid>
        </Grid>
      </Grid>
      </Grid>
    )
}

export default Header