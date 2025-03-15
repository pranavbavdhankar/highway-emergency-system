import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ReportForm.css';

const ReportForm = ({ onSubmit }) => {
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ type, message, location });
    setType('');
    setMessage('');
    setLocation('');
  };

  return (
    <div className="report-form">
      <h2 className="report-form__title">Report an Incident</h2>
      <form onSubmit={handleSubmit} className="report-form__form">
        <div className="report-form__group">
          <label htmlFor="type" className="report-form__label">Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="report-form__select"
            required
          >
            <option value="">Select</option>
            <option value="Accident">Accident</option>
            <option value="Breakdown">Breakdown</option>
            <option value="Roadblock">Roadblock</option>
          </select>
        </div>
        <div className="report-form__group">
          <label htmlFor="message" className="report-form__label">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="report-form__textarea"
            required
          />
        </div>
        <div className="report-form__group">
          <label htmlFor="location" className="report-form__label">Location:</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="report-form__input"
            required
          />
        </div>
        <button type="submit" className="report-form__button">Submit</button>
      </form>
    </div>
  );
};

ReportForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ReportForm;