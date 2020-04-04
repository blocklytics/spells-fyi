import React, { useState } from 'react';

// Apollo
import { useQuery } from '@apollo/react-hooks';

// Material UI
import { Button, Grid, Paper, Typography, CircularProgress } from '@material-ui/core';

import moment from 'moment';
import { PlatformAvatar } from './PlatformAvatar';
import { spells } from '../gql/sub';
import { useInterval, sliceAddress, Moment, etherscanUrlForTx, etherscanUrlForAddress } from './helpers';

const SpellCounter = ({ text, timestamp }) => {
    const momentObject = moment(parseInt(timestamp) * 1000)
    const [fromNow, setFromNow] = useState(momentObject.fromNow())

    useInterval(() => {
        setFromNow(momentObject.fromNow())
    }, 1000)

    return text + fromNow
}

const Row = ({label, content}) => {
    return (
        <Grid container direction="row" justify="space-between" alignItems="center" style={{ marginTop: 8, marginBottom: 8, minHeight: 36 }}>
            <Grid xs item>
                <Typography variant="body1" color="textSecondary">{ label }</Typography>
            </Grid>
            <Grid item zeroMinWidth>
                <Typography variant="body1" noWrap>{ content }</Typography>
            </Grid>
        </Grid>
    )
}

// const breakData = str => {
//     var chunks = [];
//     for (var i = 0, charsLength = str.length; i < charsLength; i += 40) {
//         chunks.push(str.substring(i, i + 40));
//     }
//     console.log(chunks)
//     return chunks.join('\n')
// }

const Content = ({ data, loading }) => {
    if (loading) return (
        <Paper elevation={0}>
            <CircularProgress />
        </Paper>
    )

    return data && data.map(({
        id,
        createdAtTransaction,
        createdAtTimestamp,
        executedAtTimestamp,
        executedAtTransaction,
        expiresAtTimestamp,
        eta,
        functionName,
        signature,
        data,
        description,
        target,
        timelock,
        isExecuted,
        isCancelled
    }, idx) => {
        //Hide expired spells which were not executed
        const now_seconds = Date.now() / 1000
        const isExpired = now_seconds > expiresAtTimestamp && expiresAtTimestamp !== "0"
        if (isExpired && !isExecuted) return null

        const platform = timelock.platform.id
        const targetId = target.id
        const targetName = target.name ? target.name : sliceAddress(targetId)

        let spellTitle = description || functionName || signature
        if (spellTitle === functionName) {
            spellTitle = spellTitle.replace(/^_*/, '') // Remove starting underscores
            spellTitle = spellTitle.replace(/\(.*\)/, '') // Remove function arguments
            spellTitle = spellTitle.replace(/([a-z0-9])([A-Z])/g, '$1 $2') // Convert camel case
            spellTitle = spellTitle.charAt(0).toUpperCase() + spellTitle.slice(1)
        }
        if (spellTitle.substring(spellTitle.length-5).toLowerCase() !== "spell") {
            spellTitle += " Spell"
        }

        let spellCounter, executionRow;
        if (isExecuted) {
            spellCounter = <SpellCounter text=" • Executed " timestamp={executedAtTimestamp} />
            executionRow = <Row label="Executed" content={<Button href={etherscanUrlForTx(executedAtTransaction)} target="_blank" variant="text" color="primary"><Moment id={idx} timestamp={executedAtTimestamp} /></Button>} />
        }
        else if (eta > 0) {
            if (eta > now_seconds) {
                spellCounter = <SpellCounter text=" • Unlocks " timestamp={eta} />
                executionRow = <Row label="Timelock ends" content={<Moment timestamp={eta} />} />
            }
            else {
                spellCounter = <SpellCounter text=" • Unlocked " timestamp={eta} />
                executionRow = <Row label="Timelock ended" content={<Moment timestamp={eta} />} />
            }
        } else {
            executionRow = <Row label="Timelock ends" content="Scheduling tbd" />
        }

        return (
            <Paper elevation={0} key={id}>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2}>
                    <Grid item><PlatformAvatar large platform={platform} /></Grid>
                    <Grid item xs container direction="column" spacing={0}>
                        <Grid item><Typography variant="h4" color="textSecondary">{platform}{spellCounter}</Typography></Grid>
                        <Grid item><Typography paragraph variant="h3">{spellTitle}</Typography></Grid>
                    </Grid>
                </Grid>
                {executionRow}
                <Row label="Cast" content={<Button href={etherscanUrlForTx(createdAtTransaction)} target="_blank" variant="text" color="primary"><Moment id={idx} timestamp={createdAtTimestamp} /></Button>} />
                <Row label="Target" content={ <Button href={etherscanUrlForAddress(targetId)} target="_blank" variant="text" color="primary">{targetName}</Button> } />
                <Row label="Function" content={ functionName || signature } />
                <Row label="Data" content={ data } />
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
    const { loading, error, data } = useQuery(spells())
    if (error) console.log(error)

    return (
        <Grid container direction="row" spacing={2}>
            <Grid item xs={12} sm={6}>
                <Typography variant="h2" align="center" color="textPrimary" paragraph>Timelocked</Typography>
                <Typography variant="h6" align="center" color="textSecondary" paragraph>This list of spells cannot be executed before the timelock ends.</Typography>
                <Content data={data && data.future} loading={loading} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h2" align="center" paragraph>Executed</Typography>
                <Typography variant="h6" align="center" color="textSecondary" paragraph>This list of spells has already been executed.</Typography>
                <Content data={data && data.past} loading={loading} />
            </Grid>
        </Grid>
    )
}

export default GridLayout