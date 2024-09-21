
import './App.css'
import ChoiceSelectionPage from './pages/ChoiceSelection'
import CodeConfirmationPage from './pages/ConfirmCode'
import LoginPage from './pages/login'
import RegistrationPage from './pages/registeration'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/confirm-code" element={<CodeConfirmationPage />} />
        {/* <Route path="/choices" element={<ChoiceSelectionPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
