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
        console.log(data);
        setCurrencies(data);
      })
      .catch(error => {
        console.error('Error fetching currencies:', error);
      });
  }, []);

  useEffect(() => {
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

  return (
    <div className='container'>
      <h1>Currency Converter</h1>
      <div className='amount'>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={handleAmountChange} />
      </div>
      <div>
        <label>From Currency:</label>
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div>
        <label>To Currency:</label>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div className='summary'>
      <h2>{amount} {fromCurrency} = {amount * conversionRate} {toCurrency}</h2>
       <p>1 {fromCurrency} = {conversionRate} {  toCurrency}</p>
        
      </div>
    </div>
  );
};

export default ConvertData;
