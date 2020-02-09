import React, { useState, useContext } from 'react';
import styles from './Filter.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//context
import DataContext from '../../../context/data/dataContext';

const Filter = () => {
  const dataContext = useContext(DataContext);
  const {
    loadSingleCurrencyData,
    loadGraphData,
    loadData,
    currentCurr
  } = dataContext;

  const [currency, setCurrency] = useState('EUR');
  const [startDate, setStartDate] = useState(new Date());

  //at submit we load two sets of data, on for currency at selected day
  // and other for graph and table for that given currency, we also change
  // current selected currency in our state
  const handleFormSubmit = e => {
    e.preventDefault();
    loadSingleCurrencyData(currency, startDate);
    loadGraphData(currency);
  };

  const resetFilter = () => {
    loadData('daily', new Date());
  };
  return (
    <div className={styles.Filter}>
      <form onSubmit={handleFormSubmit}>
        <span>Currency </span>
        <select onChange={e => setCurrency(e.target.value)}>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="AUD">AUD</option>
          <option value="CAD">CAD</option>
          <option value="CZK">CZK</option>
          <option value="DKK">DKK</option>
          <option value="HUF">HUF</option>
          <option value="JPY">JPY</option>
          <option value="NOK">NOK</option>
          <option value="SEK">SEK</option>
          <option value="CHF">CHF</option>
          <option value="GBP">GBP</option>
          <option value="BAM">BAM</option>
          <option value="PLN">PLN</option>
        </select>

        <span>On Date </span>
        <DatePicker
          showPopperArrow={false}
          selected={startDate}
          onChange={date => setStartDate(date)}
          maxDate={new Date()}
        />

        <button className={styles.Filter__btn}>Filter</button>
      </form>
      {currentCurr !== 'daily' && (
        <button className={styles.Filter__btn__clear} onClick={resetFilter}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Filter;
