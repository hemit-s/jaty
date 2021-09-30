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
  // sample data for testing the layout w/o needing to make the API call
  const [results, setResults] = useState({
    '242 Albert St, Waterloo, ON': {
      work: {
        driving: {
          distance: {
            text: '1.5 km',
            value: 1474,
          },
          duration: {
            text: '5 mins',
            value: 321,
          },
        },
        walking: {
          distance: {
            text: '1.3 km',
            value: 1256,
          },
          duration: {
            text: '16 mins',
            value: 969,
          },
        },
        transit: {
          distance: {
            text: '3.1 km',
            value: 3075,
          },
          duration: {
            text: '17 mins',
            value: 1020,
          },
        },
        bicycling: {
          distance: {
            text: '1.5 km',
            value: 1485,
          },
          duration: {
            text: '7 mins',
            value: 408,
          },
        },
      },
      gym: [
        {
          name: 'Granite Club Rink In the Park',
          commutes: {
            driving: {
              distance: {
                text: '1.1 km',
                value: 1099,
              },
              duration: {
                text: '3 mins',
                value: 194,
              },
            },
            walking: {
              distance: {
                text: '1.0 km',
                value: 964,
              },
              duration: {
                text: '12 mins',
                value: 712,
              },
            },
            transit: {
              distance: {
                text: '1.0 km',
                value: 964,
              },
              duration: {
                text: '12 mins',
                value: 712,
              },
            },
            bicycling: {
              distance: {
                text: '1.0 km',
                value: 995,
              },
              duration: {
                text: '4 mins',
                value: 223,
              },
            },
          },
        },
        {
          name: 'Goodlife Fitness',
          commutes: {
            driving: {
              distance: {
                text: '1.1 km',
                value: 1099,
              },
              duration: {
                text: '3 mins',
                value: 194,
              },
            },
            walking: {
              distance: {
                text: '1.0 km',
                value: 964,
              },
              duration: {
                text: '12 mins',
                value: 712,
              },
            },
            transit: {
              distance: {
                text: '1.0 km',
                value: 964,
              },
              duration: {
                text: '12 mins',
                value: 712,
              },
            },
            bicycling: {
              distance: {
                text: '1.0 km',
                value: 995,
              },
              duration: {
                text: '4 mins',
                value: 223,
              },
            },
          },
        },
      ],
      supermarket: [
        {
          name: 'India Food and Grocery',
          commutes: {
            driving: {
              distance: {
                text: '1.1 km',
                value: 1099,
              },
              duration: {
                text: '3 mins',
                value: 194,
              },
            },
            walking: {
              distance: {
                text: '1.0 km',
                value: 964,
              },
              duration: {
                text: '12 mins',
                value: 712,
              },
            },
            transit: {
              distance: {
                text: '1.0 km',
                value: 964,
              },
              duration: {
                text: '12 mins',
                value: 712,
              },
            },
            bicycling: {
              distance: {
                text: '1.0 km',
                value: 995,
              },
              duration: {
                text: '4 mins',
                value: 223,
              },
            },
          },
        },
        {
          name: 'Loblaws',
          commutes: {
            driving: {
              distance: {
                text: '1.1 km',
                value: 1099,
              },
              duration: {
                text: '3 mins',
                value: 194,
              },
            },
            walking: {
              distance: {
                text: '1.0 km',
                value: 964,
              },
              duration: {
                text: '12 mins',
                value: 712,
              },
            },
            transit: {
              distance: {
                text: '1.0 km',
                value: 964,
              },
              duration: {
                text: '12 mins',
                value: 712,
              },
            },
            bicycling: {
              distance: {
                text: '1.0 km',
                value: 995,
              },
              duration: {
                text: '4 mins',
                value: 223,
              },
            },
          },
        },
      ],
    },
  });
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
