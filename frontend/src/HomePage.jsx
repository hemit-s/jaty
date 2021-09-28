import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// use Async Select for loading options from remote source https://react-select.com/home#async
import Select from 'react-select';
import { useAppContext } from './AppContext';

import './HomePage.css';

const options = [
  { value: 'address1', label: 'address1' },
  { value: 'address2', label: 'address2' },
  { value: 'address3', label: 'address3' },
];

const HomePage = () => {
  // eslint-disable-next-line no-unused-vars
  const { addresses, destination } = useAppContext();

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    navigate('/results');
  };

  return (
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
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Work Address</Form.Label>
        <Form.Control placeholder="Type address" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Travel Time</Form.Label>
        <Form.Control type="number" placeholder="travel time" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={onSubmit}>
        Submit
      </Button>
    </Form>
  );
};

export default HomePage;
