"use client";

import React, { useState } from "react";

import { api } from "~/trpc/react";
import CryptoTableRow from "./CryptoTableRow";
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
            <th className="hidden text-right sm:table-cell">Market Cap</th>
            <th className="hidden text-right sm:table-cell">24h Volume</th>
            <th className="text-right">24h Change</th>
          </tr>
        </thead>
        <tbody>
          {paginatedListings?.map((crypto) => (
            <CryptoTableRow key={crypto.symbol} crypto={crypto} />
          ))}
        </tbody>
        <thead />
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
