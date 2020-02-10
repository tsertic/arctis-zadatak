//format date
export const formatDate = date => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

//organize graph data
//take array of objects for each day, return object with organized data for showing
export const organizeGraphData = dataList => {
  const dates = [];
  const median = [];
  const buying = [];
  const selling = [];

  dataList.forEach(data => {
    dates.push(data.date);
    buying.push(Number(data.buying_rate));
    selling.push(Number(data.selling_rate));
    median.push(Number(data.median_rate));
  });

  return {
    dates,
    median,
    buying,
    selling,
    raw: dataList
  };
};

//extract all available currencies codes and put them in list

export const extractAvailableCurrencies = dataList => {
  const currencies = [];

  dataList.forEach(data => currencies.push(data.currency_code));

  return currencies;
};
