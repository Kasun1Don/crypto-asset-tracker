"use client";

import React, { useState } from "react";

import { api } from "~/trpc/react";
import PaginateList from "./PaginateList";

const CryptoList = () => {
  const { data: listings } = api.listings.getListings.useQuery();

  const [page, setPage] = useState(1);

  // calculate total pages and paginated listings
  const itemsPerPage = 25;
  const totalPages = listings ? Math.ceil(listings.length / itemsPerPage) : 0;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedListings = listings?.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="container mx-auto p-4">
      {/* table to display the listings */}
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left">Rank</th>
            <th className="text-left">Name</th>
            <th className="text-right">Price</th>
            <th className="text-right">24h Change</th>
          </tr>
        </thead>
        <tbody>
          {paginatedListings?.map((crypto) => (
            <tr key={crypto.symbol}>
              <td>{crypto.cmc_rank}</td>
              <td>{crypto.name}</td>
              <td className="text-right">${crypto.price.toFixed(2)}</td>
              <td className="text-right">
                {crypto.percent_change_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginateList
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default CryptoList;
