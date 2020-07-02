import React, { Fragment } from 'react';

// Material UI
import { Grid, Typography, Link, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ContributorAvatar } from './ContributorAvatar';

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";



const useStyles = makeStyles(theme => ({
    subtitle: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(4)
    },
}));


const repository = () => {
    return gql`
    query {
        contributors_fyi @rest(type: "[Contributor]", path: "/repos/blocklytics/spells-fyi/contributors") {
            login
            avatar_url
          }

          contributors_subgraph @rest(type: "[Contributor]", path: "/repos/blocklytics/spells-subgraph/contributors") {
            login
            avatar_url
          }
      }
    `;
};

export const Contributors = () => {
    const classes = useStyles();

    const { loading, error, data } = useQuery(repository(), {
        context: { clientName: "github" }
    });
    if (error) console.log(error)
    if (error || !data)
        return (<Fragment></Fragment>)

    return (
        <Grid container className={classes.subtitle}>
            <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary" paragraph align="center">Our contributors:</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container direction="row" justify="center" spacing={2}>
                    {loading ? <CircularProgress align="center" /> : <Fragment />}
                    {data && [...new Map([...data.contributors_subgraph, ...data.contributors_fyi].filter(o => { return o.login != "dependabot[bot]" }).map(o => [o.login, o])).values()].map(edge =>

                        <Grid item key={edge.login}>
                            <Link href={"https://github.com/" + edge.login}>

                                <ContributorAvatar
                                    tooltip
                                    clickable
                                    contributor={edge}
                                />
                            </Link>
                        </Grid>
                    )}

                </Grid>
            </Grid>
        </Grid>
    )
}

export default Contributors