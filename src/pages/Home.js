import React from "react";

import Dashboard from "../components/Dashboard";
import AIContentGenerator from "../components/AIContentGenerator";
import PlatformConnections from "../components/PlatformConnections";
import ScheduleCalendar from "../components/ScheduleCalendar";
import AnalyticsChart from "../components/AnalyticsChart";
import heroDashboard from "../assets/hero-dashboard.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50">


      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src={heroDashboard}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-6 py-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Your Social Media Command Center
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage all your social platforms, generate AI content, and analyze
            performance—all in one place
          </p>
        </div>
      </div>

      {/* Main Dashboard */}
      <main className="container mx-auto px-6 pb-12 space-y-8">
        <Dashboard />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AIContentGenerator />
            <AnalyticsChart />
          </div>
          <div className="space-y-6">
            <PlatformConnections />
            <ScheduleCalendar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
