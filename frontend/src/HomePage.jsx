/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext';
import AddressInput from './components/AddressInput';
import './HomePage.css';
import Logo from './Logo.png';

const HomePage = () => {
  const [address, setAddress] = useState('');
  const {
    addresses,
    setAddresses,
    destination,
    setDestination,
    results,
    setResults,
  } = useAppContext();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const getResults = async () => {
    setIsLoading(true);
    try {
      setAddress(addresses.concat([address]));
      const res = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_KEY}get_address_info`,
        params: {
          destination,
          addresses: [address],
        },
      });
      setResults({ ...results, ...res.data });
    } catch (ex) {
      alert('exception!');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await getResults();
    navigate('/results');
  };

  return (
    <Container>
      <img src={Logo} alt="Co-opStop" className="Logo" />
      <Form className="Home-Page-Container">
        <Form.Group className="mb-3">
          <Form.Label>Listing Address</Form.Label>
          <AddressInput placeholder="Type address..." onChange={(value) => setAddress(value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Work Address</Form.Label>
          <AddressInput placeholder="Type address..." onChange={(value) => setDestination(value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Travel Time</Form.Label>
          <Form.Control type="number" placeholder="travel time" />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading} onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default HomePage;
