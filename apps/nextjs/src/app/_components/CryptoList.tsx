"use client";

import React from "react";

import { api } from "~/trpc/react";

const CryptoList = () => {
  const { data: listings } = api.listings.getListings.useQuery();

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
          {listings?.map((crypto) => (
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
    </div>
  );
};

export default CryptoList;
