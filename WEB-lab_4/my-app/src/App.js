import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import Index from './pages/Index/Index.js';
import Contact from './pages/Contact/Contact.js';
import Our_team from './pages/Our_team/Our_team.js';
import Service from './pages/Service/Service.js';
import MasterClass from './pages/MasterClass/MasterClass.jsx';
import NotFound from './pages/404/404.js'
import './pages/Index/style.css'; 
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';

function App() {
  return (
    <Provider store={store}>
      
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/our_team" element={<Our_team />} />
          <Route path="/service" element={<Service />} />
          <Route path="/masterclass" element={<MasterClass />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </Router>
      
    </Provider>
  );
}

export default App;