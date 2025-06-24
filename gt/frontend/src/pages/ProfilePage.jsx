import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../App.css';

// Spinner component for loading state
const Spinner = () => <div className="spinner">Loading...</div>;

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newUsername, setNewUsername] = useState('');
  const navigate = useNavigate();

  // Fetch user profile data
  const fetchUserProfile = useCallback(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Please log in to view your profile');
      navigate('/login');
      return;
    }

    axios
      .get('http://localhost:8080/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data)); // Store user data in localStorage
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          toast.error('Session expired. Please log in again');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          toast.error('Failed to fetch user profile');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]); // Add fetchUserProfile to the dependency array

  const handleProfileUpdate = () => {
    const token = localStorage.getItem('token');

    if (!newUsername.trim()) {
      toast.error('Please enter a new username');
      return;
    }

    axios
      .put(
        'http://localhost:8080/api/auth/profile',
        { username: newUsername },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setUser(response.data); // Set updated user immediately
        localStorage.setItem('user', JSON.stringify(response.data)); // Update localStorage
        setNewUsername(''); // Clear input field
        toast.success('Profile updated successfully');
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message || 'Invalid request');
        } else {
          toast.error('Failed to update profile');
        }
      });
  };

  if (loading) {
    return <Spinner />;
  }

 return (
  <div className="profile-page">
    <h1>User Profile</h1>
    {user ? (
      <>
        <p>
          <strong>Username:</strong>{' '}
          <span style={{ fontWeight: 600 }}>{user.username || user.email}</span>
        </p>
        <p>
          <strong>Email:</strong> {user.email || 'Not provided'}
        </p>

        <div style={{ marginTop: '20px' }}>
          <h3>Update Username</h3>
          <input
            type="text"
            placeholder="Enter new username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            style={{ padding: '8px', marginBottom: '10px', width: '100%' }}
          />
          <button
            onClick={handleProfileUpdate}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Update Profile
          </button>
        </div>
      </>
    ) : (
      <p>No user profile found</p>
    )}
  </div>
);

};

export default ProfilePage;
