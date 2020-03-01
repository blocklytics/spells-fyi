import { useCallback } from 'react';
import { gql } from 'apollo-boost';

export const spells = () => {
    // const timestamp = Date.now() / 1000
    return gql`
    {
        future:txes(
                # first: 5, 
                orderBy: eta, 
                orderDirection: asc,
                where:{
                    isCancelled: false,
                    isExecuted: false,
                    eta_gt: "1583041442" # TODO - dynamic
                }
            ) {
                id
                eta
                createdAtTimestamp
                createdAtTransaction
                cancelledAtTimestamp
                cancelledAtTransaction
                executedAtTimestamp
                executedAtTransaction
                signature
                data
                # target
                timelock {
                    id
                    platform { id }
                }
                isCancelled
                isExecuted
            }
        past:txes(
            first: 10, 
            orderBy: executedAtTimestamp, 
            orderDirection: desc,
            where:{
                isExecuted: true
            }
        ) {
            id
            eta
            createdAtTimestamp
            createdAtTransaction
            cancelledAtTimestamp
            cancelledAtTransaction
            executedAtTimestamp
            executedAtTransaction
            signature
            data
            # target
            timelock {
                id
                platform { id }
            }
            isCancelled
            isExecuted
        }
    }`
}