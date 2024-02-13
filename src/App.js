import React, { useState, useEffect, useRef, useMemo } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import StockDisplay from './components/StockDisplay/StockDisplay';
import StockChart from './components/StockChart/StockChart';
import CompanyProfile from './components/CompanyProfile/CompanyProfile';
import CompanyLogo from './components/CompanyLogo/CompanyLogo';
import {
    stockDataManager,
} from './api/stockAPI';

const App = () => {
    const [symbol, setSymbol] = useState('AAPL');
    const [stockData, setStockData] = useState(null);
    const [historicalData, setHistoricalData] = useState([]);
    const [companyProfile, setCompanyProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const cacheInitialized = useRef(false);
    const SDM = useMemo(() => new stockDataManager(), [])//empty dependency array
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            SDM.getStockData(symbol).then(setStockData)
            SDM.getHistoricalData(symbol).then(setHistoricalData)
            SDM.getCompanyProfile(symbol).then(setCompanyProfile)
            try {
                setError(null);
            } catch (error) {
                console.error('Failed to fetch data', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        if (symbol) {
            fetchData();
        }
    }, [symbol]);
    const preFetchCallBack = (symbol) => {
        SDM.getStockData(symbol);
        SDM.getCompanyProfile(symbol);
        SDM.getHistoricalData(symbol);
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
            <header className="bg-gray-800 sticky z-10 top-0 w-screen h-fit  p-4 shadow-lg">
                <div className="grid grid-cols-5 mx-auto">
                    <h1 className="text-3xl font-bold text-white ml-auto">Stock App</h1>
                    <SearchBar onSearch={setSymbol} preFetch={preFetchCallBack} />
                    {loading && <p className="text-lg text-red-500">Loading...</p>}
                    {error && <p className="text-lg text-red-500">Error: {error.message}</p>}
                    {companyProfile && <CompanyLogo logoUrl={companyProfile.image} companyName={companyProfile.companyName} />}
                </div>
            </header>

            <div className="container mx-auto p-4">
                <div className="flex flex-col space-y-4">
                    {stockData && <StockDisplay stockData={stockData} />}
                    {historicalData.length > 0 && <StockChart historicalData={historicalData} />}
                    {companyProfile && <CompanyProfile profile={companyProfile} />}
                </div>
            </div>
        </div>
    );
};

export default App;
