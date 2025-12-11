// src/pages/AuthPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage({ onLogin }) {
  const [tab, setTab] = useState("login");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Toast helper
  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // Read values from DOM (keeps your existing UI markup)
    const email =
      tab === "login"
        ? document.getElementById("login-email").value
        : document.getElementById("signup-email").value;
    const password =
      tab === "login"
        ? document.getElementById("login-password").value
        : document.getElementById("signup-password").value;
    const name = tab === "signup" ? document.getElementById("signup-name").value : null;

    const payload =
      tab === "login"
        ? { username: email, password }
        : { username: email, password, name, instagram_token: null };

    const endpoint =
      tab === "login" ? "http://localhost:5000/auth/login" : "http://localhost:5000/auth/signup";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        showToast(data.message || (tab === "login" ? "Login successful!" : "Signup successful!"), "success");

        // Use returned user if available, otherwise build basic user object
        const userObj = data.user || { username: email, name: name || null, instagram_token: data.user?.instagram_token || null };

        // Notify parent App to update auth state & persist
        if (onLogin) onLogin(userObj);

        // Navigate to /home (replace history so back doesn't go to auth)
        navigate("/home", { replace: true });
      } else {
        showToast(data.message || "Something went wrong!", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Backend not reachable. Make sure Flask is running.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-app">
      <style>{`
        html, body, #root { height: 100%; margin: 0; }
        .auth-app {
          min-height: 100vh;
          position: relative;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial;
          overflow: hidden;
        }
        .bg {
          position: fixed;
          inset: 0;
          background-image: url('/sticker.webp');
          background-size: cover;
          background-position: center;
          filter: blur(6px);
          transform: scale(1.03);
          z-index: 0;
        }
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(8px);
          z-index: 1;
        }
        .wrap {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 28px;
        }
        .card {
          width: 100%;
          max-width: 520px;
          border-radius: 16px;
          padding: 32px;
          background: #fff;
          box-shadow: 0 18px 40px rgba(2,6,23,0.25);
          color: #111;
          text-align: center;
        }
        .tabs {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 18px;
        }
        .tab-btn {
          padding: 10px 18px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-weight: 700;
          background: transparent;
          color: #333;
          font-size: 1.05rem;
        }
        .tab-btn.active {
          background: #e2e8f0;
          box-shadow: 0 8px 22px rgba(8,12,25,0.15);
          transform: translateY(-2px);
        }
        .field {
          margin-bottom: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-align: left;
        }
        .field label {
          font-size: 0.95rem;
          color: #333;
        }
        .field input {
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid #ccc;
          background: #f9fafb;
          color: #111;
          outline: none;
          font-size: 1rem;
        }
        .actions {
          display: flex;
          gap: 12px;
          margin-top: 12px;
        }
        .btn-primary {
          flex: 1;
          padding: 12px 14px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-weight: 700;
          background: linear-gradient(90deg, #0ea5e9, #06b6d4);
          color: #fff;
          font-size: 1.05rem;
        }
        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .btn-ghost {
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid #ccc;
          background: transparent;
          color: #333;
          cursor: pointer;
        }

        /* Toast */
        .toast {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 14px 20px;
          border-radius: 10px;
          color: white;
          font-weight: 600;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: fadeInOut 2s ease forwards;
        }
        .toast.success {
          background: linear-gradient(90deg, #22c55e, #16a34a);
        }
        .toast.error {
          background: linear-gradient(90deg, #ef4444, #dc2626);
        }
        .toast-icon {
          font-size: 1.2rem;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-20px); }
          10%, 90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
      `}</style>

      <div className="bg" />
      <div className="overlay" />
      <div className="wrap">
        <div className="card">
          <div className="tabs">
            <button
              className={`tab-btn ${tab === "login" ? "active" : ""}`}
              onClick={() => setTab("login")}
              type="button"
            >
              Login
            </button>
            <button
              className={`tab-btn ${tab === "signup" ? "active" : ""}`}
              onClick={() => setTab("signup")}
              type="button"
            >
              Sign up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {tab === "login" ? (
              <>
                <h2>Welcome back</h2>
                <p>Sign in to manage your social posts</p>
                <div className="field">
                  <label>Email</label>
                  <input id="login-email" type="email" required />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input id="login-password" type="password" required />
                </div>
                <div className="actions">
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>Create account</h2>
                <p>Get started with Social Media Manager</p>
                <div className="field">
                  <label>Full name</label>
                  <input id="signup-name" type="text" required />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input id="signup-email" type="email" required />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input id="signup-password" type="password" required />
                </div>
                <div className="actions">
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? "Signing up..." : "Sign up"}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>

      {toast && (
        <div className={`toast ${toast.type}`}>
          <span className="toast-icon">{toast.type === "success" ? "✅" : "❌"}</span>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
