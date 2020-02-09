import React, { useContext, useState, useEffect } from 'react';
import styles from './AllCurrencyTable.module.scss';
import DatePicker from 'react-datepicker';

import DataContext from '../../../context/data/dataContext';

const AllCurrencyTable = props => {
  //context
  const dataContext = useContext(DataContext);
  const { exchangeData, loadData } = dataContext;
  //state
  const [startDate, setStartDate] = useState(new Date());

  //load main data table with all currencies on current date
  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  const handleChangeDate = date => {
    if (date > new Date()) {
      alert('Ne predvidjamo buducnost');
      setStartDate(new Date());
    } else {
      setStartDate(date);
      loadData('daily', date);
    }
  };

  //render table body cells from data
  const renderTable = exchangeData.map((data, i) => {
    const {
      currency_code,
      median_rate,
      unit_value,
      selling_rate,
      buying_rate
    } = data;
    return (
      <tr key={`${currency_code}_${i}`}>
        <td>{currency_code}</td>
        <td>{unit_value}</td>
        <td>{buying_rate}</td>
        <td>{median_rate}</td>
        <td>{selling_rate}</td>
      </tr>
    );
  });

  return (
    <section className={styles.AllCurrencyTable}>
      <table className="table table-condensed table-hover table-bordered">
        <caption>
          Exchange rates on date:{' '}
          <DatePicker
            showPopperArrow={false}
            selected={startDate}
            onChange={handleChangeDate}
            maxDate={new Date()}
          />
        </caption>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Unit Value</th>
            <th>Buying rate</th>
            <th>Median rate</th>
            <th>Selling rate</th>
          </tr>
        </thead>
        <tbody>{renderTable}</tbody>
      </table>
    </section>
  );
};

export default AllCurrencyTable;
