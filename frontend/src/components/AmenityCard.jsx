/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import Icon from './Icon';
import { amenities, modeOfTransportation } from '../constants';
import { capitalize } from '../util';

const AmenityCard = (props) => {
  const { name, details } = props;
  const [selectedMode, setSelectedMode] = useState('transit');

  return (
    <Card className="mb-3">
      <Card.Body>
        <Dropdown className="float-end" onSelect={(e) => setSelectedMode(e)}>
          <Dropdown.Toggle id="dropdown-custom-1">
            <Icon className="me-2" iconName={selectedMode} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {modeOfTransportation.map((mode) => (
              <Dropdown.Item key={mode} eventKey={mode} active={selectedMode === mode}>
                {capitalize(mode)}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Card.Title>Amenities</Card.Title>
        {amenities.map((amenity) => (
          <div key={`${name}-${amenity}`}>
            <Card.Subtitle className="mb-2 text-muted">{`Top ${capitalize(amenity)} Locations`}</Card.Subtitle>
            <ol>
              {details[amenity].map((option) => (
                <li key={`${name}-${amenity}-${option.name}`}>
                  {option.name}
                  <div className="ms-3 d-flex flex-row">
                    {`Commute Time: ${option.commutes[selectedMode].duration.text}`}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default AmenityCard;
