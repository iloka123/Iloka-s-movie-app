
import MovieCard from './components/MovieCard'
import Home from './pages/Home';
import {Routes,Route} from 'react-router-dom'
import Favourites from './pages/Favourites';
import NavBar from './components/NavBar';
import "./css/App.css";
import { MovieProvider } from './contexts/MovieContext';
// App component: Main entry point of the application
function App() {
  return (
    <>
      {/* Wrap the app in the MovieProvider so all child components have access to movie context */}
      <MovieProvider>

        {/* Top navigation bar */}
        <NavBar />

        {/* Main content area where routes are rendered */}
        <main className='main-content'>
          <Routes>
            {/* Route for the homepage */}
            <Route path='/' element={<Home />} />

            {/* Route for the favourites page */}
            <Route path='/favourites' element={<Favourites />} />
          </Routes>
        </main>

      </MovieProvider>
    </>
  );
}




export default App
