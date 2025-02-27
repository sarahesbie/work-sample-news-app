"use client";

import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(input);
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [input, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search news..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
}
