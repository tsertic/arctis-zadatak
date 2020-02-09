import React, { useContext, Fragment, useState } from 'react';
import styles from './DataContent.module.scss';

//context
import DataContext from '../../context/data/dataContext';
import AllCurrencyTable from './AllCurrencyTable/AllCurrencyTable';
import SingleCurrencyTable from './SingleCurrencyTable/SingleCurrencyTable';
import LineChart from './LineChart/LineChart';

const DataContent = () => {
  //context
  const dataContext = useContext(DataContext);
  const {
    graphData,
    exchangeData,
    currentCurr,
    loadGraphData,
    changeLastXDays
  } = dataContext;

  //state
  const [showChart, setShowChartTable] = useState(true);

  //select input handler, change days and update graph
  const handleChangeDays = e => {
    const days = Number(e.target.value);
    loadGraphData(currentCurr, days);
    changeLastXDays(days);
  };

  return (
    <div className={styles.DataContent}>
      {/* if nothing is filtred it load table with all currency data on current date,
          else load selected currency data  */}
      {currentCurr === 'daily' ? (
        <AllCurrencyTable />
      ) : (
        <Fragment>
          <SingleCurrencyTable
            exchangeData={exchangeData}
            currency={currentCurr}
            title={`Exchange rates of ${currentCurr}`}
          />
          <div className={styles.dataVisualization}>
            <div className={styles.chartOptions}>
              <div className={styles.daysOptions}>
                <p>
                  Last{'  '}
                  <select onChange={handleChangeDays}>
                    <option value="7"> 7</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                  </select>
                  {'  '}
                  days
                </p>
              </div>
              <div className={styles.chartType}>
                <h4 className={styles.title}>View Type:</h4>
                <button
                  onClick={() => setShowChartTable(true)}
                  className={showChart ? styles.icon__active : undefined}
                >
                  <i className="fas fa-chart-line"></i>
                </button>

                <button
                  onClick={() => setShowChartTable(false)}
                  className={!showChart ? styles.icon__active : undefined}
                >
                  <i className="fas fa-table"></i>
                </button>
              </div>
            </div>
            {showChart ? (
              <LineChart graphData={graphData} />
            ) : (
              <SingleCurrencyTable
                exchangeData={graphData.raw}
                currency={currentCurr}
              />
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default DataContent;
