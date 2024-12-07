import React from "react";
import { Clipboard, CheckCircle, Calendar, User } from "lucide-react"; // Icons from Lucid
import Reveal from "./Reveal";

const HeroSection = () => {
  return (
    <Reveal>
      <div className="flex flex-col items-center justify-center  bg-gradient-to-r from-yellow-100 to-black rounded-lg p-8  text-gray-100  shadow-lg shadow-blue-gray-500">
        <div className="flex flex-wrap justify-center gap-10 mb-6">
          <div className="flex flex-col items-center">
            <Clipboard className="w-32 h-32 text-blue-600" />
            <p className="mt-2 text-lg font-semibold">Manage Tasks</p>
          </div>
          <div className="flex flex-col items-center">
            <CheckCircle className="w-32 h-32 text-green-600" />
            <p className="mt-2 text-lg font-semibold">Track Progress</p>
          </div>
          <div className="flex flex-col items-center">
            <Calendar className="w-32 h-32 text-yellow-600" />
            <p className="mt-2 text-lg font-semibold">Schedule Tasks</p>
          </div>
          <div className="flex flex-col items-center">
            <User className="w-32 h-32 text-purple-600" />
            <p className="mt-2 text-lg font-semibold">Collaborate</p>
          </div>
        </div>

        {/* About the Task Hive App */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            About Task Hive
          </h2>
          <p className="text-teal-800">
            Task Hive helps you manage your tasks efficiently and in style. Stay
            organized, prioritize your work, and keep track of your progress all
            in one place.
          </p>
        </div>
      </div>
    </Reveal>
  );
};

export default HeroSection;
