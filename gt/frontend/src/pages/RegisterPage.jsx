import React, { useState } from 'react';
import axios from '../services/axios'; // Importing the custom Axios instance

function RegisterPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post("/auth/register", form);  // Using the base URL set in axios.js
      setSuccess("🎉 Registration successful! You can now log in.");
      setTimeout(() => setSuccess(""), 5000);
      // Clear the form fields after successful registration
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      console.error("Registration error:", err); 
      if (err.response) {
        const message = err.response.data?.message || "";
        if (err.response.status === 409|| message.includes("email")) {
          setError("⚠️ A user with this email already exists.");
        } else if (err.response.data?.message?.includes("email")) {
          setError("📧 This email is already in use.");
        } else if (err.response.data?.message?.includes("username")) {
          setError("👤 This username is already taken.");
        } else {
          setError(`❌ ${err.response.data.message || "An error occurred. Please try again."}`);
        }
      } else {
        setError("⚠️ Unable to connect. Please try again later.");
      }
      
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.username || !form.email || !form.password) {
      setError("⚠️ All fields are required.");
      return;
    }
    
    // Simple email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(form.email)) {
      setError("⚠️ Please enter a valid email.");
      return;
    }
       
    handleRegister();
  };

  return (
    <div className="register-container">
    <h2>Create New Account</h2>
    <form onSubmit={handleSubmit} className="register-form">
    <input
      type="text"
      name="username"
      placeholder="Choose username"
      onChange={handleChange}
      value={form.username}
      className="input-field"
      required
      />

      <input
        name="email"
        type="email"
        placeholder="Choose email address"
        onChange={handleChange}
        value={form.email}
        className="input-field"
        required
      />
      <div style={{ position: 'relative' }}>
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Choose password"
          onChange={handleChange}
          value={form.password}
          className="input-field"
          required
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            top: '50%',
            right: '12px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
          }}
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      </div>
      {error && <p className="error-message">{error}</p>}
      {success && <p style={{ color: "#4caf50" }}>{success}</p>}
      <button
        type="submit"
        disabled={loading}
        className="submit-button"
      >
        {loading ? "Registering..." : "Sign Up"}
      </button>
    </form>
  </div>
  
  );
}

export default RegisterPage;
