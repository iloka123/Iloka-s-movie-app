import { createContext, useState, useContext, useEffect } from "react";

// Create a context for managing movie favourites
const MovieContext = createContext();

// Custom hook for accessing the context easily
export const useMovieContext = () => useContext(MovieContext);

// Provider component to wrap around parts of the app that need access to movie context
export const MovieProvider = ({ children }) => {
    // State to store the list of favourite movies
    const [favorites, setFavourites] = useState([]);

    // Load favourites from localStorage when the component mounts
    useEffect(() => {
        const storedFavs = localStorage.getItem("favourites");
        if (storedFavs) setFavourites(JSON.parse(storedFavs)); // Parse and set stored favourites if available
    }, []);

    // Save the favourites to localStorage whenever the 'favorites' state changes
    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favorites));
    }, [favorites]);

    // Function to add a movie to the favourites list
    const addToFavourites = (movie) => {
        setFavourites(prev => [...prev, movie]); // Add new movie to existing list
    };

    // Function to remove a movie from the favourites list using its ID
    const removeFromFavourites = (movieId) => {
        setFavourites(prev => prev.filter(movie => movie.id !== movieId)); // Filter out the movie with matching ID
    };

    // Function to check if a movie is already marked as favourite
    const isFavourite = (movieId) => {
        return favorites.some(movie => movie.id === movieId); // Returns true if movie is in favourites
    };

    // The context value to be provided to consuming components
    const value = {
        favorites,
        addToFavourites,
        removeFromFavourites,
        isFavourite
    };

    // Wrap children components with the context provider
    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};
