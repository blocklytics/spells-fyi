import React, { useState } from 'react';

// Apollo
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

// Material UI
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import pink from '@material-ui/core/colors/pink'

// Components
import GridLayout from './components/Content';
import Header from './components/Header';
import SupportedPlatforms from './components/SupportedPlatforms';
import GitCoin from './components/GitCoin';
import { getFilteredPlatforms, FilteredPlatformsContext } from './components/helpers';

// Create an http link:
const httpLink = new HttpLink({
  uri: 'https://api.thegraph.com/subgraphs/name/blocklytics/spells'
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `wss://api.thegraph.com/subgraphs/name/blocklytics/spells`,
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

// MUI Theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: pink['500'],
    },
    secondary: {
      main: '#632894',
    },
    background: {
      default: '#FFFAFF',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.435)',
    }
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 1px 3px 0px rgba(0,0,0,0.06)',
    '0px 3px 1px -2px rgba(0,0,0,0.1),0px 2px 2px 0px rgba(0,0,0,0.07),0px 1px 5px 0px rgba(0,0,0,0.06)',
    '0px 3px 3px -2px rgba(0,0,0,0.1),0px 3px 4px 0px rgba(0,0,0,0.07),0px 1px 8px 0px rgba(0,0,0,0.06)',
    '1px 1px 10px 0px rgba(0,0,0,0.06)', // Used for Platform Avatar
    '0px 3px 5px -1px rgba(0,0,0,0.1),0px 5px 8px 0px rgba(0,0,0,0.07),0px 1px 14px 0px rgba(0,0,0,0.06)',
    '0px 3px 5px -1px rgba(0,0,0,0.1),0px 6px 10px 0px rgba(0,0,0,0.07),0px 1px 18px 0px rgba(0,0,0,0.06)',
    '0px 4px 5px -2px rgba(0,0,0,0.1),0px 7px 10px 1px rgba(0,0,0,0.07),0px 2px 16px 1px rgba(0,0,0,0.06)',
    '0px 5px 5px -3px rgba(0,0,0,0.1),0px 8px 10px 1px rgba(0,0,0,0.07),0px 3px 14px 2px rgba(0,0,0,0.06)',
    '0px 5px 6px -3px rgba(0,0,0,0.1),0px 9px 12px 1px rgba(0,0,0,0.07),0px 3px 16px 2px rgba(0,0,0,0.06)',
    '0px 6px 6px -3px rgba(0,0,0,0.1),0px 10px 14px 1px rgba(0,0,0,0.07),0px 4px 18px 3px rgba(0,0,0,0.06)',
    '0px 6px 7px -4px rgba(0,0,0,0.1),0px 11px 15px 1px rgba(0,0,0,0.07),0px 4px 20px 3px rgba(0,0,0,0.06)',
    '0px 7px 8px -4px rgba(0,0,0,0.1),0px 12px 17px 2px rgba(0,0,0,0.07),0px 5px 22px 4px rgba(0,0,0,0.06)',
    '0px 7px 8px -4px rgba(0,0,0,0.1),0px 13px 19px 2px rgba(0,0,0,0.07),0px 5px 24px 4px rgba(0,0,0,0.06)',
    '0px 7px 9px -4px rgba(0,0,0,0.1),0px 14px 21px 2px rgba(0,0,0,0.07),0px 5px 26px 4px rgba(0,0,0,0.06)',
    '0px 8px 9px -5px rgba(0,0,0,0.1),0px 15px 22px 2px rgba(0,0,0,0.07),0px 6px 28px 5px rgba(0,0,0,0.06)',
    '0px 8px 10px -5px rgba(0,0,0,0.1),0px 16px 24px 2px rgba(0,0,0,0.07),0px 6px 30px 5px rgba(0,0,0,0.06)',
    '0px 8px 11px -5px rgba(0,0,0,0.1),0px 17px 26px 2px rgba(0,0,0,0.07),0px 6px 32px 5px rgba(0,0,0,0.06)',
    '0px 9px 11px -5px rgba(0,0,0,0.1),0px 18px 28px 2px rgba(0,0,0,0.07),0px 7px 34px 6px rgba(0,0,0,0.06)',
    '0px 9px 12px -6px rgba(0,0,0,0.1),0px 19px 29px 2px rgba(0,0,0,0.07),0px 7px 36px 6px rgba(0,0,0,0.06)',
    '0px 10px 13px -6px rgba(0,0,0,0.1),0px 20px 31px 3px rgba(0,0,0,0.07),0px 8px 38px 7px rgba(0,0,0,0.06)',
    '0px 10px 13px -6px rgba(0,0,0,0.1),0px 21px 33px 3px rgba(0,0,0,0.07),0px 8px 40px 7px rgba(0,0,0,0.06)',
    '0px 10px 14px -6px rgba(0,0,0,0.1),0px 22px 35px 3px rgba(0,0,0,0.07),0px 8px 42px 7px rgba(0,0,0,0.06)',
    '0px 11px 14px -7px rgba(0,0,0,0.1),0px 23px 36px 3px rgba(0,0,0,0.07),0px 9px 44px 8px rgba(0,0,0,0.06)',
    '0px 11px 15px -7px rgba(0,0,0,0.1),0px 24px 38px 3px rgba(0,0,0,0.07),0px 9px 46px 8px rgba(0,0,0,0.06)',
  ],
  overrides: {
    MuiTypography: {
      h1: {
        fontWeight: 900,
        fontSize: '3rem',
      },
      h2: { // Section title
        fontWeight: 700,
        fontSize: '3rem',
        letterSpacing: -0.78,
      },
      h3: { // Spell title
        fontWeight: 500,
        fontSize: '1.625rem',
        lineHeight: 1.185,
        letterSpacing: '-0.01rem',
      },
      h4: { // Overline
        fontWeight: 500,
        fontSize: '0.75rem',
        lineHeight: 1.25,
        letterSpacing: '0.06rem',
        textTransform: 'uppercase',
      },
      h6: { // Section subtitle
        fontWeight: 400,
        fontSize: '1.25rem',
        lineHeight: 1.4,
        letterSpacing: '-0.02rem',
      },
      subtitle1: { // Site title
        fontWeight: 900,
        fontSize: '5rem',
        lineHeight: 1.125,
        letterSpacing: -2,
        marginBottom: '3rem',
      },
      body2: {
        fontWeight: 500,
        fontSize: '0.625rem',
      }
    },
    MuiChip: {
      label: {
        paddingRight: '0px',
        paddingLeft: '0px',
      },
    },
    MuiAvatar: {
      root: {
        backgroundColor: 'transparent',
        fontSize: '1rem',
        fontWeight: 500,
      },
    },
    MuiPaper: {
      root: {
        padding: '1.125rem',
        paddingTop: '1rem',
        margin: '1rem',
        marginTop: '2.125rem',
      },
      elevation0: {
        border: '2px solid rgba(222, 222, 222, 0.6)',
      },
      rounded: {
        borderRadius: 4,
      },
    },
    MuiIconButton: {
      sizeSmall: {
        width: 24,
        height: 24,
      },
    },
    MuiButton: {
      root: {
        borderRadius: 2,
        lineHeight: 1.75,
        // '&:hover': {
          // borderWidth: 2,
          //         	backgroundColor: '#FFF',
          //       		boxShadow: defaultTheme.shadows[8],
        // },
      },
      text: {
        marginRight: -8,
        fontSize: 'inherit',
        fontWeight: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
        textTransform: 'inherit',
      },
    },
  },
})


function App() {
  const platforms = getFilteredPlatforms();
  const [filteredPlatforms, setFilteredPlatforms] = useState(platforms);
  return (
    <MuiThemeProvider theme={theme}>
      <FilteredPlatformsContext.Provider value={{ value: filteredPlatforms, set: setFilteredPlatforms }}>
        <ApolloProvider client={client}>
          <Header />
          <SupportedPlatforms />
          <GitCoin />
          <GridLayout />
        </ApolloProvider>
      </FilteredPlatformsContext.Provider>
    </MuiThemeProvider>
  );
}

export default App;
