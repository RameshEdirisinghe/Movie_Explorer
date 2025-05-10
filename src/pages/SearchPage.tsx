import React, { useEffect, useState } from 'react';
import { useMovies } from '../contexts/MovieContext';
import MovieGrid from '../components/layout/MovieGrid';

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



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const hasMoreResults = currentPage < totalPages;


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