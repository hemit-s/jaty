/* eslint-disable react/prop-types */
import React, { useMemo, useState } from 'react';
import { Form } from 'react-bootstrap';
import usePlacesAutocomplete from 'use-places-autocomplete';
import './AddressInput.css';
import useGoogleMapsAPI from '../useGoogleMapsAPI';
import { dataToAddress } from '../util';

const AddressInput = ({ onChange, placeholder }) => {
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const {
    ready,
    value,
    suggestions,
    setValue,
    clearSuggestions,
    init,
  } = usePlacesAutocomplete({
    debounce: 1000,
    initOnMount: false,
  });

  useGoogleMapsAPI({ onLoad: () => init() });

  const isSuggestionVisible = useMemo(
    () => showSuggestions && suggestions?.data.length,
    [showSuggestions, suggestions?.data.length],
  );

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowSuggestions(false);
    }
  };

  const handleSelect = (val) => {
    onChange(val);
    if (ready) {
      setValue(val, false);
      clearSuggestions();
    }
  };

  const handleChange = (e) => {
    onChange(e.target.value);
    if (ready) {
      setValue(e.target.value, true);
    }
  };

  const handleKeyDown = (e) => {
    if (!isSuggestionVisible) {
      return;
    }

    if (e.key === 'Backspace') {
      setSelectedIndex(undefined);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(dataToAddress(suggestions.data[selectedIndex]));
      setSelectedIndex(undefined);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = selectedIndex ?? 1;
      setSelectedIndex((prevIndex + suggestions.data.length - 1) % suggestions.data.length);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const prevIndex = selectedIndex ?? -1;
      setSelectedIndex((prevIndex + 1) % suggestions.data.length);
    }
  };

  const renderSuggestions = () => suggestions.data.map((el, index) => (
    <button
      key={el.place_id}
      className={`Suggestion ${index === selectedIndex ? 'selected' : ''}`}
      onClick={() => handleSelect(dataToAddress(el))}
      type="button"
    >
      { dataToAddress(el) }
    </button>
  ));

  return (
    <div onBlur={(e) => handleBlur(e)}>
      <Form.Control
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e)}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      { isSuggestionVisible > 0 && (
        <div className="Suggestion-wrapper">
          { renderSuggestions() }
        </div>
      )}
    </div>
  );
};

export default AddressInput;
