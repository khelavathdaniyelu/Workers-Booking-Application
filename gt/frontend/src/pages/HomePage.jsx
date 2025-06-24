import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PainterList from '../components/PainterList';
import axios from '../services/axios';
import './BookingPage.css'; 

const HomePage = () => {
  const [painters, setPainters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
  const storedUserData = localStorage.getItem("user");
  let user = null;
  if (storedUserData) {
    try {
      user = JSON.parse(storedUserData);
    } catch (err) {
      console.error('Error parsing user data:', err);
    }
  }

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      axios.get('http://localhost:8080/api/painters')
        .then((res) => {
          setPainters(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching painters:', err);
          setError('Failed to load painters. Please try again later.');
          setLoading(false);
        });
    }
  }, [user]);

  const handleBook = (painter) => {
    navigate('/book-a-painter', { state: { painter } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-blue-600 text-xl">Loading painters...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
     
      {error && (
        <div className="text-red-500 text-center mb-4">
          <p>{error}</p>
        </div>
      )}

      {painters.length > 0 ? (
        <PainterList painters={painters} onBook={handleBook} />
      ) : (
        <div className="text-center text-gray-600">
          <p className="no-bookings">No painters available at the moment. Please try again later.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
