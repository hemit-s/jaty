import PropTypes from 'prop-types';
import React, {
  createContext, useContext, useState,
} from 'react';

const DEFAULT_STATE = {
  addresses: ['242 Albert St, Waterloo, ON', '295 Lester St, Waterloo, ON', '296 Hemlock St, Waterloo, ON'],
  destination: '200 University Ave W, Waterloo, ON',
  results: {},
  setResults: () => {},
};

const AppContext = createContext(DEFAULT_STATE);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [destination, setDestination] = useState('');

  const [results, setResults] = useState({});
  const appState = {
    // ...DEFAULT_STATE,
    results,
    setResults,
    addresses,
    setAddresses,
    destination,
    setDestination,
  };
  return (
    <AppContext.Provider value={appState}>{children}</AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
