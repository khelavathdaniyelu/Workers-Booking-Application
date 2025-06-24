import React from 'react';
import '../pages/BookingPage.css'; // Import the CSS for the component

const BookingList = ({ bookings, handleDelete }) => {
  if (bookings.length === 0) {
    return <p className="no-bookings">No bookings yet.</p>;
  }

  return (
    <div className="booking-list">
      {bookings.map((booking) => (
        <div key={booking.id} className="booking-item">
          <h3 className="booking-item-title">{booking.clientName}</h3>
          <p className="booking-item-date">
            {new Date(booking.date).toLocaleDateString()}
          </p>
          <div className="booking-info">
            <span>Painter ID: {booking.id}</span>
            <span className="status">{booking.status}</span>
          </div>

          <button
            onClick={() => handleDelete(booking.id)}
            className="submit-button"
          >
            🗑️ Delete Booking
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookingList;
