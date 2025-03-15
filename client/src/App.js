import React, { useState, useEffect } from 'react';
import AlertList from './Components/AlertList/AlertList';
import ReportForm from './Components/ReportForm/ReportForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';

const App = () => {
  const [alerts, setAlerts] = useState([]);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    // Fetch user's location
    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
    
          },
          (err) => {
            alert(`Location Access Denied: ${err.message}`);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  // Handle new report submission
  const handleReportSubmit = (newAlert) => {
    setAlerts([...alerts, newAlert]);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/alerts' element={
              <>
                <AlertList alerts={alerts} />
                <ReportForm onSubmit={handleReportSubmit} location={location} />
              </>
            } />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
