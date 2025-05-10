
import React from 'react';
import { X } from 'lucide-react';
import { type Video } from '../types/movie';

interface MovieTrailerProps {
  video: Video| null;
  onClose: () => void;
}

const MovieTrailer: React.FC<MovieTrailerProps> = ({ video, onClose }) => {
  if (!video) return null;

  // Handle only YouTube videos
  if (video.site !== 'YouTube') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        <div className="bg-gray-900 p-6 rounded-lg max-w-md text-white text-center">
          <p>Non-YouTube videos are not supported.</p>
          <button 
            onClick={onClose}
            className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/60 p-2 rounded-full text-white hover:bg-black/80 transition"
          aria-label="Close trailer"
        >
          <X size={24} />
        </button>
        
        <div className="relative pt-[56.25%] h-0">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
            title={video.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MovieTrailer