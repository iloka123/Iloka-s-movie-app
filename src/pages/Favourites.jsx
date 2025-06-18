import React from 'react';
import "../css/Favorites.css"; // Import CSS specific to the Favourites page
import { useMovieContext } from '../contexts/MovieContext'; // Import context hook to access favourites
import MovieCard from '../components/MovieCard'; // Import the MovieCard component to display each movie

// Favourites component for displaying the list of user's favourite movies
const Favourites = () => {
  // Get the list of favourite movies from the context
  const { favorites } = useMovieContext();

  // If there are no favourite movies, show a friendly message
  if (favorites.length === 0) {
    return (
      <div className='favorites-empty'>
        <h2>No favourite movies yet</h2>
        <p>Start adding movies to your favourites and they will appear here.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Favourites</h2>

      {/* Grid layout to display all favourite movies */}
      <div className='favorites-grid'>
        {favorites.map(movie => (
          <MovieCard key={movie.id} movie={movie} /> // Render a MovieCard for each favourite movie
        ))}
      </div>
    </div>
  );
};

export default Favourites; // Export the component to be used in routing or elsewhere
