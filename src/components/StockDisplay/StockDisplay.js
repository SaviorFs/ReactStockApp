import React, { useState } from 'react';
import './StockDisplay.css';

const StockDisplay = ({ stockData }) => {
    const [lightboxVisible, setLightboxVisible] = useState(true);

    const closeLightbox = () => {
        setLightboxVisible(false);
    };

    if (!stockData) return <p>No data to display</p>;

    // Formatter for currency
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    // Calculate change percentage if not provided
    const changePercent = stockData.changePercent ?? ((stockData.change / stockData.price) * 100).toFixed(2);

    // Ensure all values are numbers or provide fallback
    const price = stockData.price ? currencyFormatter.format(stockData.price) : 'N/A';
    const dayHigh = stockData.dayHigh ? currencyFormatter.format(stockData.dayHigh) : 'N/A';
    const dayLow = stockData.dayLow ? currencyFormatter.format(stockData.dayLow) : 'N/A';
    const marketCap = stockData.marketCap ? currencyFormatter.format(stockData.marketCap) : 'N/A';
    const change = stockData.change ? currencyFormatter.format(stockData.change) : 'N/A';

    // Determine the class based on positive or negative change
    const changeClass = stockData.change && stockData.change > 0 ? 'text-green-600' : stockData.change && stockData.change < 0 ? 'text-red-600' : 'text-gray-900';

    return (
        <div>
            {lightboxVisible && (
                <div className="stock-display-container"> {/* Updated class name */}
                    <div className="lightbox-content">
                        <button onClick={closeLightbox} className="lightbox-close">×</button>
                        <h2 className="text-xl font-bold">{stockData.symbol} - {stockData.name}</h2>
                        <p className="mt-1">Price: <span className="font-semibold">{price}</span></p>
                        <p className="mt-1">Day High: <span className="font-semibold">{dayHigh}</span></p>
                        <p className="mt-1">Day Low: <span className="font-semibold">{dayLow}</span></p>
                        <p className="mt-1">Market Cap: <span className="font-semibold">{marketCap}</span></p>
                        <p className={`mt-1 ${changeClass}`}>
                            Change: <span className="font-semibold">{change}</span> ({changePercent}%)
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StockDisplay;
