import React from "react";
import { Input, Select, Option } from "@material-tailwind/react";
import { FiSearch } from "react-icons/fi";
import { Clipboard } from "lucide-react";

const Header = ({ onSearch, onGroupBy }) => {
  const handleGroupByChange = (value) => {
    if (onGroupBy) {
      onGroupBy(value);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gradient-to-r from-black via-gray-900 to-gray-800 shadow-lg rounded-lg gap-y-4">
      {/* App Title */}

      <div className="relative flex items-center gap-x-4 px-8 py-5 bg-blue-gray-200 shadow-lg rounded-lg border border-gray-200 group hover:shadow-2xl transition-all duration-300">
        {/* Icon Container */}

        <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300 border-r-4 border-blue-gray-900">
          <Clipboard className="text-white text-5xl" /> {/*  Clipboard icon */}
        </div>

        {/* Text Content */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 border-b-4 rounded-md px-1 border-blue-gray-900 w-fit">
            Task Hive
          </h1>
          <p className="text-sm text-gray-900">
            Manage your tasks efficiently and in style.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-3 -right-3 w-10 h-10 bg-blue-500 rounded-full opacity-20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-indigo-500 rounded-full opacity-20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
      </div>

      <div className="flex items-center w-full md:w-1/3 gap-x-3">
        <FiSearch className="text-gray-100 text-2xl" />
        <Input
          placeholder="Search tasks..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full rounded-lg border-2 border-blue-500 text-gray-50 text-xl"
        />
      </div>

      {/* Group By Dropdown */}
      <div className="relative w-full md:w-1/4 mt-4 md:mt-0 z-10">
        <Select
          variant="outlined"
          size="lg"
          label="Group By"
          onChange={handleGroupByChange}
          className="rounded-lg text-gray-800"
          menuProps={{
            className: "z-50",
          }}
        >
          <Option value="none">None</Option>
          <Option value="createdOn">Created On</Option>
          <Option value="completed">Status</Option>
          <Option value="priority">Priority</Option>
        </Select>
      </div>
    </div>
  );
};

export default Header;
