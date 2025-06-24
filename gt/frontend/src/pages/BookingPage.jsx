// src/pages/BookingPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BookingList from '../components/BookingList';
import './BookingPage.css';

const BookingPage = () => {
  const location = useLocation();
  const passedPainter = location.state?.painter; // Painter passed from HomePage

  const [form, setForm] = useState({
    clientName: '',
    date: '',
    status: '',
    painterId: ''
  });

  const [painters, setPainters] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [statusError, setStatusError] = useState('');

  // Fetch painters and bookings
  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get('http://localhost:8080/api/painters'),
      axios.get('http://localhost:8080/api/booking')
    ])
      .then(([painterRes, bookingRes]) => {
        setPainters(painterRes.data);
        setBookings(bookingRes.data);

        // If painter is passed via navigation, pre-select it
        if (passedPainter) {
          setForm(prev => ({ ...prev, painterId: passedPainter.id.toString() }));
        }
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, [passedPainter]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (statusError || !form.status.trim()) {
      setError("Please enter a valid status (letters only).");
      return;
    }

    axios.post('http://localhost:8080/api/booking', form)
      .then(() => {
        setSuccessMessage('🎉 Booking successful!');
        setForm({ clientName: '', date: '', status: '', painterId: '' });
        return axios.get('http://localhost:8080/api/booking');
      })
      .then(res => setBookings(res.data))
      .catch(err => {
        console.error('Error during booking:', err);
        setError('Failed to create booking. Please try again.');
      });

    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDelete = async (bookingId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
    if (!confirmDelete) return;

    setLoading(true);
    setSuccessMessage(null);
    setBookings(prev => prev.filter(booking => booking.id !== bookingId));

    try {
      await axios.delete(`http://localhost:8080/api/booking/${bookingId}`);
      setSuccessMessage('🗑️ Booking deleted successfully!');
    } catch (err) {
      console.error('Error during deletion:', err);
      setError('Failed to delete booking. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div className="booking-page">
      <h1 className="title">🎨 Book a Painter</h1>

      {error && <div className="error-message"><p>{error}</p></div>}
      {successMessage && <div className="success-message"><p>{successMessage}</p></div>}

      <form onSubmit={handleSubmit} className="booking-form">
        <div>
          <label htmlFor="clientName" className="form-label">Client Name</label>
          <input
            id="clientName"
            name="clientName"
            placeholder="Enter your name"
            value={form.clientName}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="date" className="form-label">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="status" className="form-label">Status</label>
          <input
            type="text"
            id="status"
            name="status"
            placeholder="Booking status"
            value={form.status}
            onChange={(e) => {
              const value = e.target.value;
              const isValid = /^[A-Za-z\s]*$/.test(value);
              if (isValid || value === '') {
                setForm({ ...form, status: value });
                setStatusError('');
              } else {
                setStatusError('Only letters are allowed in status');
              }
            }}
            required
            className={`input-field ${statusError ? 'input-error' : ''}`}
          />
          {statusError && <div className="error-text">{statusError}</div>}
        </div>

        <div>
          <label htmlFor="painterId" className="form-label">Select a Painter</label>
          <select
            id="painterId"
            name="painterId"
            value={form.painterId}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">Select a Painter</option>
            {painters.map((painter) => (
              <option key={painter.id} value={painter.id}>
                ID: {painter.id} | {painter.name} - {painter.expertise}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-button">✅ Book Now</button>
      </form>

      <div className="separator"></div>

      <div className="booking-list-container">
        <h3 className="section-title">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="My Bookings"
            className="icon-image"
          /> My Bookings
        </h3>

        {loading ? (
          <div className="loading-text">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <p className="no-bookings">No bookings yet. Be the first to book! 🖌️</p>
        ) : (
          <BookingList bookings={bookings} handleDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default BookingPage;
