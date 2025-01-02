import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthModal from 'components/AuthModal';
import Header from 'components/Header';
import ClientManager from 'components/ClientManager';
import ClientDetails from 'components/ClientDetails'; // New component
import 'styles/ReactWelcome.css';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<ClientManager />} />
          <Route path='/client/:name' element={<ClientDetails />} />
        </Routes>
        <AuthModal />
      </div>
    </Router>
  );
};

export default App;
