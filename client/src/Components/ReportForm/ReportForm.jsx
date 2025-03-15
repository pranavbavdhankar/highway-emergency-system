import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './ReportForm.css';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerIconShadow,
  iconSize: [25, 41], 
  iconAnchor: [12, 41], 
  shadowSize: [41, 41], 
  shadowAnchor: [12, 41], 
  popupAnchor: [1, -34], 
});

L.Marker.prototype.options.icon = DefaultIcon;

const ReportForm = ({ onSubmit }) => {
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState(null); 
  const [images, setImages] = useState([]); 
  const [mobileNumber, setMobileNumber] = useState(''); 

  const getPlaceName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      return data.display_name || 'Unknown Location';
    } catch (error) {
      console.error('Error fetching place name:', error);
      return 'Unknown Location';
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click: async (event) => {
        const { lat, lng } = event.latlng;
        const placeName = await getPlaceName(lat, lng);
        setLocation({ lat, lng, placeName });
      },
    });

    return location === null ? null : (
      <Marker position={[location.lat, location.lng]}>
        <Popup>{location.placeName}</Popup>
      </Marker>
    );
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files).slice(0, 2); // Allow only 2 images
    setImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('type', type);
    formData.append('message', message);
    formData.append('location', JSON.stringify(location));
    images.forEach((image) => formData.append('images', image));
    formData.append('mobileNumber', mobileNumber);

    // send formData to your backend api
    console.log('Form Data:', formData);
    alert('Incident reported successfully!');
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
          />
        </div>

        <div className="report-form__group">
          <label className="report-form__label">Location:</label>
          <div className="map-container">
            <MapContainer
              center={[20.5937, 78.9629]} // default center - india
              zoom={5}
              style={{ height: '400px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker />
            </MapContainer>
          </div>
          {location && (
            <p className="location-coordinates">
              Selected Location: {location.placeName} (Latitude: {location.lat}, Longitude: {location.lng})
            </p>
          )}
        </div>

        <div className="report-form__group">
          <label className="report-form__label">Upload Images (Max 2):</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
          {images.length > 0 && (
            <div className="image-preview">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index + 1}`}
                  style={{ width: '100px', height: '100px', margin: '5px' }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="report-form__group">
          <label htmlFor="mobileNumber" className="report-form__label">Mobile Number:</label>
          <input
            id="mobileNumber"
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
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