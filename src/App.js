import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import './App.css';
import Articles from './components/Articles/Articles';

function App() {
  return (
    <Router>
      <div className="container">
        <h1 className="heading">New York Times Articles</h1>
        <nav className="navbar">
          <NavLink to="/" className={({ isActive }) =>
            isActive ? 'active-link' : ''
          }>
            Most Emailed
          </NavLink>
          <NavLink to="/shared" className={({ isActive }) =>
            isActive ? 'active-link' : ''
          }>
            Most Shared
          </NavLink>
          <NavLink to="/viewed" className={({ isActive }) =>
            isActive ? 'active-link' : ''
          }>
            Most Viewed
          </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Articles category="emailed" />} />
          <Route path="/shared" element={<Articles category="shared" />} />
          <Route path="/viewed" element={<Articles category="viewed" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;