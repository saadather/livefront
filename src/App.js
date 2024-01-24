import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import './App.css';
import Articles from './components/Articles/Articles';
import BookReview from './components/BookReview/BookReview';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="left-nav">
          <NavLink to="/most-popular" className={({ isActive }) =>
              isActive ? 'active-link' : ''
            }>
            Most Popular
          </NavLink>
          <NavLink to="/book-review" className={({ isActive }) =>
              isActive ? 'active-link' : ''
            }>
            Book Review
          </NavLink>
        </nav>
        <div className="main-content">
          <Routes>
            <Route path="/most-popular" element={<Articles category="emailed" />} />
            <Route path="/book-review" element={<BookReview />} />
            <Route path="most-popular/emailed" element={<Articles category="emailed" />} />
            <Route path="most-popular/shared" element={<Articles category="shared" />} />
            <Route path="most-popular/viewed" element={<Articles category="viewed" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;