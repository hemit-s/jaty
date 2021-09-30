import axios from 'axios';
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// use Async Select for loading options from remote source https://react-select.com/home#async
import Select from 'react-select';
import { useAppContext } from './AppContext';
import { optionsToAnswers, answersToOptions } from './util';
import './HomePage.css';
import Logo from './Logo.png';

const options = [
  { value: '242 Albert St, Waterloo, ON', label: '242 Albert St, Waterloo, ON' },
  { value: '295 Lester St, Waterloo, ON', label: '295 Lester St, Waterloo, ON' },
  { value: '296 Hemlock St, Waterloo, ON', label: '296 Hemlock St, Waterloo, ON' },
];

const HomePage = () => {
  const {
    addresses,
    setAddresses,
    destination,
    setDestination,
    setResults,
  } = useAppContext();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const getResults = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_KEY}get_address_info`,
        params: {
          destination,
          addresses,
        },
      });
      setResults(res.data);
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
          <Form.Label>Listing Addresses</Form.Label>
          <Select
            // defaultValue={[colourOptions[2], colourOptions[3]]}
            isMulti
            name="colors"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            value={answersToOptions(addresses)}
            onChange={(value) => {
              setAddresses(optionsToAnswers(value));
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Work Address</Form.Label>
          <Form.Control placeholder="Type address" value={destination} onChange={(e) => setDestination(e.target.value)} />
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
