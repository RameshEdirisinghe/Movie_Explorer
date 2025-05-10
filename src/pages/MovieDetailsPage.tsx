import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, Star, Calendar, Heart, ArrowLeft, Play, Film, Users 
} from 'lucide-react';
import { useMovies } from '../contexts/MovieContext';
import Button from '../components/ui/Button';
import MovieTrailer from '../components/MovieTrailer';
import { type CastMember, type MovieDetails, type Video } from '../types/movie';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = parseInt(id || '0');
  const navigate = useNavigate();
  
  const { 
    getMovieDetails, 
    getMovieCredits, 
    getMovieVideos,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    isLoading 
  } = useMovies();
  
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [favorited, setFavorited] = useState(false);
  
  // Fetch movie details, credits, and videos
  useEffect(() => {
    const fetchMovieData = async () => {
      if (movieId) {
        // Fetch movie details
        const details = await getMovieDetails(movieId);
        if (details) {
          setMovie(details);
          setFavorited(isFavorite(movieId));
          
          // Fetch credits
          const credits = await getMovieCredits(movieId);
          if (credits) {
            setCast(credits.cast.slice(0, 10)); // Get top 10 cast members
          }
          
          // Fetch videos
          const movieVideos = await getMovieVideos(movieId);
          setVideos(movieVideos);
          
          // Find trailer
          const trailerVideo = movieVideos.find(
            video => video.type === 'Trailer' && video.site === 'YouTube'
          );
          if (trailerVideo) {
            setTrailer(trailerVideo);
          }
        }
      }
    };
    
    fetchMovieData();
  }, [movieId]);
  
  // Handle back navigation
  const handleBack = () => {
    navigate(-1);
  };
  
  // Toggle trailer visibility
  const toggleTrailer = () => {
    setShowTrailer(!showTrailer);
  };
  
  // Toggle favorite status
  const toggleFavorite = () => {
    if (movie) {
      if (favorited) {
        removeFromFavorites(movie.id);
      } else {
        addToFavorites(movie);
      }
      setFavorited(!favorited);
    }
  };
  
  // Format movie runtime
  const formatRuntime = (minutes?: number) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Loading state
  if (isLoading || !movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }
  
  // Format release date
  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown';
  
  return (
    <>
      {/* Backdrop */}
      <div className="relative min-h-screen bg-gray-900 text-white">
        {movie.backdrop_path && (
          <div className="absolute top-0 left-0 w-full h-[70vh] z-0">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-black/60"></div>
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-24 pb-12">
          {/* Back button */}
          <button
            onClick={handleBack}
            className="flex items-center text-white mb-8 hover:text-yellow-500 transition"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span>Back</span>
          </button>
          
          {/* Movie details */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="rounded-lg overflow-hidden shadow-xl bg-gray-800">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : '/placeholder-poster.jpg'
                  }
                  alt={`${movie.title} poster`}
                  className="w-full h-auto"
                />
              </div>
              
              {/* Action buttons */}
              <div className="mt-4 flex gap-2">
                {trailer && (
                  <Button
                    variant="primary"
                    className="flex-1 flex items-center justify-center"
                    onClick={toggleTrailer}
                  >
                    <Play size={18} className="mr-2" /> Watch Trailer
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  className="p-3"
                  onClick={toggleFavorite}
                  aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart className={favorited ? 'fill-red-500 text-red-500' : ''} />
                </Button>
              </div>
            </div>
            
            {/* Details */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
              
              {movie.tagline && (
                <p className="text-yellow-500 text-lg italic mb-4">{movie.tagline}</p>
              )}
              
              {/* Movie stats */}
              <div className="flex flex-wrap gap-4 mb-6 text-gray-300">
                <div className="flex items-center">
                  <Star className="text-yellow-500 mr-1" size={18} />
                  <span>
                    {movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1" size={18} />
                  <span>{releaseDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1" size={18} />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              </div>
              
              {/* Genres */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Overview */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2">Overview</h3>
                <p className="text-gray-300 leading-relaxed">
                  {movie.overview || 'No overview available.'}
                </p>
              </div>
              
              {/* Cast */}
              {cast.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <Users size={20} className="mr-2" /> Cast
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {cast.map((person) => (
                      <div key={person.id} className="bg-gray-800 rounded-lg overflow-hidden">
                        <div className="aspect-[2/3]">
                          <img
                            src={
                              person.profile_path
                                ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                                : '/placeholder-person.jpg'
                            }
                            alt={person.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-2">
                          <p className="font-medium text-sm line-clamp-1">{person.name}</p>
                          <p className="text-xs text-gray-400 line-clamp-1">{person.character}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Trailer modal */}
      {showTrailer && trailer && (
        <MovieTrailer video={trailer} onClose={toggleTrailer} />
      )}
    </>
  );
};

export default MovieDetailsPage;