import React, { useState } from "react";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { RouteSearch } from "@/utils/router";

const Search = () => {

  const navigate = useNavigate();

  const [query, setQuery] = useState();
  const getInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(RouteSearch(query));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="q"
        onInput={getInput}
        placeholder="search..."
        className="h-9 rounded-full text-md bg-gray-50"
      />
    </form>
  );
};

export default Search;
