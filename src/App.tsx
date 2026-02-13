import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HotelProvider } from './context/HotelContext';
import CheckInScreen from './screens/CheckInScreen';
import TermsScreen from './screens/TermsScreen';

const App: React.FC = () => {
  return (
    <HotelProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/:slug" element={<CheckInScreen />} />
          <Route path="/termos" element={<TermsScreen />} />
          <Route path="/" element={<Navigate to="/demo-hotel" replace />} />
        </Routes>
      </BrowserRouter>
    </HotelProvider>
  );
};

export default App;
