import PropTypes from 'prop-types';
import React, { createContext, useContext } from 'react';

const DEFAULT_STATE = {
  addresses: ['test address'],
  destination: 'test destination',
};

const AppContext = createContext(DEFAULT_STATE);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const appState = DEFAULT_STATE;
  return (
    <AppContext.Provider value={appState}>{children}</AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
