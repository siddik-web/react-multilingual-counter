// App.test.tsx

import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';

jest.mock('react-intl', () => ({
  ...jest.requireActual('react-intl'),
  useIntl: () => ({ formatMessage: jest.fn() }),
}));


// Reusable function to handle button click
const clickButton = (buttonTextOrRegex: string | RegExp) => {
  const button = screen.getByText(buttonTextOrRegex);
  if (button) {
    fireEvent.click(button);
  } else {
    throw new Error(`Button with text or regex "${buttonTextOrRegex}" not found`);
  }
};

test('renders App component in Bengali', () => {
  render(<App />);
  expect(screen.getByText('পুরুষ')).toBeInTheDocument(); // Assuming the initial language is Bengali
  expect(screen.queryByText('Female')).not.toBeInTheDocument();
});

test('updates count when button is clicked in Bengali', () => {
  render(<App />);
  clickButton('গণনা 0 জন পুরুষ এর জন্য');
  expect(screen.getByText('গণনা 1 জন পুরুষ এর জন্য')).toBeInTheDocument();
});

test('resets count when reset button is clicked in Bengali', () => {
  render(<App />);
  clickButton('গণনা 0 জন পুরুষ এর জন্য');
  clickButton('পুরুষ হিসাব পুনরায় সেট করুন');
  expect(screen.getByText('গণনা 0 জন পুরুষ এর জন্য')).toBeInTheDocument();
});

test('should display the correct count for Male in Bengali', () => {
  render(<App />);
  expect(screen.getByText(/গণনা 0 জন পুরুষ এর জন্য/i)).toBeInTheDocument();
  clickButton('গণনা 0 জন পুরুষ এর জন্য');
  expect(screen.getByText(/গণনা 1 জন পুরুষ এর জন্য/i)).toBeInTheDocument();
});

test('should toggle gender when button is clicked in Bengali', () => {
  render(<App />);
  // Assuming the initial gender is Male, click the first button
  clickButton('পুরুষ');
  // Now, the gender should be Female
  expect(screen.getByText(/গণনা 0 জন মহিলা এর জন্য/i)).toBeInTheDocument();
});

test('switches to English language when language toggle is clicked', () => {
  render(<App />);
  clickButton('Toggle Language');
  expect(screen.getByText('Male')).toBeInTheDocument();
  expect(screen.queryByText('পুরুষ')).not.toBeInTheDocument();
});

test('updates count when button is clicked in English', () => {
  render(<App />);
  clickButton('Count is 0 for Male');
  expect(screen.getByText('Count is 1 for Male')).toBeInTheDocument();
});

test('resets count when reset button is clicked in English', () => {
  render(<App />);
  clickButton('Count is 0 for Male');
  clickButton('Reset Male Count');
  expect(screen.getByText('Count is 0 for Male')).toBeInTheDocument();
});

test('should display the correct count for Male in English', () => {
  render(<App />);
  expect(screen.getByText(/Count is 0 for Male/i)).toBeInTheDocument();
  clickButton('Count is 0 for Male');
  expect(screen.getByText(/Count is 1 for Male/i)).toBeInTheDocument();
});

test('should toggle gender when button is clicked in English', () => {
  render(<App />);
  // Assuming the initial gender is Male, click the first button
  clickButton('Male');
  // Now, the gender should be Female
  expect(screen.getByText(/Count is 0 for Female/i)).toBeInTheDocument();
});

// Add more tests based on your application requirements
