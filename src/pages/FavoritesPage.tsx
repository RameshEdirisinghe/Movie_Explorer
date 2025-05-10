import React from 'react';
import { useMovies } from '../contexts/MovieContext';
import MovieGrid from '../components/layout/MovieGrid';

const FavoritesPage: React.FC = () => {
  const { favorites } = useMovies();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Your Favorite Movies</h1>
        <p className="text-gray-400 mb-8">
          {favorites.length > 0 
            ? `You have ${favorites.length} favorite ${favorites.length === 1 ? 'movie' : 'movies'}.` 
            : 'You haven\'t added any favorites yet.'}
        </p>
        
        <MovieGrid
          movies={favorites}
          emptyMessage="You haven't added any favorite movies yet. Browse movies and click the heart icon to add them to your favorites."
        />
      </div>
    </div>
  );
};

export default FavoritesPage;