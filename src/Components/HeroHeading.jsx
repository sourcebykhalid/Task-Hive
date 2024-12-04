import React from "react";
import { Input, Select, Option } from "@material-tailwind/react";
import { FiSearch } from "react-icons/fi";
import { FcTodoList } from "react-icons/fc";
import Reveal from "./Reveal";

const Header = ({ onSearch, onGroupBy }) => {
  const handleGroupByChange = (value) => {
    if (onGroupBy) {
      onGroupBy(value);
    }
  };

  return (
    <Reveal>
      <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gradient-to-r from-black via-cyan-700 to-black shadow-lg rounded-lg gap-y-4">
        {/* Global Search */}

        {/* App Title */}
        <div className="flex items-center gap-x-3 px-6 py-2 bg-white shadow-md rounded-lg text-blue-800 font-bold text-2xl md:text-4xl">
          <span>Task Hive</span>
          <FcTodoList className="text-4xl md:text-5xl" />
        </div>
        <div className="flex items-center w-full md:w-1/3 gap-x-3">
          <FiSearch className="text-gray-100 text-2xl" />
          <Input
            placeholder="Search tasks..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full  rounded-lg border-2 border-blue-500  text-gray-50 text-xl"
          />
        </div>
        {/* Group By Dropdown */}
        <div className="w-full md:w-1/4">
          <Select
            variant="outlined"
            size="lg"
            label="Group By"
            onChange={handleGroupByChange}
            className=" rounded-lg "
          >
            <Option value="none">None</Option>
            <Option value="createdOn">Created On</Option>
            <Option value="pendingOn">Pending On</Option>
            <Option value="priority">Priority</Option>
          </Select>
        </div>
      </div>
    </Reveal>
  );
};

export default Header;
