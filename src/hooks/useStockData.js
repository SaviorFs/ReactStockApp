// src/hooks/useStockData.js

import { useState, useEffect } from 'react';
import { fetchStockData } from '../api/stockAPI';

const useStockData = (symbol) => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchStockData(symbol);
        setStockData(data);
        setError(null);
      } catch (error) {
        setError(error);
        setStockData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  return { stockData, loading, error };
};

export default useStockData;
