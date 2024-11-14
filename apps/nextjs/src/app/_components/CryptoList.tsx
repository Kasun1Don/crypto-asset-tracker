"use client";

import React, { useState } from "react";
import Image from "next/image";

import { api } from "~/trpc/react";
import CryptoTableRow from "./CryptoTableRow";
import PaginateList from "./PaginateList";
import TableSkeleton from "./TableSkeleton";

const CryptoList = ({
  searchQuery,
  initialPage = 1,
}: {
  searchQuery?: string;
  initialPage?: number;
}) => {
  const [page, setPage] = useState(initialPage);
  const [sortField, setSortField] = useState("cmc_rank");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const {
    data: listings,
    isLoading,
    error,
  } = api.listings.getListings.useQuery();

  // if is loading, show skeleton
  if (isLoading) {
    return <TableSkeleton />;
  }
  // if API call errors, show message
  if (error) {
    return (
      <div className="container mx-auto p-4">
        Failed to load crypto data: {error.message}
      </div>
    );
  }

  const sortedListings = listings
    ? [...listings].sort((a, b) => {
        const multiplier = sortDir === "asc" ? 1 : -1;
        const valueA = a[sortField as keyof typeof a] ?? 0;
        const valueB = b[sortField as keyof typeof b] ?? 0;

        return multiplier * (valueA > valueB ? 1 : valueA < valueB ? -1 : 0);
      })
    : [];

  // filter listings based on search query (crypto name or symbol)
  const filteredListings = searchQuery
    ? sortedListings.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : sortedListings;

  // sort columns data
  const handleSort = (field: string) => {
    if (field === sortField) {
      // if current sort direction is ascending set to descending
      setSortDir((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  // calculate total pages and paginated listings
  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedListings = filteredListings.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="container mx-auto px-1 py-4 sm:p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th
                className="sm:min-w-25 min-w-18 cursor-pointer text-left"
                onClick={() => handleSort("cmc_rank")}
              >
                <div className="flex items-center gap-2">
                  {sortField === "cmc_rank" && (
                    <Image
                      src="/purplet.svg"
                      width={10}
                      height={10}
                      alt="sort"
                      // if sort direction is descending, rotate 180 degrees
                      className={`${sortDir === "asc" ? "rotate-180" : ""}`}
                    />
                  )}
                  <span className="hidden md:inline"># Rank</span>
                  <span className="md:hidden">#</span>
                </div>
              </th>
              <th
                className="cursor-pointer p-2 text-center sm:text-left"
                onClick={() => handleSort("name")}
              >
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  {sortField === "name" && (
                    <Image
                      src="/purplet.svg"
                      width={10}
                      height={10}
                      alt="sort"
                      className={`${sortDir === "asc" ? "rotate-180" : ""}`}
                    />
                  )}
                  Name
                </div>
              </th>
              <th
                className="cursor-pointer text-center sm:p-2 sm:text-right"
                onClick={() => handleSort("price")}
              >
                <div className="flex items-center justify-center gap-2 sm:justify-end">
                  {sortField === "price" && (
                    <Image
                      src="/purplet.svg"
                      width={10}
                      height={10}
                      alt="sort"
                      className={`${sortDir === "asc" ? "rotate-180" : ""}`}
                    />
                  )}
                  Price
                </div>
              </th>
              <th
                className="hidden max-w-40 cursor-pointer p-2 text-right sm:table-cell"
                onClick={() => handleSort("volume_24h")}
              >
                <div className="flex items-center justify-end gap-2">
                  {sortField === "volume_24h" && (
                    <Image
                      src="/purplet.svg"
                      width={10}
                      height={10}
                      alt="sort"
                      className={`${sortDir === "asc" ? "rotate-180" : ""}`}
                    />
                  )}
                  Volume(24h)
                </div>
              </th>
              <th
                className="hidden cursor-pointer p-2 text-right sm:table-cell"
                onClick={() => handleSort("market_cap")}
              >
                <div className="flex items-center justify-end gap-2">
                  {sortField === "market_cap" && (
                    <Image
                      src="/purplet.svg"
                      width={10}
                      height={10}
                      alt="sort"
                      className={`${sortDir === "asc" ? "rotate-180" : ""}`}
                    />
                  )}
                  Market Cap
                </div>
              </th>
              <th
                className="cursor-pointer pl-1 text-center sm:p-2 sm:text-right"
                onClick={() => handleSort("percent_change_24h")}
              >
                <div className="flex items-center justify-center gap-2 sm:justify-end">
                  {sortField === "percent_change_24h" && (
                    <Image
                      src="/purplet.svg"
                      width={10}
                      height={10}
                      alt="sort"
                      className={`${sortDir === "asc" ? "rotate-180" : ""}`}
                    />
                  )}
                  <span className="hidden sm:inline">24h % Change</span>
                  <span className="sm:hidden">24h %</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedListings.map((crypto) => (
              <CryptoTableRow key={crypto.symbol} crypto={crypto} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-4 mt-6">
        <PaginateList
          // props passed down to PaginateList
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default CryptoList;
