/* eslint-disable react/prop-types */
import React from 'react';

import { Card } from 'react-bootstrap';
import './ResultsPage.css';

// eslint-disable-next-line no-unused-vars
const ResultCard = (props) => {
  const { optionNum } = props;
  return (
    <Card className="Results-Card">
      <Card.Body>
        <Card.Title>{`Option ${optionNum}`}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Travel Distance</Card.Subtitle>
        <Card.Text>
          Commute time for walking: 35 min
        </Card.Text>
        <Card.Text>
          Commute time for biking: 35 min
        </Card.Text>
        <Card.Text>
          Commute time for public transit: 35 min
        </Card.Text>
        <Card.Text>
          Commute time for driving: 35 min
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const ResultsPage = () => {
  const options = ['', '', '', '', ''];
  return (
    <div className="Results-Container">
      {options.map((_, i) => (
        <ResultCard optionNum={i} />
      ))}
    </div>
  );
};

export default ResultsPage;
