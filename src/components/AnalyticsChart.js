import React from "react";

const weekData = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 45 },
  { day: "Wed", value: 80 },
  { day: "Thu", value: 55 },
  { day: "Fri", value: 90 },
  { day: "Sat", value: 75 },
  { day: "Sun", value: 60 },
];

// Simple bar chart icon SVG
const BarChartIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <rect x="3" y="12" width="3" height="9" />
    <rect x="10" y="6" width="3" height="15" />
    <rect x="17" y="3" width="3" height="18" />
  </svg>
);

const AnalyticsChart = () => {
  const maxValue = Math.max(...weekData.map(d => d.value));

  return (
    <div className="p-6 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 flex items-center justify-center text-white">
          <BarChartIcon />
        </div>
        <h3 className="text-lg font-semibold">Weekly Engagement</h3>
      </div>

      <div className="flex items-end justify-between gap-3 h-48">
        {weekData.map((data) => {
          const height = (data.value / maxValue) * 100;
          return (
            <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end h-40">
                <div 
                  className="w-full rounded-t-lg transition-all duration-500 hover:scale-105 cursor-pointer relative group"
                  style={{ 
                    height: `${height}%`,
                    background: "linear-gradient(135deg, #8e44ad 10%, #f80759 50%, #fcb045 90%)"
                  }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {data.value}%
                  </div>
                </div>
              </div>
              <span className="text-xs font-medium text-gray-500">{data.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalyticsChart;
