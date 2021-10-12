/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from 'react-bootstrap';
import Icon from './Icon';
import { capitalize } from '../util';
import { modeOfTransportation } from '../constants';

const TravelInfoMode = ({ details, mode, type }) => (
  <div className="ms-3 d-flex flex-row">
    <div className="Icon">
      <Icon className="me-2" iconName={mode} />
    </div>
    &nbsp;
    {`${capitalize(mode)}: ${details[mode][type].text}`}
  </div>
);

const WorkCommuteCard = (props) => {
  const { name, details } = props;
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Work</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Travel Distance</Card.Subtitle>
        <div className="mb-3">
          {modeOfTransportation.map((mode) => (
            <TravelInfoMode
              key={`${name}-distance-${mode}`}
              mode={mode}
              type="distance"
              details={details}
            />
          ))}
        </div>
        <Card.Subtitle className="mb-2 text-muted">Commute Time</Card.Subtitle>
        <div className="mb-3">
          {modeOfTransportation.map((mode) => (
            <TravelInfoMode
              key={`${name}-duration-${mode}`}
              mode={mode}
              type="duration"
              details={details}
            />
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default WorkCommuteCard;
