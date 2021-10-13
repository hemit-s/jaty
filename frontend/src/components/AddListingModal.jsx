/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useState } from 'react';
import {
  Button, Modal,
} from 'react-bootstrap';
import AddressInput from './AddressInput';
import { useAppContext } from '../AppContext';

const AddListingModal = ({ handleClose, show }) => {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    addresses,
    setAddresses,
    destination,
    results,
    setResults,
  } = useAppContext();

  const getResults = async () => {
    setIsLoading(true);
    try {
      setAddresses(addresses.concat([address]));
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

  const handleSubmit = async () => {
    await getResults();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a listing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddressInput placeholder="Type an address..." onChange={(value) => setAddress(value)} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddListingModal;
