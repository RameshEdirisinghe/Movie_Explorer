import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';
import type { Credits, Movie, MovieDetails, SearchResults, Video } from '../types/movie';


// API configuration
const API_URL = import.meta.env.VITE_TMDB_API_URL;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_KEY;

// Create Axios instance with authentication headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

interface MovieContextType {
  trendingMovies: Movie[];
  searchResults: Movie[];
  favorites: Movie[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  searchMovies: (query: string, page?: number, filters?: FilterOptions) => Promise<void>;
  getTrendingMovies: (page?: number, filters?: FilterOptions) => Promise<void>;
  getMovieDetails: (movieId: number) => Promise<MovieDetails | null>;
  getMovieCredits: (movieId: number) => Promise<Credits | null>;
  getMovieVideos: (movieId: number) => Promise<Video[]>;
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  resetSearch: () => void;
  loadMoreResults: () => Promise<void>;
  loadMoreTrending: () => Promise<void>;
  isFavorite: (movieId: number) => boolean;
}

interface FilterOptions {
  genre: string;
  year: string;
  minRating: string;
}

const MovieContext = createContext<MovieContextType>({
  trendingMovies: [],
  searchResults: [],
  favorites: [],
  searchQuery: '',
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  searchMovies: async () => {},
  getTrendingMovies: async () => {},
  getMovieDetails: async () => null,
  getMovieCredits: async () => null,
  getMovieVideos: async () => [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  resetSearch: () => {},
  loadMoreResults: async () => {},
  loadMoreTrending: async () => {},
  isFavorite: () => false,
});

export const useMovies = () => useContext(MovieContext);

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    return localStorage.getItem('lastSearch') || '';
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    genre: '',
    year: '',
    minRating: ''
  });

  const getTrendingMovies = async (page: number = 1, filters?: FilterOptions): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const params: any = { page };
      
      if (filters) {
        if (filters.genre) params.with_genres = filters.genre;
        if (filters.year) params.primary_release_year = filters.year;
        if (filters.minRating) params.vote_average_gte = filters.minRating;
      }
      
      const response = await api.get<SearchResults>('/trending/movie/day', { params });
      
      if (page === 1) {
        setTrendingMovies(response.data.results);
      } else {
        setTrendingMovies(prev => [...prev, ...response.data.results]);
      }
      
      setCurrentPage(response.data.page);
      setTotalPages(response.data.total_pages);
      setCurrentFilters(filters || { genre: '', year: '', minRating: '' });
    } catch (err) {
      setError('Failed to fetch trending movies. Please try again later.');
      console.error('Error fetching trending movies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreTrending = async (): Promise<void> => {
    if (currentPage < totalPages) {
      await getTrendingMovies(currentPage + 1, currentFilters);
    }
  };

  const searchMovies = async (query: string, page: number = 1, filters?: FilterOptions): Promise<void> => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setSearchQuery(query);
    
    try {
      const params: any = {
        query,
        page,
        include_adult: false,
      };
      
      if (filters) {
        if (filters.genre) params.with_genres = filters.genre;
        if (filters.year) params.primary_release_year = filters.year;
        if (filters.minRating) params.vote_average_gte = filters.minRating;
      }
      
      const response = await api.get<SearchResults>('/search/movie', { params });
      
      if (page === 1) {
        setSearchResults(response.data.results);
      } else {
        setSearchResults(prev => [...prev, ...response.data.results]);
      }
      
      setCurrentPage(response.data.page);
      setTotalPages(response.data.total_pages);
      setCurrentFilters(filters || { genre: '', year: '', minRating: '' });
      
      localStorage.setItem('lastSearch', query);
    } catch (err) {
      setError('Failed to find movies. Please try again later.');
      console.error('Error searching movies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreResults = async (): Promise<void> => {
    if (currentPage < totalPages) {
      await searchMovies(searchQuery, currentPage + 1, currentFilters);
    }
  };

  const resetSearch = (): void => {
    setSearchResults([]);
    setSearchQuery('');
    setCurrentPage(1);
    setCurrentFilters({ genre: '', year: '', minRating: '' });
    localStorage.removeItem('lastSearch');
  };

  const getMovieDetails = async (movieId: number): Promise<MovieDetails | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.get<MovieDetails>(`/movie/${movieId}`);
      return response.data;
    } catch (err) {
      setError('Failed to fetch movie details. Please try again later.');
      console.error('Error fetching movie details:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getMovieCredits = async (movieId: number): Promise<Credits | null> => {
    try {
      const response = await api.get<Credits>(`/movie/${movieId}/credits`);
      return response.data;
    } catch (err) {
      console.error('Error fetching movie credits:', err);
      return null;
    }
  };

  const getMovieVideos = async (movieId: number): Promise<Video[]> => {
    try {
      const response = await api.get(`/movie/${movieId}/videos`);
      return response.data.results;
    } catch (err) {
      console.error('Error fetching movie videos:', err);
      return [];
    }
  };

  const addToFavorites = (movie: Movie): void => {
    setFavorites(prev => {
      if (!prev.some(m => m.id === movie.id)) {
        const updatedFavorites = [...prev, movie];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return updatedFavorites;
      }
      return prev;
    });
  };

  const removeFromFavorites = (movieId: number): void => {
    setFavorites(prev => {
      const updatedFavorites = prev.filter(movie => movie.id !== movieId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const isFavorite = (movieId: number): boolean => {
    return favorites.some(movie => movie.id === movieId);
  };

  useEffect(() => {
    getTrendingMovies();
    
    if (searchQuery) {
      searchMovies(searchQuery);
    }
  }, []);

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        searchResults,
        favorites,
        searchQuery,
        isLoading,
        error,
        currentPage,
        totalPages,
        searchMovies,
        getTrendingMovies,
        getMovieDetails,
        getMovieCredits,
        getMovieVideos,
        addToFavorites,
        removeFromFavorites,
        resetSearch,
        loadMoreResults,
        loadMoreTrending,
        isFavorite,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;