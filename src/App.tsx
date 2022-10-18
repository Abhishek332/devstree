import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Authenticator } from './features';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authenticator />} />
      </Routes>
    </Router>
  )
}

export default App