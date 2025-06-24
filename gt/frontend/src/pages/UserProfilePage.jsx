import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setError('No user profile found. Please log in.');
      navigate('/login');  // Redirect to login page if no user is found in localStorage
    }
  }, [navigate]);

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Profile</h2>
      <p style={styles.info}><strong>Name:</strong> {user.name}</p>
      <p style={styles.info}><strong>Email:</strong> {user.email}</p>
      <p style={styles.info}><strong>Role:</strong> {user.role || 'Not available'}</p>
      {/* Add other profile information as needed */}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "50px auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "20px",
    fontWeight: "700",
  },
  info: {
    fontSize: "1rem",
    margin: "10px 0",
    color: "#555",
  },
  error: {
    color: "#f44336",
    fontSize: "1rem",
    fontWeight: "500",
    textAlign: "center",
    marginTop: "20px",
  },
};

export default UserProfile;