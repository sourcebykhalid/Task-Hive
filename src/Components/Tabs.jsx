import React from "react";
import { Select, Option } from "@material-tailwind/react";

const Tabs = ({ activeTab, setActiveTab, onSort }) => {
  const tabs = ["All Tasks", "Completed", "Pending"];
  const sortOptions = [
    { label: "None", value: "none" },
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
    { label: "Priority", value: "priority" },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-y-2 mt-1">
      <div className="flex  cursor-pointer w-full md:w-3/4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`md:px-6 px-3 py-2 ${
              activeTab === tab
                ? "border-b-4 border-blue-500 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
            aria-label={`Switch to ${tab} tab`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="relative right-2 w-full px-3 md:w-1/4">
        <Select
          variant="outlined"
          label="Sort By"
          className="rounded-lg"
          onChange={onSort}
          aria-label="Sort tasks"
        >
          {sortOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default Tabs;
