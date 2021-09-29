/* eslint-disable react/prop-types */
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBiking, faBus, faCar, faWalking,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {
  Button, Card, Container, Col, Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext';
import { capitalize } from './helpers';
import Logo from './Logo.png';
import './ResultsPage.css';

library.add(faBiking, faBus, faCar, faWalking);

const AmmenityCard = (props) => {
  const { name, details } = props;
  const ammenities = ['supermarket', 'gym'];
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Ammenities</Card.Title>
        {ammenities.map((ammenity) => (
          <div key={`${name}-${ammenity}`}>
            <Card.Subtitle className="mb-2 text-muted">{`Top ${capitalize(ammenity)} Locations`}</Card.Subtitle>
            <ol>
              {details[ammenity].map((option) => (
                <li key={`${name}-${ammenity}-${option.name}`}>
                  {option.name}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

const WorkCommuteCard = (props) => {
  const { name, details } = props;
  const modeOfTransportation = ['walking', 'bicycling', 'transit', 'driving'];
  const modeToIcon = {
    walking: 'walking',
    bicycling: 'biking',
    transit: 'bus',
    driving: 'car',
  };
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Work</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Travel Distance</Card.Subtitle>
        {modeOfTransportation.map((mode) => (
          <Card.Text key={`${name}-distance-${mode}`}>
            <FontAwesomeIcon icon={`${modeToIcon[mode]}`} />
            &nbsp;
            {`${capitalize(mode)}: ${details[mode].distance.text}`}
          </Card.Text>
        ))}
        <Card.Subtitle className="mb-2 text-muted">Commute Time</Card.Subtitle>
        {modeOfTransportation.map((mode) => (
          <Card.Text key={`${name}-duration-${mode}`}>
            <FontAwesomeIcon icon={`${modeToIcon[mode]}`} />
            &nbsp;
            {`${capitalize(mode)}: ${details[mode].duration.text}`}
          </Card.Text>
        ))}
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
  // const options = [
  //   '242 Albert St, Waterloo, ON',
  //   '242 Albert St, Waterloo, ON',
  //   '242 Albert St, Waterloo, ON',
  // ];

  // TODO: Handle case where there are no results yet

  return (
    <Container className="mt-1">
      <Button onClick={() => navigate('/')}> Back </Button>
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
