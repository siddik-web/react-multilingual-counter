import { FormattedMessage } from 'react-intl';

type Counter = {
  count: number;
  gender: string;
  handleCount: () => void;
  locale: string;
};

const mapToBengaliNumerals = (number: number, language: string): string => {
    const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  
    if (language === 'bn' && number >= 0 && number <= 9) {
      return banglaNumbers[number];
    }
  
    if (language === 'bn') {
        return number
          .toString()
          .replace(/[0-9]/g, (match) => banglaNumbers[parseInt(match, 10)]);
      }
    
      return number.toString();
  };
  

const Display = ({ count, gender, handleCount, locale }: Counter) => {
    const bengaliCount = mapToBengaliNumerals(count, locale);
  return (
    <>
      <div>
        <FormattedMessage
          id="displayText"
          values={{ count: bengaliCount, gender: <FormattedMessage id={gender} /> }}
        />
      </div>

      <button onClick={handleCount}>
        <FormattedMessage
          id="countButton"
          values={{ count: bengaliCount, gender: <FormattedMessage id={gender} /> }}
        />
      </button>
    </>
  );
};

export default Display;
