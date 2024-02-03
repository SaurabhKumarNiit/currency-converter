import React, { useState, useEffect } from 'react';
import './Converter.css';

const ConvertData = () => {
  const [amount, setAmount] = useState(1.0);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [conversionRate, setConversionRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);


  useEffect(() => {
    fetch('https://currency-exchange.p.rapidapi.com/listquotes', {
      headers: {
        'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com',
        'X-RapidAPI-Key': '2eb1003b86mshc48b925e5ff9a07p1ad947jsnafefbbb51e5e',
      },
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        setCurrencies(data);
      })
      .catch(error => {
        console.error('Error fetching currencies:', error);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency === toCurrency) {
      alert('Source and target currencies cannot be the same!');
      return;
    }
    fetch(`https://currency-exchange.p.rapidapi.com/exchange?from=${fromCurrency}&to=${toCurrency}&q=${amount}`, {
      headers: {
        'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com',
        'X-RapidAPI-Key': '2eb1003b86mshc48b925e5ff9a07p1ad947jsnafefbbb51e5e',
      },
    })
      .then(response => response.json())
      .then(data => {
        setConversionRate(data);
      })
      .catch(error => {
        console.error('Error fetching conversion rate:', error);
      });
  }, [fromCurrency, toCurrency, amount]);

  const handleAmountChange = event => {
    setAmount(event.target.value);
  };

  const handleFromCurrencyChange = event => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = event => {
    setToCurrency(event.target.value);
  };

  const handleToCountryCurrency = (data) => {
    switch (data) {
      case 'SGD':
        return 'Singapore Dollars';
      case 'MYR':
        return 'Malaysian Ringgit';
      case 'EUR':
        return 'Euro';
      case 'USD':
        return 'US Dollars';
      case 'AUD':
        return 'Australian Dollars';
      case 'JPY':
        return 'Japanese Yen';
      case 'CNH':
        return 'Chinese Yuan';
      case 'HKD':
        return 'Hong Kong Dollars';
      case 'CAD':
        return 'Canadian Dollars';
      case 'INR':
        return 'Indian Rupees';
      case 'DKK':
        return 'Danish Krone';
      case 'GBP':
        return 'British Pounds';
      case 'RUB':
        return 'Russian Rubles';
      case 'NZD':
        return 'New Zealand Dollars';
      case 'MXN':
        return 'Mexican Pesos';
      case 'IDR':
        return 'Indonesian Rupiah';
      case 'TWD':
        return 'Taiwanese Dollar';
      case 'THB':
        return 'Thai Baht';
      case 'VND':
        return 'Vietnamese Dong';
      default:
        return '';
    }
  };


  // const getFlagImageUrl = (countryCode) => {
  //   return `/flags/${countryCode.toUpperCase()}.png`;
  // };


  return (
    <div className='main-container'>
      <h2>{amount} {fromCurrency} to {toCurrency}  -  {handleToCountryCurrency(fromCurrency)} to {handleToCountryCurrency(toCurrency)} </h2>

      <div className='container'>
        {/* <h1>Currency Converter</h1> */}

        <div className='main'>
          <div className='child-main'>
            <label>Amount</label>
            <input type="number" value={amount} onChange={handleAmountChange} />
          </div>
          <div className='child-main'>
            <label>From</label>
            <select value={fromCurrency} onChange={handleFromCurrencyChange}>
              {currencies.map(currency => (
                <option key={currency} value={currency}>
                  {/* <span className={getFlagImageUrl(countryCodeMap[currency])}></span> */}
                  {currency} - {handleToCountryCurrency(currency)}
                </option>
              ))}
            </select>
          </div>
          <div className='child-main'>
            <label>To</label>
            <select value={toCurrency} onChange={handleToCurrencyChange}>
              {currencies.map(currency => (
                <option key={currency} value={currency}>
                  {/* <span className={getFlagImageUrl(countryCodeMap[currency])}></span> */}
                  {currency} - {handleToCountryCurrency(currency)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='summary'>
          <h2>{amount} {fromCurrency} = {amount * conversionRate} {toCurrency}</h2>
          <p>1 {fromCurrency} = {conversionRate} {toCurrency}</p>

        </div>
      </div>
    </div>
  );
};

export default ConvertData;
