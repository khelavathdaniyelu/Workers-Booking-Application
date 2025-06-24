import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddPainterForm from './pages/AddPainterForm';
import PainterList from './components/PainterList';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();
  const profileRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfileMenu = () => setIsProfileOpen(prev => !prev);

  // Load user info from localStorage on page load
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setIsLoggedIn(true);
        setUserProfile(parsedUser);
      } catch (err) {
        console.error('Error parsing user data:', err);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Close profile dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle login success
  const handleLogin = (user) => {
    if (user && user.username && user.email) {
      localStorage.setItem('user', JSON.stringify(user));
      setIsLoggedIn(true);
      setUserProfile(user);
      setMenuOpen(false);
      setIsProfileOpen(true);
      navigate('/');
    } else {
      console.warn("User info missing username or email:", user);
    }
  };

  // Handle logout
  const logoutUser = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserProfile(null);
    setMenuOpen(false);
    setIsProfileOpen(false);
    navigate('/login');
  };

  return (
    <div className="App">
      <nav className="navbar" style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <div>
          <button className="hamburger" onClick={toggleMenu}>☰</button>
        </div>

        <div className="nav-links">
          {!isLoggedIn ? (
            <>
              <NavLink to="/register" className="nav-link" style={{ marginRight: '10px' }}>Sign Up</NavLink>
              <NavLink to="/login" className="nav-link" style={{ marginLeft: '10px' }}>Sign In</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" className="nav-link">Home</NavLink>
              <NavLink to="/bookings" className="nav-link">Book a Painter</NavLink>
               <NavLink to="/about" className="nav-link">About</NavLink>
              <NavLink to="/add-painter" className="nav-link">Add Painter</NavLink>

              <div
                className="nav-link user-profile"
                style={{ position: 'relative', marginLeft: '10px' }}
                onClick={toggleProfileMenu}
                ref={profileRef}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 2px 6px rgba(255, 255, 255, 0.1)',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg,rgb(228, 110, 110),rgb(246, 59, 59))';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(3, 2, 2, 0.4)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = '#fff';
                  }}
                >
                  <FaUserCircle size={29} style={{ filter: 'drop-shadow(0 0 5px rgba(0, 0, 255, 0.7))' }} />
                  <span style={{ fontWeight: 600 }}>{userProfile?.username || userProfile?.email}</span>
                </div>

                {isProfileOpen && (
                  <div
                    className="dropdown-menu"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      backgroundColor: '#fff',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      padding: '10px',
                      zIndex: 1000,
                      minWidth: '180px',
                      display: 'flex',
                      flexDirection: 'column',
                      maxHeight: '200px',
                      overflowY: 'auto'
                    }}
                  >
                    <NavLink
                      to="/profile"
                      className="nav-link"
                      onClick={() => setIsProfileOpen(false)}
                      style={{ padding: '8px 12px', borderRadius: '5px' }}
                    >
                      View Profile
                    </NavLink>
                    <button
                      onClick={logoutUser}
                      style={{
                        backgroundColor: '#cc3300',
                        color: 'white',
                        padding: '8px 12px',
                        border: 'none',
                        borderRadius: '25px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        marginTop: '8px',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = '#a52900')}
                      onMouseOut={(e) => (e.target.style.backgroundColor = '#cc3300')}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Sidebar Menu */}
      <div className={`sidebar-menu ${menuOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleMenu}>✕</button>
        {!isLoggedIn ? (
          <>
            <NavLink to="/register" className="nav-link">Sign Up</NavLink>
            <NavLink to="/login" className="nav-link">Sign In</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/" className="nav-link" onClick={toggleMenu}>Home</NavLink>
            <NavLink to="/bookings" className="nav-link" onClick={toggleMenu}>Book a Painter</NavLink>
            <NavLink to="/about" className="nav-link" onClick={toggleMenu}>About</NavLink>
            <NavLink to="/add-painter" className="nav-link" onClick={toggleMenu}>Add Painter</NavLink>
            <NavLink to="/profile" className="nav-link" onClick={toggleMenu} style={{ display: 'flex', alignItems: 'center' }}>
              <FaUserCircle size={20} style={{ filter: 'drop-shadow(0 0 5px rgba(0, 255, 0, 0.7))', height: '30px', width: '30px', marginRight: '8px' }} />
               <span style={{ fontWeight: 600 }}>{userProfile?.username || userProfile?.email}</span>
            </NavLink>

            <button
              onClick={() => { logoutUser(); toggleMenu(); }}
              style={{
                backgroundColor: '#cc3300',
                color: 'white',
                padding: '10px 7px',
                border: 'none',
                borderRadius: '25px',
                fontWeight: '500',
                cursor: 'pointer',
                margin: '5px',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#a52900')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#cc3300')}
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/bookings" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/add-painter" element={<AddPainterForm />} />
        <Route path="/BookingPage" element={<BookingPage />} />
        <Route path="/painter-list" element={<PainterList />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
