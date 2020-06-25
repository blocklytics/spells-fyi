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
    query($name:String!, $owner:String!) {
        
        repository(owner: $owner, name: $name) {
            id
            name
            collaborators(first: 4) {
                edges {
                  node {
                    id
                    login
                    avatarUrl
                  }
                }
            }
        }
      }
    `;
};

export const Contributors = () => {
    const classes = useStyles();

    const { loading: loading, error: error, data: repo_fyi } = useQuery(repository(), {
        context: { clientName: "github" }, variables: { owner: "blocklytics", name: "spells-fyi" }
    });
    const { loading: loading_subgraph, error: error_subgraph, data: repo_subgraph } = useQuery(repository(), {
        context: { clientName: "github" }, variables: { owner: "blocklytics", name: "spells-subgraph" }
    });


    if (error) console.log(error)

    if (error || error_subgraph || (!repo_fyi && !repo_subgraph))
        return (<Fragment></Fragment>)


    return (
        <Grid container className={classes.subtitle}>
            <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary" paragraph align="center">Our contributors:</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container direction="row" justify="center" spacing={2}>
                    {loading && loading_subgraph ? <CircularProgress align="center" /> : <Fragment />}
                    {repo_fyi && repo_fyi.repository.collaborators.edges.map(edge =>
                        <Grid item key={edge.node.id}>
                            <Link href={"https://github.com/" + edge.node.login}>

                                <ContributorAvatar
                                    tooltip
                                    clickable
                                    contributor={edge.node}
                                />
                            </Link>
                        </Grid>
                    )}
                    {repo_subgraph && repo_subgraph.repository.collaborators.edges.map(edge =>
                        <Grid item key={edge.node.id}>
                            <Link href={"https://github.com/" + edge.node.login}>

                                <ContributorAvatar
                                    tooltip
                                    clickable
                                    contributor={edge.node}
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