import { Link } from 'react-router-dom'; // Import Link for navigation without page reload
import "../css/Navbar.css"; // Import the CSS file for navbar styling

// NavBar component for the top navigation bar
const NavBar = () => {
  return (
    <nav className='navbar'> {/* Main navigation container */}
      
      {/* Brand/logo section linking to the homepage */}
      <div className='navbar-brand'>
        <Link to="/">Movie app</Link>
      </div>

      {/* Navigation links */}
      <div className="navbar-links">
        <Link to="/" className='nav-link'>Home</Link> {/* Link to the Home page */}
        <Link to="/favourites" className='nav-link'>Favourites</Link> {/* Link to the Favourites page */}
      </div>

    </nav>
  );
};

export default NavBar; // Export the component for use in other parts of the app
