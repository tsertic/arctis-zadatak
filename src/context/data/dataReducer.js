import { dataTypes } from './../types';

export default (state, action) => {
  switch (action.type) {
    case dataTypes.LOAD_DATA:
      return {
        ...state,
        exchangeData: action.payload
      };
    case dataTypes.LOAD_GRAPH_DATA:
      return {
        ...state,
        graphData: action.payload
      };
    case dataTypes.CHANGE_CURR:
      return {
        ...state,
        currentCurr: action.payload
      };
    case dataTypes.CHANGE_LAST_X_DAYS:
      return {
        ...state,
        lastXDays: action.payload
      };
    default:
      return state;
  }
};
