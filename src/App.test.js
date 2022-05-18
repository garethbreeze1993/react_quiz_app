import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('check intro elements on page when app is loaded initially', () => {
  render(<App />);
  expect(screen.getByText('Start Quiz')).toBeInTheDocument();
  expect(screen.getByText('Quizzical')).toBeInTheDocument();
  expect(screen.getByText('A fun quiz app built with React')).toBeInTheDocument();
});

test('check when Start Quiz button clicked that Quiz component loads', async () => {
  render(<App />);
  await screen.getByText('Start Quiz')
  fireEvent.click(screen.getByText('Start Quiz'));
  expect(screen.getByText('Check Answers')).toBeInTheDocument();
});

// up to React Testing Library: User Event
// on https://www.robinwieruch.de/react-testing-library/
