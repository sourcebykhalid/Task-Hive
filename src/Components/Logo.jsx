import React from "react";
import { Clipboard } from "lucide-react"; // Import the Clipboard icon

const Logo = () => {
  return (
    <div className="flex items-center gap-x-3">
      {/* Icon Container */}
      <div className="p-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full shadow-md">
        <Clipboard className="text-white text-4xl" />
      </div>
      {/* Text Content */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Task Hive</h1>
        <p className="text-sm text-gray-600">Manage your tasks efficiently.</p>
      </div>
    </div>
  );
};

export default Logo;
