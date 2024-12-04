import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["All Tasks", "Completed", "Pending"];

  return (
    <div className="flex border-b-2 border-neutral-400 cursor-pointer">
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
  );
};

export default Tabs;
