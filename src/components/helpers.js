import React, { useEffect, useRef } from 'react';
import moment from 'moment';

export function sliceAddress(address) {
    return `${address.slice(0,6)}...${address.slice(-4)}`
}

export const Moment = ({timestamp}) => {
    return moment(parseInt(timestamp) * 1000).format('LLL')
}

export const etherscanUrlForTx = tx => `https://etherscan.io/tx/${tx}`

export const etherscanUrlForAddress = address => `https://etherscan.io/address/${address}`

export function useInterval(callback, delay) {
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

export function getUrlParams() {
  const queryString = window.location.search;
  const kvPairs = queryString.substring(1).split('&').map(param => param.split('='));

  return Object.fromEntries(kvPairs);
}

export function getFilteredPlatforms() {
  const { platform } = getUrlParams();

  return platform && platform.split(',').map(str => str.toLowerCase());
}

export const FilteredPlatformsContext = React.createContext({
  value: [],
  set: () => {},
});
