import React from 'react';
import styles from './Dashboard.module.scss';
//components
import User from './User/User';
import Filter from './Filter/Filter';
const Dashboard = () => {
  return (
    <div className={styles.Dashboard}>
      <User />
      <Filter />
    </div>
  );
};

export default Dashboard;
