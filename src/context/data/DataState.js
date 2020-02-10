import React, { useReducer } from 'react';
import DataContext from './dataContext';
import dataReducer from './dataReducer';
import axios from 'axios';
import { dataTypes } from './../types';

import { formatDate, organizeGraphData } from './dataUtils';

/* 
NAPOMENA:   Imao sam problema pri obicnim fetchanjem podataka od api pošto je na http 
            i dohvat mi je bio blokiran od strane CORS policy i zato je lokalno proxy u json-onu i za produkciju se isto koristi proxy pri dohvacanju podataka

*/

const DataState = props => {
  const initialState = {
    exchangeData: [],
    graphData: {},
    currentCurr: 'daily',
    currentDate: '',
    availableCurrencies: [],
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
    let res;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      // dev code
      res = await axios.get(`/${curr}/${date}`);
    } else {
      // production code
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const targetUrl = `http://hnbex.eu/api/v1/rates/${curr}/${date}`;
      res = await axios.get(proxyUrl + targetUrl);
    }

    //on first load of data if availableCurrencies is empty it will load currencies
    if (!state.availableCurrencies.length) availableCurrencies(res.data);

    //update current currency
    changeCurrency(curr);

    dispatch({ type: dataTypes.LOAD_DATA, payload: res.data });
  };

  //load single currency data on specific date
  const loadSingleCurrencyData = async (
    curr = state.currentCurr,
    date = state.currentDate
  ) => {
    const dateUrl = `?from=${formatDate(date)}&to=${formatDate(date)}`;
    let res;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      // dev code
      res = await axios.get(`/${curr}/${dateUrl}`);
    } else {
      // production code
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const targetUrl = `http://hnbex.eu/api/v1/rates/${curr}/${dateUrl}`;
      res = await axios.get(proxyUrl + targetUrl);
    }
    changeCurrency(curr);
    dispatch({ type: dataTypes.LOAD_DATA, payload: res.data });
  };

  //load graph data, by default is last 7 days
  const loadGraphData = async (
    curr = state.currentCurr,
    subtractNumber = state.lastXDays
  ) => {
    let res;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      // dev code
      res = await axios.get(`/${curr}/`);
    } else {
      // production code
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const targetUrl = `http://hnbex.eu/api/v1/rates/${curr}/`;
      res = await axios.get(proxyUrl + targetUrl);
    }

    //slice last x days and forward that list to function that organize data
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

  //load available currencies list
  const availableCurrencies = dataList => {
    const currencies = [];

    dataList.forEach(data => currencies.push(data.currency_code));

    dispatch({
      type: dataTypes.LOAD_AVAILABLE_CURRENCIES,
      payload: currencies
    });
  };

  return (
    <DataContext.Provider
      value={{
        exchangeData: state.exchangeData,
        currentCurr: state.currentCurr,
        graphData: state.graphData,
        loadingData: state.loadingData,
        availableCurrencies: state.availableCurrencies,
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
