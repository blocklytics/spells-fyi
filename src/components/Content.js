import React, { useEffect, useRef } from 'react';

// Apollo
import { useQuery } from '@apollo/react-hooks';

// Material UI
import { Divider, Grid, Link, Paper, Typography } from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import moment from 'moment';

import { PlatformAvatar } from './PlatformAvatar';
import { spells } from '../gql/sub';

const useStyles = makeStyles(theme => ({
    row: {
        marginTop: theme.spacing(1)
    },
    rowSmall: {
        marginTop: theme.spacing(0.5)
    },
    rowLabel: {
        color: 'rgba(0,0,0,0.6)',
    },
    sectionHeader: {
        marginBottom: theme.spacing(2),
    },
    sectionSubheader: {
        color: 'rgba(0,0,0,0.4)',
        marginBottom: theme.spacing(9),
    },
  }));

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

// function sliceAddress(address) {
//     return `${address.slice(0,6)}...${address.slice(-4)}`
// }

// function convertWei(tokenAddress, amount) {
//     const decimals = 18
//     const wei = utils.bigNumberify(amount)
//     // TODO - get actual decimals for tokenAddress
//     return parseFloat(utils.formatUnits(wei, decimals)).toLocaleString([], ({minimumFractionDigits: 4, maximumFractionDigits: 4}))
// }

const Moment = ({timestamp}) => {
    return moment(parseInt(timestamp) * 1000).format('LLL')
}

// const MomentTimeAgo = ({ id, timestamp }) => {
//     const momentObject = moment(parseInt(timestamp) * 1000)
//     const [fromNow, setFromNow] = useState(momentObject.fromNow())

//     useInterval(() => {
//         setFromNow(momentObject.fromNow())
//     }, 1000)

//     return fromNow
// }

const Row = ({label, content, smallContent}) => {
    const classes = useStyles();
    return (
        <Grid container direction="row" justify="space-between" className={smallContent ? classes.rowSmall : classes.row }>
            <Grid item>
                <Typography variant={smallContent ? "body2" : "body1" } className={classes.rowLabel}>{ label }</Typography>
            </Grid>
            <Grid item zeroMinWidth>
                <Typography variant={smallContent ? "body2" : "body1" } noWrap>{ content }</Typography>
            </Grid>
        </Grid>
    )
}

const etherscanUrlForTx = tx => `https://etherscan.io/tx/${tx}`

// const breakData = str => {
//     var chunks = [];
//     for (var i = 0, charsLength = str.length; i < charsLength; i += 40) {
//         chunks.push(str.substring(i, i + 40));
//     }
//     console.log(chunks)
//     return chunks.join('\n')
// }

const Content = ({ data }) => {
    const classes = useStyles();
    if (!data) return null

    return data.map(({
        id,
        createdAtTransaction,
        createdAtTimestamp,
        executedAtTimestamp,
        executedAtTransaction,
        eta,
        value,
        functionName,
        signature,
        data,
        description,
        target,
        timelock,
        isExecuted,
        isCancelled
    }, idx) => {
        const platform = timelock.platform.id
        const targetId = target.id
        return (
            <Paper elevation={6} key={id}>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2}>
                    <Grid item><PlatformAvatar large platform={platform} /></Grid>
                    <Grid item><Typography paragraph variant="h3">{platform}</Typography></Grid>
                </Grid>
                <Typography paragraph variant="h3">{description || functionName || signature} Spell</Typography>
                { isExecuted ? (
                    <Row label="Executed" content={<Link href={etherscanUrlForTx(executedAtTransaction)} target="_blank"><Moment id={idx} timestamp={executedAtTimestamp} /> <OpenInNew fontSize="small" /></Link>} />
                ) : (
                    <Row label="Timelock ends" content={eta === "0" ? "To be determined" : <Moment id={idx} timestamp={eta} />} />
                )}
                <Row label="Cast" content={<Link href={etherscanUrlForTx(createdAtTransaction)} target="_blank"><Moment id={idx} timestamp={createdAtTimestamp} /> <OpenInNew fontSize="small" /></Link>} />
                <Divider className={classes.rowSmall} />
                <Row label="Target" content={ targetId } smallContent />
                <Row label="Value" content={ value } smallContent />
                <Row label="Function" content={ functionName || signature } smallContent />
                <Row label="Data" content={ data } smallContent />
            </Paper>
        )
    })
}

const GridLayout = () => {
    /* 
    //  HTTP and WebSocket hooks
    //    - for http: useQuery
    //    - for ws: useSubscription
    */

    
    const classes = useStyles();
    const { loading, error, data } = useQuery(spells())
    console.log(loading, data)
    if (error) console.log(error)

    return (
        <Grid container direction="row" spacing={2}>
            <Grid item xs={12} sm={6}>
                <Typography variant="h2" align="center" paragraph className={classes.sectionHeader}>Timelocked</Typography>
                <Typography variant="h6" align="center" paragraph className={classes.sectionSubheader}>This list of spells cannot be executed before the timelock ends.</Typography>
                <Content data={data && data.future} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h2" align="center" paragraph className={classes.sectionHeader}>Executed</Typography>
                <Typography variant="h6" align="center" paragraph className={classes.sectionSubheader}>This list of spells has already been executed.</Typography>
                <Content data={data && data.past} />
            </Grid>
        </Grid>
    )
}

export default GridLayout