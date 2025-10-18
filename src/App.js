import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import CaptionGenerator from "./pages/CaptionGenerator";
import TextSummarizer from "./pages/TextSummarizer";
import ImageGenerator from "./pages/ImageGenerator";
import ThumbnailCreator from "./pages/ThumbnailCreator";
import {SavedProjects} from "./pages/SavedProjects";
import Header from "./components/Header";

function App() {
  // Sidebar collapsed by default
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-gradient-to-b from-purple-600 via-pink-500 to-orange-400 text-white transition-all duration-500 ease-in-out overflow-hidden ${
            sidebarOpen ? "w-64" : "w-0"
          }`}
        >
          <div className={`${sidebarOpen ? "opacity-100 p-6" : "opacity-0 p-0"} transition-all`}>
            <h2 className="text-2xl font-bold mb-6">Social Media Management</h2>
            <nav>
  <ul className="space-y-4"> {/* Increased vertical spacing */}
    <li>
      <Link
        to="/"
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
        to="/summarizer"
        className="block text-lg font-medium hover:bg-white/20 p-3 rounded transition-all"
      >
        📖 Text Summarizer
      </Link>
    </li>
    <li>
      <Link
        to="/image"
        className="block text-lg font-medium hover:bg-white/20 p-3 rounded transition-all"
      >
        🖼️ Image Generator
      </Link>
    </li>
    <li>
      <Link
        to="/thumbnail"
        className="block text-lg font-medium hover:bg-white/20 p-3 rounded transition-all"
      >
        🎬 Thumbnail Creator
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

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header toggleSidebar={toggleSidebar} />
          <main className="flex-1 p-4 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/caption" element={<CaptionGenerator />} />
              <Route path="/summarizer" element={<TextSummarizer />} />
              <Route path="/image" element={<ImageGenerator />} />
              <Route path="/thumbnail" element={<ThumbnailCreator />} />
              <Route path="/saved" element={<SavedProjects />} />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
