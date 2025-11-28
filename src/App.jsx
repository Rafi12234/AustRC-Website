import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Homepage from './pages/Homepage';
import Events from './pages/Events';
import ContactUs from './pages/ContactUs';
import './index.css';
import AboutUs from './pages/AboutUs';
import Achievements from './pages/Achievements';
import Activities from './pages/Activities';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;