import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Calendar } from 'lucide-react';
import { type Movie } from '../../types/movie';
import { useMovies } from '../../contexts/MovieContext';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovies();
  const favorited = isFavorite(movie.id);
  
  // Format release date to year only
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown';
  
  // Handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/placeholder-poster.jpg';
  };

  // Toggle favorite status
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();
    
    if (favorited) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <Link to={`/movie/${movie.id}`} className="group">
      <div className="relative overflow-hidden rounded-lg bg-gray-800 dark:bg-gray-900 shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl">
        {/* Poster Image */}
        <div className="aspect-[2/3] relative overflow-hidden">
          <img
            src={movie.poster_path 
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : '/placeholder-poster.jpg'
            }
            alt={`${movie.title} poster`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 text-white">
              <p className="line-clamp-3 text-sm">{movie.overview}</p>
            </div>
          </div>
        </div>
        
        {/* Movie Info */}
        <div className="p-4">
          <h3 className="font-bold text-white line-clamp-1 mb-2">{movie.title}</h3>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center text-gray-300">
              <Calendar size={16} className="mr-1" />
              <span>{releaseYear}</span>
            </div>
            <div className="flex items-center text-yellow-500">
              <Star size={16} className="mr-1" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 transition-colors hover:bg-black/60"
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            size={20} 
            className={`${favorited ? 'fill-red-500 text-red-500' : 'text-white'}`} 
          />
        </button>
      </div>
    </Link>
  );
};

export default MovieCard;