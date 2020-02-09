import React from 'react';
import styles from './LineChart.module.scss';
import { Line } from 'react-chartjs-2';

const LineChart = props => {
  const { graphData } = props;
  const { median, dates, selling, buying } = graphData;

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'buying',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(66, 133, 244,0.4)',
        borderColor: 'rgba(66, 133, 244,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(66, 133, 244,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(66, 133, 244,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: buying,
        hidden: true
      },
      {
        label: 'median',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: median
      },
      {
        label: 'selling',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(191, 75, 75,0.4)',
        borderColor: 'rgba(191, 75, 75, 1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(191, 75, 75, 1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(191, 75, 75, 1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: selling,
        hidden: true
      }
    ]
  };

  //setting minimum of y axis to be 0.001% lower than lowest data

  const lineOptions = {
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            suggestedMin: median && Math.min(...median) * 0.999
          }
        }
      ]
    }
  };

  return (
    <div className={styles.LineChart}>
      <Line data={data} options={lineOptions} />
    </div>
  );
};

export default LineChart;
