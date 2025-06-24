import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const AddPainterForm = () => {
  const [form, setForm] = useState({
    name: '',
    expertise: '',
    location: '',
    phone: ''
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      // Allow only numbers
      const phoneRegex = /^[0-9]*$/;
      if (!phoneRegex.test(value)) {
        setPhoneError('Only numbers are allowed');
      } else {
        setPhoneError('');
      }
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');

    // Phone validation
    if (phoneError || !form.phone.match(/^[0-9]{10,}$/)) {
      setError("Please enter a valid phone number with at least 10 digits.");
      return;
    }

    setIsLoading(true);
    axios.post('http://localhost:8080/api/painters', form)
      .then(() => {
        setSuccessMessage('🎉 Painter added successfully!');
        setForm({ name: '', expertise: '', location: '', phone: '' });
      })
      .catch((err) => {
        console.error('Error adding painter:', err);
        setError(err.response?.data?.message || 'Failed to add painter. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });

    // Optionally set success message timeout for 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="add-painter-form slide-in">
      <h2>🎨 Add a New Painter</h2>

      {successMessage && <div className="success-message pop-in">{successMessage}</div>}
      {error && <div className="error-message pop-in">{error}</div>}

      <form onSubmit={handleSubmit} className="form fade-in">
        {['name', 'expertise', 'location'].map((field, index) => (
          <div key={index}>
            <label htmlFor={field} className="form-label">
              {field === 'expertise' ? '🎯 Expertise' :
               field === 'location' ? '🏠 Location' : '👤 Painter Name'}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              placeholder={`Enter painter's ${field}`}
              className="input-field"
            />
          </div>
        ))}

        <div>
          <label htmlFor="phone" className="form-label">📞 Contact Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="Enter contact number"
            className={`input-field ${phoneError ? 'input-error' : ''}`}
          />
          {phoneError && <div className="error-text">{phoneError}</div>}
        </div>

        <button type="submit" className="submit-button bounce" disabled={isLoading}>
          {isLoading ? '⏳ Adding Painter...' : '➕ Add Painter'}
        </button>
      </form>
    </div>
  );
};

export default AddPainterForm;
