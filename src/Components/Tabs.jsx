import React from "react";
import { Select, Option } from "@material-tailwind/react";

const Tabs = ({ activeTab, setActiveTab, onSort }) => {
  const tabs = ["All Tasks", "Completed", "Pending"];
  const sortOptions = [
    { label: "None", value: "none" },
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];

  const handleSortChange = (value) => {
    onSort(value); // Trigger the parent's sorting function
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-y-2">
      {/* Tabs Section */}
      <div className="flex  border-b-2 border-neutral-400 cursor-pointer w-full md:w-3/4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`md:px-6 px-3 py-2 cursor-pointer ${
              activeTab === tab
                ? "border-b-4 border-blue-500 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sort Dropdown Section */}
      <div className=" relative right-2 w-full px-3   md:w-1/4">
        <Select
          variant="outlined"
          label="Sort By"
          className="rounded-lg"
          onChange={handleSortChange} // Directly pass the selected value
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
