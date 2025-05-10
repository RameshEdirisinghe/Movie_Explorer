import React, { useEffect, useState } from 'react';
import { useMovies } from '../contexts/MovieContext';
import MovieGrid from '../components/layout/MovieGrid';
import MovieFilters, { type FilterOptions } from '../components/ui/MovieFilters';

const SearchPage: React.FC = () => {
  const { 
    searchResults, 
    searchQuery, 
    isLoading, 
    loadMoreResults, 
    currentPage, 
    totalPages,
    searchMovies
  } = useMovies();

  const [filters, setFilters] = useState<FilterOptions>({
    genre: '',
    year: '',
    minRating: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      searchMovies(searchQuery, 1, filters);
    }
  }, [filters]);

  const hasMoreResults = currentPage < totalPages;

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">
          {searchQuery ? (
            <>
              Search Results for <span className="text-yellow-500">"{searchQuery}"</span>
            </>
          ) : (
            'Search Movies'
          )}
        </h1>
        
        {searchQuery && (
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Found {searchResults.length} results out of {totalPages > 0 ? totalPages * 20 : 0} total matches
          </p>
        )}

        <MovieFilters onFilterChange={handleFilterChange} filters={filters} />
        
        <MovieGrid
          movies={searchResults}
          isLoading={isLoading}
          emptyMessage={searchQuery ? 'No movies found matching your search.' : 'Enter a search term to find movies.'}
          hasMore={hasMoreResults}
          onLoadMore={loadMoreResults}
        />
      </div>
    </div>
  );
};

export default SearchPage;