import React from 'react';
import MovieCard from '../ui/MovieCard';
import { type Movie } from '../../types/movie';
import Button from '../ui/Button';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  emptyMessage?: string;
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  title,
  emptyMessage = 'No movies found',
  isLoading = false,
  hasMore = false,
  onLoadMore,
}) => {
  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>
      )}

      {movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          
          {hasMore && onLoadMore && (
            <div className="mt-8 flex justify-center">
              <Button
                onClick={onLoadMore}
                isLoading={isLoading}
                className="px-8"
              >
                Load More
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
          ) : (
            <p className="text-gray-400">{emptyMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieGrid;