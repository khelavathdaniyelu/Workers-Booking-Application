import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const PainterList = () => {
  const [painters, setPainters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage]= useState(''); 

  useEffect(() => {
    fetchPainters();
  }, []);

  const fetchPainters = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/painters');
      setPainters(response.data);
    } catch (err) {
      setError('Failed to fetch painters. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this painter?');
    if (!confirmDelete) return;
  
    setLoading(true);
    setSuccessMessage(null);
    setError(null);
  
    try {
      await axios.delete(`http://localhost:8080/api/painters/${id}`);
      setPainters((Painters) =>Painters.filter((p) => p.id !== id));
      setSuccessMessage('🗑️ Painter deleted successfully!');
    } catch (err) {
      console.error('Error deleting painter:', err);
      setError('Failed to delete painter. Please try again.');
    } finally {
      setLoading(false);
    }
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  

  const onBook = (painter) => {
    navigate('/BookingPage', { state: { painter } });
  };

  return (
    <div className="painter-list-container">
      <h1 className="painter-title">🎨 Available Painters</h1>

      {loading && <p className="status-text">Loading painters...</p>}
      {error && <p className="error-text">{error}</p>}
      {successMessage && <div className="success-message"><p>{successMessage}</p></div>}

      {!loading && painters.length === 0 && (
        <div className="no-painters">
          <p>No painters found at the moment.</p>
        </div>
      )}

      <ul className="painter-card-list">
        {painters.map((painter) => (
          <li key={painter.id} className="painter-card">
            <div>
              <h3 className="expertise-label">{painter.name}</h3>
              <h2><strong className="expertise-label">ID:</strong> 
              <span className="expertise-label">{painter.id}</span></h2>
              <p>
              <strong className="expertise-label">🎯 Expertise:</strong>{" "}
             <span className="expertise-value">{painter.expertise}</span>
             </p>
              <p><strong className="expertise-label">🏠 Location:</strong> 
              <span className="expertise-value">{painter.location}</span></p>
              <p><strong className="expertise-label">📞 Contact:</strong> 
              <span className="expertise-value">{painter.phone}</span></p>
            </div>
            <div className="painter-buttons">
              <button onClick={() => onBook(painter)} className="submit-button2">Book Now</button>
              <button onClick={() => handleDelete(painter.id)} className="delete-button">❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PainterList;
