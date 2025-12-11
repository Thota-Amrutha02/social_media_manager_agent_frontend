// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import CaptionGenerator from "./pages/CaptionGenerator";
import { SavedProjects } from "./pages/SavedProjects";
import Header from "./components/Header";

function App() {
  // Sidebar collapsed by default
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null); // reactive auth state

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // initialize auth state from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      setUser(null);
    }
  }, []);

  // helper: call this after successful login/signup to set auth (and persist)
  const handleLogin = (userObj) => {
    setUser(userObj);
    if (userObj) localStorage.setItem("user", JSON.stringify(userObj));
    else localStorage.removeItem("user");
  };

  const isLoggedIn = !!user;

  return (
    <Router>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Sidebar (show only if logged in) */}
        {isLoggedIn && (
          <aside
            className={`bg-gradient-to-b from-purple-600 via-pink-500 to-orange-400 text-white transition-all duration-500 ease-in-out overflow-hidden ${
              sidebarOpen ? "w-64" : "w-0"
            }`}
          >
            <div
              className={`${
                sidebarOpen ? "opacity-100 p-6" : "opacity-0 p-0"
              } transition-all`}
            >
              <h2 className="text-2xl font-bold mb-6">Social Media Management</h2>
              <nav>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/home"
                      className="block text-lg font-medium hover:bg-white/20 p-3 rounded transition-all"
                    >
                      🏠 Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/caption"
                      className="block text-lg font-medium hover:bg-white/20 p-3 rounded transition-all"
                    >
                      ✍️ Caption Generator
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/saved"
                      className="block text-lg font-medium hover:bg-white/20 p-3 rounded transition-all"
                    >
                      💾 Saved Projects
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {isLoggedIn && <Header toggleSidebar={toggleSidebar} />}
          <main className="flex-1 p-4 overflow-y-auto">
            <Routes>
              {/* Root path shows AuthPage first */}
              <Route path="/" element={<AuthPage onLogin={handleLogin} />} />

              {/* Home route after login */}
              <Route
                path="/home"
                element={isLoggedIn ? <Home /> : <Navigate to="/" replace />}
              />

              {/* Protected routes */}
              <Route
                path="/caption"
                element={isLoggedIn ? <CaptionGenerator /> : <Navigate to="/" replace />}
              />
              <Route
                path="/saved"
                element={isLoggedIn ? <SavedProjects /> : <Navigate to="/" replace />}
              />

              {/* Optional direct auth route */}
              <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
