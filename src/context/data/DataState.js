import React, { useReducer } from 'react';
import DataContext from './dataContext';
import dataReducer from './dataReducer';
import axios from 'axios';
import { dataTypes } from './../types';

import { formatDate, organizeGraphData } from './dataUtils';

const DataState = props => {
  const initialState = {
    exchangeData: [],
    graphData: [],
    currentCurr: 'daily',
    currentDate: '',
    lastXDays: 7
  };

  const [state, dispatch] = useReducer(dataReducer, initialState);

  //load data
  const loadData = async (
    curr = state.currentCurr,
    date = state.currentDate
  ) => {
    //if there is no date it will load on current day
    if (date) {
      date = `?date=${formatDate(date)}`;
    }
    const res = await axios.get(`/${curr}/${date}`);

    changeCurrency(curr);
    dispatch({ type: dataTypes.LOAD_DATA, payload: res.data });
  };

  //load single currency data on specific date
  const loadSingleCurrencyData = async (
    curr = state.currentCurr,
    date = state.currentDate
  ) => {
    const dateUrl = `?from=${formatDate(date)}&to=${formatDate(date)}`;
    const res = await axios.get(`/${curr}/${dateUrl}`);
    changeCurrency(curr);
    dispatch({ type: dataTypes.LOAD_DATA, payload: res.data });
  };

  //load graph data, by default is last 7 days
  const loadGraphData = async (
    curr = state.currentCurr,
    subtractNumber = state.lastXDays
  ) => {
    const res = await axios.get(`/${curr}/`);

    const lastXDays = res.data.slice(-subtractNumber);
    const organizedGraphData = organizeGraphData(lastXDays);
    changeCurrency(curr);
    dispatch({ type: dataTypes.LOAD_GRAPH_DATA, payload: organizedGraphData });
  };

  //change currency
  const changeCurrency = curr => {
    dispatch({ type: dataTypes.CHANGE_CURR, payload: curr });
  };
  // change number of days to show

  const changeLastXDays = val => {
    dispatch({ type: dataTypes.CHANGE_LAST_X_DAYS, payload: val });
  };

  return (
    <DataContext.Provider
      value={{
        exchangeData: state.exchangeData,
        currentCurr: state.currentCurr,
        graphData: state.graphData,
        loadingData: state.loadingData,
        loadData,
        loadSingleCurrencyData,
        changeCurrency,
        changeLastXDays,
        loadGraphData
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataState;
