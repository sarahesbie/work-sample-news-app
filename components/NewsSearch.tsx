"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import NewsResults from "./NewsResults";

export default function NewsSearch() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <SearchBar onSearch={setQuery} />
      {query ? (
        <NewsResults query={query} />
      ) : (
        <p className="text-gray-500 text-center mt-4">
          Type a keyword to search for news
        </p>
      )}
    </div>
  );
}
