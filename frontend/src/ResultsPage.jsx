/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import {
  Button, Container, Col, Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext';
import AmenityCard from './components/AmenityCard';
import WorkCommuteCard from './components/WorkCommuteCard';
import Logo from './Logo.png';
import './ResultsPage.css';

const ResultsPage = () => {
  const {
    results,
  } = useAppContext();
  const navigate = useNavigate();
  const options = Object.keys(results) ?? [];

  useEffect(() => {
    if (Object.keys(results).length === 0) {
      navigate('/');
    }
  }, [results]);

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
              <AmenityCard key={`amenity-${name}`} name={name} details={rest} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ResultsPage;
