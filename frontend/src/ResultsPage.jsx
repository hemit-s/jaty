/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Button, Container, Col, Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext';
import AddListingModal from './components/AddListingModal';
import AmenityCard from './components/AmenityCard';
import WorkCommuteCard from './components/WorkCommuteCard';
import Logo from './Logo.png';
import './ResultsPage.css';

const ResultsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    results,
    setResults,
  } = useAppContext();
  const navigate = useNavigate();
  const options = Object.keys(results) ?? [];

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const removeCol = (name) => {
    const copy = { ...results };
    delete copy[name];
    setResults(copy);
  };

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
        <Button className="float-end" onClick={() => handleShow()}> + </Button>
        {options.map((name) => {
          const { work, ...rest } = results[name];
          return (
            <Col key={name}>
              <div className="d-flex flex-row justify-content-center">
                <Button onClick={() => removeCol(name)}> - </Button>
                <h5 className="text-center">{name}</h5>
              </div>
              <WorkCommuteCard key={`work-${name}`} name={name} details={results[name].work} />
              <AmenityCard key={`amenity-${name}`} name={name} details={rest} />
            </Col>
          );
        })}
      </Row>
      <AddListingModal show={showModal} handleClose={handleClose} />
    </Container>
  );
};

export default ResultsPage;
