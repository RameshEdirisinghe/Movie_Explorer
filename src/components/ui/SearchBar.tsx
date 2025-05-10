import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useMovies } from '../../contexts/MovieContext';
import Button from './Button';

const SearchBar: React.FC = () => {
  const { searchMovies, resetSearch, searchQuery } = useMovies();
  const [query, setQuery] = useState(searchQuery);
  const navigate = useNavigate();

  // Update local state when context searchQuery changes
  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Handle search form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (query.trim()) {
      searchMovies(query.trim());
      navigate('/search');
    }
  };

  // Clear search
  const handleClear = () => {
    setQuery('');
    resetSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative flex items-center">
        <div className="absolute left-3 text-gray-400">
          <Search size={20} />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for movies..."
          className="w-full pl-10 pr-16 py-2 bg-gray-800 dark:bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-16 text-gray-400 hover:text-white"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
        
        <Button
          type="submit"
          variant="primary"
          size="sm"
          className="absolute right-0 mr-1"
          disabled={!query.trim()}
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;