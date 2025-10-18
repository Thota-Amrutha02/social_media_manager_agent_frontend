import React from "react";

// App SVG icons
const icons = {
  instagram: (
    <svg viewBox="0 0 448 512" className="w-5 h-5 fill-white">
      <path d="M224.1 141c-63.6 0-115 51.5-115 115s51.4 115 115 115 115-51.5 115-115-51.4-115-115-115zm0 190c-41.5 0-75-33.5-75-75s33.5-75 75-75 75 33.5 75 75-33.5 75-75 75zm146.4-194.1c0 14.9-12.1 27-27 27-14.9 0-27-12.1-27-27s12.1-27 27-27c14.9 0 27 12.1 27 27zm76.1 27.2c-1.7-35.7-9.9-67.3-36.1-93.4C384.2 27.1 352.6 18.9 316.9 17.2 281 15.5 225.5 15 168 15S55 15.5 19.1 17.2c-35.7 1.7-67.3 9.9-93.4 36.1S-1.5 132.7.2 168.4c1.7 36 2.2 91.5 2.2 149s-.5 113-2.2 149c-1.7 35.7-9.9 67.3-36.1 93.4s-57.7 34.4-93.4 36.1c-36 1.7-91.5 2.2-149 2.2s-113-.5-149-2.2c-35.7-1.7-67.3-9.9-93.4-36.1S-1.5 440.7.2 405c1.7-36 2.2-91.5 2.2-149s-.5-113-2.2-149c-1.7-35.7-9.9-67.3-36.1-93.4S-57.7-1.5-93.4.2c-36 1.7-91.5 2.2-149 2.2s-113-.5-149-2.2C-351.1-1.5-382.7-9.7-408.8-36.1S-443.2-57.7-444.9-93.4c-1.7-36-2.2-91.5-2.2-149s.5-113 2.2-149c1.7-35.7 9.9-67.3 36.1-93.4S-382.7-443.2-346.9-444.9c36-1.7 91.5-2.2 149-2.2s113 .5 149 2.2c35.7 1.7 67.3 9.9 93.4 36.1S440.7 384.2 442.4 420c1.7 36 2.2 91.5 2.2 149s-.5 113-2.2 149c-1.7 35.7-9.9 67.3-36.1 93.4s-57.7 34.4-93.4 36.1c-36 1.7-91.5 2.2-149 2.2s-113-.5-149-2.2c-35.7-1.7-67.3-9.9-93.4-36.1s-34.4-57.7-36.1-93.4c-1.7-36-2.2-91.5-2.2-149s.5-113 2.2-149c1.7-35.7 9.9-67.3 36.1-93.4S-132.7-57.7-97-59.4c36-1.7 91.5-2.2 149-2.2s113 .5 149 2.2c35.7 1.7 67.3 9.9 93.4 36.1s34.4 57.7 36.1 93.4c1.7 36 2.2 91.5 2.2 149s-.5 113-2.2 149z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 320 512" className="w-5 h-5 fill-white">
      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S259.5 0 225.36 0c-73.3 0-121.36 44.38-121.36 124.72v70.62H22.89V288h81.11v224h100.2V288z"/>
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 512 512" className="w-5 h-5 fill-white">
      <path d="M459.37 151.716c0 1.845 0 3.691-.015 5.536 0 56.578-43.128 121.968-121.967 121.968-24.162 0-46.62-7.099-65.511-19.15 3.392.395 6.824.59 10.26.59 20.208 0 38.81-6.91 53.585-18.513-18.85-.355-34.698-12.777-40.176-29.81 2.642.505 5.336.777 8.07.777 3.91 0 7.7-.53 11.32-1.53-19.73-3.97-34.578-21.375-34.578-42.312v-.53c5.83 3.257 12.523 5.225 19.667 5.456-11.625-7.774-19.28-21.056-19.28-36.082 0-7.939 2.116-15.43 5.83-21.88 21.556 26.45 53.64 43.873 89.91 45.708-1.15-4.937-1.73-10.102-1.73-15.43 0-37.33 30.235-67.565 67.565-67.565 19.44 0 36.998 8.185 49.3 21.46 15.33-3.003 29.706-8.6 42.743-16.303-5.048 15.76-15.76 28.97-29.776 37.32 13.633-1.53 26.642-5.237 38.74-10.59-9.033 13.41-20.435 25.2-33.567 34.63z"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 448 512" className="w-5 h-5 fill-white">
      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.79 0 54.1 0 24.42 24.09 0 53.79 0c29.7 0 53.79 24.42 53.79 54.1 0 29.69-24.09 54-53.79 54zM447.9 448h-92.68V302.4c0-34.7-12.38-58.4-43.37-58.4-23.63 0-37.64 15.88-43.83 31.2-2.25 5.5-2.82 13.1-2.82 20.8V448h-92.68s1.24-236.1 0-260.1h92.68v36.9c12.3-19 34.36-46.1 83.52-46.1 60.96 0 106.8 39.8 106.8 125.3V448z"/>
    </svg>
  ),
};

const platforms = [
  { name: "Instagram", icon: icons.instagram, connected: true, color: "from-pink-500 to-purple-600" },
  { name: "Facebook", icon: icons.facebook, connected: false, color: "from-blue-600 to-blue-700" },
  { name: "Twitter", icon: icons.twitter, connected: false, color: "from-sky-400 to-blue-500" },
  { name: "LinkedIn", icon: icons.linkedin, connected: false, color: "from-blue-700 to-blue-800" },
];

const PlatformConnections = () => {
  return (
    <div className="p-6 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">Connected Platforms</h3>
      <div className="grid grid-cols-2 gap-4">
        {platforms.map((platform) => (
          <div
            key={platform.name}
            className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center w-8 h-8`}
              >
                {platform.icon}
              </div>
              <span className="font-medium text-sm">{platform.name}</span>
            </div>
            {platform.connected ? (
              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">Connected</span>
            ) : (
              <button className="px-2 py-1 text-xs rounded-full border border-gray-300 hover:bg-gray-100">
                Connect
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformConnections;
