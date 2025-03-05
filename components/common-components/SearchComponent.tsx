"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface SearchComponentProps<T> {
  data: T[];
  value: keyof T;
  onFilter: (filteredData: T[]) => void;
}

const SearchComponent = <T,>({ data, value, onFilter }: SearchComponentProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = data.filter((item) =>
      String(item[value]).toLowerCase().includes(searchTerm.toLowerCase())
    );
    onFilter(filteredData);
  }, [searchTerm, data, value, onFilter]);

  return (
    <Input
      type="text"
      placeholder={`Search by ${String(value)}...`}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-2 border rounded-md"
    />
  );
};

export default SearchComponent;
