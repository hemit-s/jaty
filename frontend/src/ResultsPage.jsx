/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from 'react-bootstrap';
import { useAppContext } from './AppContext';
import './ResultsPage.css';

const ResultCard = (props) => {
  const { name, details } = props;
  return (
    <Card className="Results-Card">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Travel Distance</Card.Subtitle>
        <Card.Text>
          {`Commute time for walking: ${details.walking.duration.text}`}
        </Card.Text>
        <Card.Text>
          {`Commute time for biking: ${details.bicycling.duration.text}`}
        </Card.Text>
        <Card.Text>
          {`Commute time for public transit: ${details.transit.duration.text}`}
        </Card.Text>
        <Card.Text>
          {`Commute time for driving: ${details.driving.duration.text}`}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const ResultsPage = () => {
  const {
    results,
  } = useAppContext();
  const options = Object.keys(results) ?? [];
  return (
    <div className="Results-Container">
      {options.map((name) => (
        <ResultCard name={name} details={results[name].work} />
      ))}
    </div>
  );
};

export default ResultsPage;
