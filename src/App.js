import React, { useState } from 'react';
import AlertList from './Components/AlertList/AlertList';
import ReportForm from './Components/ReportForm/ReportForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';

const App = () => {
  const [alerts, setAlerts] = useState([]);

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
                <ReportForm onSubmit={handleReportSubmit} />
              </>
            } />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;