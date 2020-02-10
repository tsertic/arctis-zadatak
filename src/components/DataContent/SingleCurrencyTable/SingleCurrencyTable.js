import React from 'react';
import styles from './SingleCurrencyTable.module.scss';
import PropTypes from 'prop-types';

const SingleCurrencyTable = props => {
  const { exchangeData, currency, title } = props;

  //render table body cells from data
  const renderTable = exchangeData.map((data, i) => {
    const { median_rate, unit_value, selling_rate, buying_rate, date } = data;
    return (
      <tr key={`${currency}_${i}`}>
        <td>{date}</td>
        <td>{unit_value}</td>
        <td>{buying_rate}</td>
        <td>{median_rate}</td>
        <td>{selling_rate}</td>
      </tr>
    );
  });

  return (
    <section className={styles.SingleCurrencyTable}>
      <table>
        <caption> {title ? title : ' '}</caption>
        <thead>
          <tr>
            <th>Date</th>
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

SingleCurrencyTable.propTypes = {
  exchangeData: PropTypes.array.isRequired,
  currency: PropTypes.string.isRequired,
  title: PropTypes.string
};

export default SingleCurrencyTable;
