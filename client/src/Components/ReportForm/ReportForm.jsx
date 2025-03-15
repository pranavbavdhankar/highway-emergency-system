import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./ReportForm.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";

// Custom Marker Icon
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerIconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

const ReportForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    message: "",
    contact: "",
  });

  const [location, setLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default: India
  const [images, setImages] = useState([]);

  // Fetch user's current location on load
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
          const placeName = await getPlaceName(latitude, longitude);
          setLocation({ lat: latitude, lng: longitude, placeName });
        },
        (error) => {
          console.error("Geolocation Error:", error);
          alert("Location access denied. Please select a location manually.");
        }
      );
    }
  }, []);

  // Reverse geocoding function
  const getPlaceName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      return data.display_name || "Unknown Location";
    } catch (error) {
      console.error("Error fetching place name:", error);
      return "Unknown Location";
    }
  };

  // Custom Component to Move Map
  const MoveMap = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.setView(center, map.getZoom(), { animate: true });
      }
    }, [center, map]);
    return null;
  };

  // Custom Marker Component with dynamic map movement
  const LocationMarker = () => {
    useMapEvents({
      click: async (event) => {
        const { lat, lng } = event.latlng;
        const placeName = await getPlaceName(lat, lng);
        setLocation({ lat, lng, placeName });
        setMapCenter([lat, lng]);
      },
    });

    return location ? (
      <Marker position={[location.lat, location.lng]}>
        <Popup>{location.placeName}</Popup>
      </Marker>
    ) : null;
  };

  // Handle image upload (max 2 images)
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files).slice(0, 2);
    setImages(files);
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) {
      alert("Please select a location!");
      return;
    }

    // Create FormData object
    const form = new FormData();
    form.append("type", formData.type);
    form.append("name", formData.name);
    form.append("message", formData.message);
    form.append("contact", formData.contact);
    form.append("latitude", location.lat);
    form.append("longitude", location.lng);
    form.append("address", location.placeName);
    images.forEach((image) => form.append("imageList", image));

    try {
      const response = await fetch("http://localhost:8080/request/new", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        alert("Incident reported successfully!");
        setFormData({ type: "", name: "", message: "", contact: "" });
        setLocation(null);
        setImages([]);
      } else {
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to report the incident. Please try again.");
    }
  };

  return (
    <div className="report-form">
      <h2 className="report-form__title">Report an Incident</h2>
      <form onSubmit={handleSubmit} className="report-form__form">
        {/* Incident Type */}
        <div className="report-form__group">
          <label htmlFor="type" className="report-form__label">Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="report-form__select"
            required
          >
            <option value="">Select</option>
            <option value="Accident">Accident</option>
            <option value="Breakdown">Breakdown</option>
            <option value="Roadblock">Roadblock</option>
          </select>
        </div>

        {/* Name Field */}
        <div className="report-form__group">
          <label htmlFor="name" className="report-form__label">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="report-form__input"
            required
          />
        </div>

        {/* Message */}
        <div className="report-form__group">
          <label htmlFor="message" className="report-form__label">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="report-form__textarea"
          />
        </div>

        {/* Map for location selection */}
        <div className="report-form__group">
          <label className="report-form__label">Location:</label>
          <div className="map-container">
            <MapContainer center={mapCenter} zoom={10} style={{ height: "400px", width: "100%" }}>
              <MoveMap center={mapCenter} />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker />
            </MapContainer>
          </div>
          {location && (
            <p className="location-coordinates">
              Selected Location: {location.placeName} (Lat: {location.lat}, Lng: {location.lng})
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div className="report-form__group">
          <label className="report-form__label">Upload Images (Max 2):</label>
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
        </div>

        {/* Mobile Number */}
        <div className="report-form__group">
          <label htmlFor="contact" className="report-form__label">Mobile Number:</label>
          <input
            id="contact"
            name="contact"
            type="tel"
            value={formData.contact}
            onChange={handleChange}
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

