import React, { useState } from 'react';
import axios from '../services/axios';
import { useNavigate } from 'react-router-dom';
//import HomePage from './HomePage';

function LoginPage({ handleLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [focusedInput, setFocusedInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitLogin = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", form);

      if (response.status === 200) {
        const userData = response.data;

        if (userData?.token && userData?.message === "✅ Login successful!") {
          // Store token and user data
          localStorage.setItem("token", userData.token);
          const user = {
            email: userData.email,
            username: userData.username,
          };
          localStorage.setItem("user", JSON.stringify(user));

          // Call parent's handleLogin to update global state
          
          setSuccessMessage("✅ Login successful! Redirecting...");
        
          // Add a delay before redirecting to allow success message to be visible
          setTimeout(() => {
            // Open a new tab after a short delay
            window.open("http://localhost:3000/", "_blank");  // Replace with the URL you want to open
            navigate("/");  // Optional: navigate within the app, if needed
          }, 3000);

        } else {
          setError("⚠️ Unexpected response structure.");
        }
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("❌ Invalid email or password.");
      } else {
        setError("⚠️ Unable to connect. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getInputStyle = (name) => ({
    ...styles.input,
    ...(focusedInput === name ? styles.inputFocus : {}),
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Paint Worker Booking 👷‍♂️</h1>
      <p style={styles.subtitle}>Please log in to continue</p>
      <form onSubmit={(e) => { e.preventDefault(); submitLogin(); }} style={styles.form}>
        <input
          name="email"
          type="email"
          placeholder="✉️ Enter your email"
          value={form.email}
          onChange={handleChange}
          required
          onFocus={() => setFocusedInput("email")}
          onBlur={() => setFocusedInput(null)}
          style={getInputStyle("email")}
        />

        <div style={styles.inputWrapper}>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="🔒 Enter your password"
            value={form.password}
            onChange={handleChange}
            required
            onFocus={() => setFocusedInput("password")}
            onBlur={() => setFocusedInput(null)}
            style={getInputStyle("password")}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={styles.toggle}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {error && <p style={styles.error}>{error}</p>}
        {successMessage && <p style={styles.success}>{successMessage}</p>}

        <button
          type="submit"
          disabled={loading}
          target="_blank"
          style={{
            ...styles.button,
            backgroundColor: loading ? "#ccc" : "#4CAF50",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <span>
              <span className="spinner" style={styles.spinner}></span> Logging in...
              
            </span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "420px",
    margin: "80px auto",
    padding: "35px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    border: "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: "1.9rem",
    color: "#333",
    marginBottom: "20px",
    fontWeight: "700",
    letterSpacing: "1px",
    fontFamily: "'Arial', sans-serif",
  },
  subtitle: {
    fontSize: "16px",
    marginTop: "5px",
    marginBottom: "20px",
    color: "#777",
  },
  inputWrapper: {
    position: "relative",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "12px 0",
    borderRadius: "8px",
    border: "1.7px solid #ccc",
    fontSize: "1rem",
    backgroundColor: "#f7f7f7",
    color: "#333",
    outline: "none",
    transition: "all 0.3s ease",
    fontStyle: "italic",
    colorScheme: "light",
  },
  inputFocus: {
    borderColor: "#ff6347",
    backgroundColor: "#fff",
    boxShadow: "0 0 12px rgba(255, 99, 71, 0.2)",
  },
  toggle: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "18px",
  },
  error: {
    fontSize: "1rem",
    color: "#ff6347",
    marginTop: "12px",
    fontWeight: "500",
  },
  success: {
    fontSize: "1rem",
    color: "green",
    marginTop: "12px",
    fontWeight: "500",
  },
  button: {
    width: "100%",
    padding: "14px 20px",
    marginTop: "20px",
    background: "linear-gradient(135deg, #ff6a00, #ee0979)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid #fff",
    borderTop: "2px solid #4CAF50",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: "8px",
    animation: "spin 1s linear infinite",
  },
};

export default LoginPage;
