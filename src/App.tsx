import { useState } from 'react';
import { IntlProvider, FormattedMessage } from 'react-intl';
import './App.css';
import Display from './Display';

interface Counts {
  male: number;
  female: number;
}

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

function App() {
  const initialCounts: Counts = { male: 0, female: 0 };
  const [counts, setCounts] = useState<Counts>(initialCounts);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [locale, setLocale] = useState<string>('en'); // Set default locale

  const handleCount = () => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [gender]: prevCounts[gender] + 1,
    }));
  };

  const handleReset = () => {
    setCounts(initialCounts);
  };

  const toggleLanguage = () => {
    setLocale((prevLocale) => (prevLocale === 'en' ? 'bn' : 'en'));
  };

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div className="card">
        <button onClick={() => setGender(gender === 'male' ? 'female' : 'male')}>
          <FormattedMessage id={gender} />
        </button>
        <Display count={counts[gender]} gender={gender} handleCount={handleCount} locale={locale}/>
        <button onClick={handleReset}>
          <FormattedMessage id={`reset${gender.charAt(0).toUpperCase() + gender.slice(1)}`} />
        </button>
        <button onClick={toggleLanguage}>
          <FormattedMessage id="toggleLanguage" />
        </button>
      </div>
    </IntlProvider>
  );
}

export default App;
