import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import HomePage from './HomePage';
import { AppContextProvider } from './AppContext';
import ResultsPage from './ResultsPage';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/results">Results</Link>
            </li>
          </ul>
        </nav>

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
