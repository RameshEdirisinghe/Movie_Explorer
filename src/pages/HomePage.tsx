import React, { useEffect, useState } from 'react';
import { Film } from 'lucide-react';
import { useMovies } from '../contexts/MovieContext';
import MovieGrid from '../components/layout/MovieGrid';

const HomePage: React.FC = () => {
  const { 
    trendingMovies, 
    isLoading, 
    getTrendingMovies,
    currentPage,
    totalPages,
    loadMoreTrending
  } = useMovies();

  const hasMoreTrending = currentPage < totalPages;
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        {/* Background image with gradient overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg')",
            backgroundPosition: "center 20%"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-black/30"></div>
        </div>
        
        {/* Hero content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Discover Amazing Movies
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Explore thousands of movies, from blockbusters to indie gems. Find your next favorite film today.
            </p>
            <div className="flex items-center text-yellow-500 animate-pulse">
              <Film size={24} className="mr-2" />
              <span className="font-medium">Trending movies updated daily</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trending Movies Section */}
      <section className="container mx-auto px-4 py-12">
        <MovieGrid
          title="Trending Movies"
          movies={trendingMovies}
          isLoading={isLoading}
          emptyMessage="No trending movies available. Please try again later."
          hasMore={hasMoreTrending}
          onLoadMore={loadMoreTrending}
        />
      </section>
    </div>
  );
};

export default HomePage;