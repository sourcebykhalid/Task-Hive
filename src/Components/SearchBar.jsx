import React from "react";
import { Input } from "@material-tailwind/react";

export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <Input
      type="text"
      placeholder="Search tasks..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border mb-4"
    />
  );
};
