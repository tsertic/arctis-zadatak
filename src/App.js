import React, { useEffect } from 'react';
import styles from './App.module.scss';
//components
import Dashboard from './components/Dashboard/Dashboard';
import DataContent from './components/DataContent/DataContent';
//context
import DataState from './context/data/DataState';

const App = () => {
  return (
    <DataState>
      <div className={styles.App}>
        <Dashboard />
        <DataContent />
      </div>
    </DataState>
  );
};

export default App;
