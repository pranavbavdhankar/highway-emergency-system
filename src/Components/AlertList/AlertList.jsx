import React from 'react';
import PropTypes from 'prop-types';
import './AlertList.css';

const AlertList = ({ alerts }) => {
  return (
    <div className="alert-list">
      <h2 className="alert-list__title">Emergency Alerts</h2>
      {alerts.length === 0 ? (
        <p className="alert-list__empty">No alerts at the moment.</p>
      ) : (
        <ul className="alert-list__items">
          {alerts.map((alert, index) => (
            <li key={index} className="alert-list__item">
              <strong className="alert-list__type">{alert.type}</strong>
              <p className="alert-list__message">{alert.message}</p>
              <span className="alert-list__location">Location: {alert.location}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

AlertList.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AlertList;