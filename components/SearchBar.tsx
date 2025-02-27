"use client";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search news..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
