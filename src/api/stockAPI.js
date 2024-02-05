const API_KEY = process.env.REACT_APP_FINANCIAL_MODELING_PREP_API_KEY;
const BASE_URL = 'https://financialmodelingprep.com/api/v3';

export const fetchStockData = async (symbol) => {
  try {
    const url = `${BASE_URL}/quote/${symbol}?apikey=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data[0]; // Assuming the API returns an array and you're interested in the first item.
  } catch (error) {
    console.error('Error fetching current stock data:', error);
    throw error;
  }
};

export const fetchHistoricalData = async (symbol, timeseries = 30) => {
  try {
    const url = `${BASE_URL}/historical-price-full/${symbol}?timeseries=${timeseries}&apikey=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.historical || data; // Adjust based on the actual response structure
  } catch (error) {
    console.error('Error fetching historical stock data:', error);
    throw error;
  }
};

export const fetchCompanyInfoFMP = async (symbol) => {
  try {
    const url = `${BASE_URL}/profile/${symbol}?apikey=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data[0]; // Assuming the API returns an array and you're interested in the first item.
  } catch (error) {
    console.error('Error fetching company information from FMP:', error);
    throw error;
  }
};

export const fetchCompanyProfile = async (symbol) => {
  try {
    const url = `${BASE_URL}/profile/${symbol}?apikey=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data[0]; // Assuming the API returns an array and you're interested in the first item.
  } catch (error) {
    console.error('Error fetching company profile:', error);
    throw error;
  }
};
