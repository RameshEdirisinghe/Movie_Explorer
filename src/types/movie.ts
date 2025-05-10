// Movie object structure
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  genres?: Genre[];
}

// Genre object structure
export interface Genre {
  id: number;
  name: string;
}

// Movie details extended from Movie
export interface MovieDetails extends Movie {
  runtime: number;
  genres: Genre[];
  tagline: string;
  vote_count: number;
}

// Cast member structure
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

// Crew member structure
export interface CrewMember {
  id: number;
  name: string;
  job: string;
}

// Credits structure
export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

// Video (trailer, etc.)
export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

// Search results structure
export interface SearchResults {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// User structure
export interface User {
  username: string;
  password: string;
}