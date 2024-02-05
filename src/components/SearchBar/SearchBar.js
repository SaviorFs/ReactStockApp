import React from 'react';
import './SearchBar.css'; // Import the CSS file

const SearchBar = ({ onSearch }) => {
    const [input, setInput] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(input.toUpperCase());
    };

    return (
      <form onSubmit={handleSubmit} className="search-bar">
          <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter stock symbol (e.g., AAPL)"
              className="search-input"
          />
          <button
              type="submit"
              className="search-button"
          >
              Search
          </button>
      </form>
  );
};

export default SearchBar;
