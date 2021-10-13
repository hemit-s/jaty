import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import HomePage from './HomePage';
import { AppContextProvider } from './AppContext';
import ResultsPage from './ResultsPage';

export default function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <AppContextProvider>
          <Routes>
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </AppContextProvider>
      </div>
    </Router>
  );
}
