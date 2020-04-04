
import React from 'react';

// Material UI
import { Avatar, Tooltip } from '@material-ui/core';
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
      boxShadow: theme.shadows[4],
    },
    large: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      boxShadow: theme.shadows[4],
    },
  }));

export const PlatformAvatar = ({ platform, large, children, tooltip, props }) => {
    const classes = useStyles();
    let imgSrc = null
    if (platform === "Compound") imgSrc = Compound
    if (platform === "Curve") imgSrc = Curve
    if (platform === "DDEX") imgSrc = DDEX
    if (platform === "Dharma") imgSrc = Dharma
    if (platform === "Maker") imgSrc = Maker
    let avatar = <Avatar src={imgSrc} className={ large ? classes.large : classes.small} {...props}>{children}</Avatar>
    return tooltip ? <Tooltip title={platform} arrow>{ avatar }</Tooltip> : avatar
}