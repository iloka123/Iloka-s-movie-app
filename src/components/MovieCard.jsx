import React from 'react';
import "../css/MovieCard.css"; // Importing the CSS file specific to MovieCard styling
import { useMovieContext } from '../contexts/MovieContext'; // Importing context hook to access movie-related state and actions

// MovieCard component receives a 'movie' object as a prop
const MovieCard = ({ movie }) => {
    // Destructuring context values: 
    // isFavourite checks if a movie is in favourites,
    // addToFavourites adds a movie to favourites,
    // removeFromFavourites removes a movie from favourites
    const { isFavourite, addToFavourites, removeFromFavourites } = useMovieContext();

    // Check if the current movie is already in the favourites list
    const favourite = isFavourite(movie.id);

    // Handles the click on the favourite button
    const onFavouriteClick = (e) => {
        e.preventDefault(); // Prevent default button behavior
        if (favourite) {
            removeFromFavourites(movie.id); // Remove if already a favourite
        } else {
            addToFavourites(movie); // Add if not a favourite
        }
    };

    return (
        <div className='movie-card'>
            {/* Movie poster section */}
            <div className='movie-poster'>
                {/* Display the movie poster using the TMDB image URL */}
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

                {/* Overlay that shows the favourite button */}
                <div className='movie-overlay'>
                    <button
                        className={`favorite-btn ${favourite ? "active" : ""}`} // Highlight button if movie is favourited
                        onClick={onFavouriteClick} // Attach click handler
                    >
                        ❤︎ {/* Heart icon as the favourite button */}
                    </button>
                </div>
            </div>

            {/* Movie title and release year */}
            <div className='movie-info'>
                <h3>{movie.title}</h3>
                {/* Display the year only from the release date */}
                <p>{movie.release_date?.split("-")[0]}</p>
            </div>
        </div>
    );
};

export default MovieCard; // Export the component to use in other parts of the app
