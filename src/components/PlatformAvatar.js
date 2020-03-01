
import React from 'react';

// Material UI
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Platform images
import Compound from '../images/Compound.png'
import Curve from '../images/Curve.jpg'
import DDEX from '../images/DDEX.png'
import Dharma from '../images/Dharma.jpg'
import Maker from '../images/Maker.jpg'

const useStyles = makeStyles(theme => ({
    small: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
      marginTop: -theme.spacing(4),
      boxShadow: theme.shadows[4],
    },
    row: {
        marginBottom: theme.spacing(1)
    },
    rowSmall: {
        marginBottom: theme.spacing(0.5)
    },
    rowLabel: {
        color: 'rgba(0,0,0,0.52)',
    },
    sectionHeader: {
        marginBottom: theme.spacing(9),
    },
  }));

export const PlatformAvatar = ({ platform, large, children, ...props }) => {
    const classes = useStyles();
    let imgSrc = null
    if (platform === "Compound") imgSrc = Compound
    if (platform === "Curve") imgSrc = Curve
    if (platform === "DDEX") imgSrc = DDEX
    if (platform === "Dharma") imgSrc = Dharma
    if (platform === "Maker") imgSrc = Maker
    return <Avatar src={imgSrc} className={ large ? classes.large : classes.small} {...props}>{children}</Avatar>
}