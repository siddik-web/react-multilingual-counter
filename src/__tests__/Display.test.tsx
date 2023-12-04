// Display.test.tsx

import { render, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import '@testing-library/jest-dom'; // for additional matchers

import Display from '../Display';
interface Messages {
  [key: string]: {
    male: string;
    female: string;
    resetMale: string;
    resetFemale: string;
    displayText: string;
    countButton: string;
    toggleLanguage: string;
  };
}
const messages: Messages = {
  en: {
    male: 'Male',
    female: 'Female',
    resetMale: 'Reset Male Count',
    resetFemale: 'Reset Female Count',
    displayText: 'Display {count} for {gender}',
    countButton: 'Count is {count} for {gender}',
    toggleLanguage: 'Toggle Language',
  },
  bn: {
    male: 'পুরুষ',
    female: 'মহিলা',
    resetMale: 'পুরুষ হিসাব পুনরায় সেট করুন',
    resetFemale: 'মহিলা হিসাব পুনরায় সেট করুন',
    displayText: 'প্রদর্শন {count} জন {gender}',
    countButton: 'গণনা {count} জন {gender} এর জন্য',
    toggleLanguage: 'ভাষা পরিবর্তন করুন',
  },
};

jest.mock('react-intl', () => ({
  ...jest.requireActual('react-intl'),
  useIntl: () => ({ formatMessage: jest.fn() }),
}));

describe('Display Component', () => {
  test('renders Display component in English', () => {
    const { getByText } = render(
      <IntlProvider locale="en" messages={messages.en}>
        <Display count={0} gender="male" handleCount={() => {}} locale="en" />
      </IntlProvider>
    );
    const displayText = getByText('Display 0 for Male');
    expect(displayText).toBeInTheDocument();
  });

  test('renders Display component in Bengali', () => {
    const { getByText } = render(
      <IntlProvider locale="bn" messages={messages.bn}>
        <Display count={0} gender="male" handleCount={() => {}} locale="bn" />
      </IntlProvider>
    );
    const displayText = getByText('প্রদর্শন 0 জন পুরুষ');
    expect(displayText).toBeInTheDocument();
  });

  test('handles count when button is clicked in English', () => {
    const handleCountMock = jest.fn();
    const { getByText } = render(
      <IntlProvider locale="en" messages={messages.en}>
        <Display count={0} gender="male" handleCount={handleCountMock} locale="en" />
      </IntlProvider>
    );
    const countButton = getByText('Count is 0 for Male');
    fireEvent.click(countButton);
    expect(handleCountMock).toHaveBeenCalled();
  });

  test('handles count when button is clicked in Bengali', () => {
    const handleCountMock = jest.fn();
    const { getByText } = render(
      <IntlProvider locale="bn" messages={messages.bn}>
        <Display count={0} gender="male" handleCount={handleCountMock} locale="bn" />
      </IntlProvider>
    );
    const countButton = getByText('গণনা 0 জন পুরুষ এর জন্য');
    fireEvent.click(countButton);
    expect(handleCountMock).toHaveBeenCalled();
  });

  // Add more test cases as needed
});
