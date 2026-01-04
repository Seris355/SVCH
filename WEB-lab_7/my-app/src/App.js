import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index/Index.js';
import Contact from './pages/Contact/Contact.js';
import Our_team from './pages/Our_team/Our_team.js';
import Service from './pages/Service/Service.js';
import MasterClass from './pages/MasterClass/MasterClass.jsx';
import NotFound from './pages/404/404.js'
import './pages/Index/style.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/our_team" element={<Our_team />} />
        <Route path="/service" element={<Service />} />
        <Route path="/masterclass" element={<MasterClass />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;