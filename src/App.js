import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import StockDisplay from './components/StockDisplay/StockDisplay';
import StockChart from './components/StockChart/StockChart';
import CompanyProfile from './components/CompanyProfile/CompanyProfile';
import CompanyLogo from './components/CompanyLogo/CompanyLogo';
import {
    fetchStockData,
    fetchHistoricalData,
    fetchCompanyProfile
} from './api/stockAPI';

const App = () => {
    const [symbol, setSymbol] = useState('AAPL');
    const [stockData, setStockData] = useState(null);
    const [historicalData, setHistoricalData] = useState([]);
    const [companyProfile, setCompanyProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const currentData = await fetchStockData(symbol);
                const historical = await fetchHistoricalData(symbol);
                const profileData = await fetchCompanyProfile(symbol);

                setStockData(currentData);
                setHistoricalData(historical);
                setCompanyProfile(profileData);
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

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
            <header className="bg-gray-800 sticky z-10 top-0 w-screen h-fit  p-4 shadow-lg">
                <div className="grid grid-cols-5 mx-auto">
                    <h1 className="text-3xl font-bold text-white ml-auto">Stock App</h1>
                    <SearchBar onSearch={setSymbol} />
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
