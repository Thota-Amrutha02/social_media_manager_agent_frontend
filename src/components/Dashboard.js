import React from "react";
import { TrendingUp, Users, Calendar, Zap } from "lucide-react";

const stats = [
  { label: "Total Reach", value: "245.8K", change: "+12.5%", icon: Users },
  { label: "Engagement Rate", value: "8.4%", change: "+3.2%", icon: TrendingUp },
  { label: "Posts Scheduled", value: "47", change: "+8", icon: Calendar },
  { label: "AI Replies", value: "1,234", change: "+24.1%", icon: Zap },
];

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="p-6 rounded-2xl border border-gray-200 backdrop-blur-sm shadow-md 
                       hover:shadow-lg hover:scale-105 transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 0, 132, 0.15), rgba(255, 154, 0, 0.15), rgba(131, 58, 180, 0.15))",
            }}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <p className="text-base font-semibold text-gray-700 tracking-wide">
                  {stat.label}
                </p>
                <p
                  className="text-4xl font-extrabold bg-clip-text text-transparent"
                  style={{
                    background:
                      "linear-gradient(135deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-green-600 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </p>
              </div>
              <div
                className="p-3 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
                }}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
