import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Index from './pages/Index/Index.js';
import Contact from './pages/Contact/Contact.js';
import Our_team from './pages/Our_team/Our_team.js';
import Service from './pages/Service/Service.js';
import MasterClass from './pages/MasterClass/MasterClass.jsx';
import NotFound from './pages/404/404.js';
import Instructors from './pages/Admin/Instructors/Instructors.js';
import Participants from './pages/Admin/Participants/Participants.js';
import MasterClasses from './pages/Admin/MasterClasses/MasterClasses.js';
import './pages/Index/style.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/our_team" element={<Our_team />} />
          <Route path="/service" element={<Service />} />
          <Route path="/masterclass" element={<MasterClass />} />
          <Route path="/admin/instructors" element={<Instructors />} />
          <Route path="/admin/participants" element={<Participants />} />
          <Route path="/admin/masterclasses" element={<MasterClasses />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;