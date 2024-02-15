//put mine in
const API_KEY = '6f7a938e8ba9c240cc6f4784f4aa79b3';
const BASE_URL = 'https://financialmodelingprep.com/api/v3';

export class stockDataManager {
    constructor() {
        console.log("cache instanciated");
    }
    logCacheHits = true;
    stockDataCache = {};
    historicalDataCache = {};
    companyInfoFMPCache = {};
    companyProfileCache = {};
    getStockData(symbol) {
        if (this.stockDataCache[symbol]) {
            const log = (this.logCacheHits) ? console.log("cache hit data", symbol) : null;
            return new Promise((resolve) => {
                resolve(this.stockDataCache[symbol])

            });

        }
        else {
            const log = (this.logCacheHits) ? console.log("cache miss stock data", symbol) : null;
            return new Promise((resolve) => {
                this.fetchStockData(symbol).then(data => {
                    this.stockDataCache[symbol] = data;
                    resolve(data);
                })
            });
        }
    }
    getHistoricalData(symbol) {
        if (this.historicalDataCache[symbol]) {
            const log = (this.logCacheHits) ? console.log("cache hit historical", symbol) : null;
            return new Promise((resolve) => {
                resolve(this.historicalDataCache[symbol])

            });

        }
        else {
            const log = (this.logCacheHits) ? console.log("cache miss historical", symbol) : null;
            return new Promise((resolve) => {
                this.fetchHistoricalData(symbol).then(data => {
                    this.historicalDataCache[symbol] = data;
                    resolve(data);
                })
            });
        }
    }

    getCompanyProfile(symbol) {
        if (this.companyProfileCache[symbol]) {
            const log = (this.logCacheHits) ? console.log("cache hit profile", symbol) : null;
            return new Promise((resolve) => {
                resolve(this.companyProfileCache[symbol])

            });

        }
        else {
            const log = (this.logCacheHits) ? console.log("cache miss profile", symbol) : null;
            return new Promise((resolve) => {
                this.fetchCompanyProfile(symbol).then(data => {
                    this.companyProfileCache[symbol] = data;
                    resolve(data);
                })
            });
        }
    }



    fetchStockData = async (symbol) => {
        try {
            const url = `${BASE_URL}/quote/${symbol}?apikey=${API_KEY}`;
            const response = await fetch(url)
            if (!response.ok) {
                return this.stockDataCache[Object.keys(this.stockDataCache)[0]] //return the first item in cache if the fetch fails
            }
            const data = await response.json();
            return data[0]; // Assuming the API returns an array and you're interested in the first item.
        } catch (error) {
            console.error('Error fetching current stock data:', error);
            throw error;
        }
    };

    fetchHistoricalData = async (symbol, timeseries = 1000000) => {
        try {
            const url = `${BASE_URL}/historical-price-full/${symbol}?timeseries=${timeseries}&apikey=${API_KEY}`;
            const response = await fetch(url); if (!response.ok) {
                return this.historicalDataCache[Object.keys(this.historicalDataCache)[0]] //return the first item in cache if the fetch fails
            }
            const data = await response.json();
            return data.historical || data; // Adjust based on the actual response structure
        } catch (error) {
            console.error('Error fetching historical stock data:', error);
            throw error;
        }
    };

    fetchCompanyInfoFMP = async (symbol) => {
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

    fetchCompanyProfile = async (symbol) => {
        try {
            const url = `${BASE_URL}/profile/${symbol}?apikey=${API_KEY}`;
            const response = await fetch(url);
            if (!response.ok) {
                return this.companyProfileCache[Object.keys(this.companyProfileCache)[0]] //return the first item in cache if the fetch fails
            }
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data[0]; // Assuming the API returns an array and you're interested in the first item.
        } catch (error) {
            console.error('Error fetching company profile:', error);
            throw error;
        }
    };
}
