import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Articles from './components/Articles/Articles';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Articles Component', () => {
  it('renders without crashing', () => {
    render(<Articles category="emailed" />);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Articles category="emailed" />);
    expect(asFragment()).toMatchSnapshot();
  });
  
  it('displays articles', () => {
    render(<Articles category="emailed" />);
    // Add more assertions based on your component's behavior
    expect(screen.getByText(/Published Date:/)).toBeInTheDocument();
    expect(screen.getByText(/Read more/)).toBeInTheDocument();
  });
});
