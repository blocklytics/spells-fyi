import React from 'react';

// Material UI
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    subtitle: {
      marginBottom: theme.spacing(6),
    },
  }));

const GitCoin = () => {
    const classes = useStyles();
    return (
        <Grid container justify="center" className={classes.subtitle}>
            <Grid item xs={12} sm={9} md={6}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h4" color="textSecondary" paragraph>GitCoin Grants CLR Round 6</Typography>
                        <Typography variant="h6" paragraph>Spells.fyi is a community good that gets better with your support.</Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" href="https://gitcoin.co/grants/601/spellsfyi-see-the-future" target="_blank">Contribute to Spells.fyi</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}

export default GitCoin