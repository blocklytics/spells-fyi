
import React from 'react';

// Material UI
import { Avatar, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    small: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        boxShadow: theme.shadows[4],
    },
    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        boxShadow: theme.shadows[4],
    },
    unhighlighted: {
        opacity: 0.2,
    },
    clickable: {
        cursor: "pointer",
    }
}));

export const ContributorAvatar = ({ contributor, large, children, tooltip, clickable, isUnhighlighted, props }) => {
    const classes = useStyles();

    let avatar = <Avatar src={contributor.avatar_url} className={`
      ${large ? classes.large : classes.small}
      ${isUnhighlighted && classes.unhighlighted}
      ${clickable && classes.clickable}
    `} {...props}>{children}</Avatar>
    return tooltip ? <Tooltip title={contributor.login} arrow>{avatar}</Tooltip> : avatar
}