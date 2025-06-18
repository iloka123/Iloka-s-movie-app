import MovieCard from '../components/MovieCard'; // Component to display individual movie cards
import { useState, useEffect } from 'react'; // React hooks
import { searchMovies, getPopularMovies } from '../services/api'; // API service functions
import "../css/Home.css"; // Import Home-specific CSS

// Home component: main page for displaying popular movies and searching
const Home = () => {
    // State for the search input
    const [searchQuery, setSearchQuery] = useState("");

    // State to store fetched movies (either popular or search results)
    const [movies, setMovies] = useState([]);

    // State to handle error messages
    const [error, setError] = useState(null);

    // State to show loading status
    const [loading, setLoading] = useState(true);

    // Load popular movies when the component mounts
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies(); // Fetch popular movies from API
                setMovies(popularMovies); // Store in state
            } catch (err) {
                console.log(err);
                setError("failed to load movies...");
            } finally {
                setLoading(false); // Stop loading regardless of outcome
            }
        };
        loadPopularMovies();
    }, []);

    // Handle search form submission
    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent form refresh

        // Don't search if input is empty or already loading
        if (!searchQuery.trim()) return;
        if (loading) return;

        setLoading(true); // Start loading

        try {
            const searchResults = await searchMovies(searchQuery); // Search for movies with query
            setMovies(searchResults); // Update state with search results
            setError(null); // Clear any previous error
            setSearchQuery(""); // Optional: clear search input
        } catch (err) {
            console.log(err);
            setError("failed to search movies...");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className='home'>
            {/* Search form */}
            <form onSubmit={handleSearch} className='search-form'>
                <input
                    type="text"
                    placeholder='search for movies...'
                    className='search-input'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update input as user types
                />
                <button type='submit' className='search-button'>Search</button>
            </form>

            {/* Error message */}
            {error && <div className='error-message'>{error}</div>}

            {/* Loading indicator or movie grid */}
            {loading
                ? <div className='loading'>loading...</div>
                : (
                    <div className='movies-grid'>
                        {movies.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} /> // Display each movie using MovieCard
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default Home; // Export component for routing
