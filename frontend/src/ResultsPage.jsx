/* eslint-disable react/prop-types */
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBiking, faBus, faCar, faWalking,
} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import {
  Button, Card, Container, Col, Dropdown, Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext';
import { capitalize } from './helpers';
import Logo from './Logo.png';
import './ResultsPage.css';

library.add(faBiking, faBus, faCar, faWalking);

const modeOfTransportation = ['walking', 'bicycling', 'transit', 'driving'];

const modeToIcon = {
  walking: 'walking',
  bicycling: 'biking',
  transit: 'bus',
  driving: 'car',
};

const AmmenityCard = (props) => {
  const { name, details } = props;
  const ammenities = ['supermarket', 'gym'];
  const [selectedMode, setSelectedMode] = useState('transit');
  return (
    <Card className="mb-3">
      <Card.Body>
        <Dropdown className="float-end" onSelect={(e) => setSelectedMode(e)}>
          <Dropdown.Toggle id="dropdown-custom-1">
            <FontAwesomeIcon className="me-2" icon={`${modeToIcon[selectedMode]}`} />
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
        {ammenities.map((ammenity) => (
          <div key={`${name}-${ammenity}`}>
            <Card.Subtitle className="mb-2 text-muted">{`Top ${capitalize(ammenity)} Locations`}</Card.Subtitle>
            <ol>
              {details[ammenity].map((option) => (
                <li key={`${name}-${ammenity}-${option.name}`}>
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

const TravelInfoMode = ({ details, mode, type }) => (
  <div className="ms-3 d-flex flex-row">
    <div className="Icon">
      <FontAwesomeIcon className="me-2" icon={`${modeToIcon[mode]}`} />
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

const ResultsPage = () => {
  const {
    results,
  } = useAppContext();
  const navigate = useNavigate();
  const options = Object.keys(results) ?? [];
  // TODO: Handle case where there are no results yet

  return (
    <Container className="mt-1">
      <Button className="float-start" onClick={() => navigate('/')}> Back </Button>
      <img src={Logo} alt="Co-opStop" className="Logo" />
      <Row>
        {options.map((name) => {
          const { work, ...rest } = results[name];
          return (
            <Col key={name}>
              <h5 className="text-center">{name}</h5>
              <WorkCommuteCard key={`work-${name}`} name={name} details={results[name].work} />
              <AmmenityCard key={`ammenity-${name}`} name={name} details={rest} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ResultsPage;
