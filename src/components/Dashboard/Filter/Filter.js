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
    currentCurr,
    availableCurrencies,
    changeLastXDays
  } = dataContext;

  const [currency, setCurrency] = useState('AUD');
  const [startDate, setStartDate] = useState(new Date());

  //at submit we load two sets of data, on for currency at selected day
  // and other for graph and table for that given currency, we also change
  // current selected currency in our state
  const handleFormSubmit = e => {
    e.preventDefault();
    loadSingleCurrencyData(currency, startDate);
    loadGraphData(currency);
  };

  //reset data to all currencies,current day and set graph data to show last seven days
  const resetFilter = () => {
    changeLastXDays(7);
    loadData('daily', new Date());
  };

  //render currencies codes
  const currCode = availableCurrencies.map((currency, i) => {
    return (
      <option value={currency} key={i}>
        {currency}
      </option>
    );
  });

  return (
    <div className={styles.Filter}>
      <form onSubmit={handleFormSubmit}>
        <span>Currency </span>
        <select onChange={e => setCurrency(e.target.value)}>{currCode}</select>

        <span>On Date </span>
        <DatePicker
          showPopperArrow={false}
          selected={startDate}
          onChange={date => setStartDate(date)}
          maxDate={new Date()}
        />

        <button className={[styles.Filter__btn, styles.btn__filter].join(' ')}>
          Filter
        </button>
      </form>
      {currentCurr !== 'daily' && (
        <button
          className={[styles.Filter__btn, styles.btn__clear].join(' ')}
          onClick={resetFilter}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Filter;
