"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { useDebouncedCallback } from "use-debounce";

import { Button } from "@acme/ui/button";
import { Input } from "@acme/ui/input";

const SearchInput = () => {
  const { resolvedTheme } = useTheme();
  const [_isTyping, setIsTyping] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [searchText, setSearchText] = useState("");

  // set dark theme magnifying glass as default
  let searchIcon = "/lightsearch.svg";
  // only change to light theme svg if resolvedTheme is explicitly "light"
  if (resolvedTheme === "light") {
    searchIcon = "/darksearch.svg";
  }

  // debounce search handler to prevent excessive URL updates and re-renders while typing
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    setIsTyping(value.trim() !== "");

    // If search value exists, add it to URL params
    // If empty, remove the query parameter entirely
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    // Update the URL without triggering a page reload
    // scroll: false prevents the page from jumping to top
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 100); // debounce delay of 100ms

  // clear search and reset URL params
  const handleClearSearch = () => {
    setSearchText("");
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative my-2 flex flex-1 items-center gap-2">
      <Image
        src={searchIcon}
        alt="search"
        width={16}
        height={16}
        className="text-gray-500"
      />
      <Input
        placeholder="Search by name or symbol"
        className="border-gray-500 pr-10"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      {/* conditional rendering of clear button when searchText exists */}
      {searchText && (
        <Button
          variant="ghost"
          onClick={handleClearSearch}
          aria-label="Clear search"
          size="icon"
          className="absolute right-2 h-7 text-gray-400"
        >
          X
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
