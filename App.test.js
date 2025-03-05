import '@testing-library/jest-dom';
import React from 'react';  // You already have this correctly
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to the E-Voting System/i);
  expect(linkElement).toBeInTheDocument();
});
