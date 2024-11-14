// This component renders the rows in the cryptocurrency table in CryptoList

import React from "react";
import Image from "next/image";

import { CryptoIcon } from "./Images";

// api data expected by this component
interface CryptoTableRowProps {
  crypto: {
    cmc_rank: number | undefined;
    name: string;
    symbol: string;
    price: number;
    volume_24h: number;
    market_cap: number;
    percent_change_24h: number;
  };
}

const CryptoTableRow = ({ crypto }: CryptoTableRowProps) => {
  return (
    <tr className="border-b hover:bg-gray-400">
      <td className="min-w-16 p-2">{crypto.cmc_rank}</td>
      <td className="max-w-10 p-2 sm:max-w-60">
        <div className="flex items-center gap-4">
          {/* pass symbol prop to CryptoIcon component */}
          <CryptoIcon symbol={crypto.symbol} />
          <div>
            <div className="font-medium">
              {/* on mobile show symbol, on desktop show name */}
              <span className="sm:hidden">{crypto.symbol}</span>
              <span className="hidden sm:inline">{crypto.name}</span>
            </div>
            <div className="text-sm text-gray-500">
              {/* on mobile hide symbol and show market cap */}
              <span className="sm:hidden">
                ${/* if market cap > $1T show in trillions else billions */}
                {crypto.market_cap >= 1000000000000
                  ? (crypto.market_cap / 1000000000000).toFixed(2) + " T"
                  : (crypto.market_cap / 1000000000).toFixed(2) + " B"}
              </span>
              <span className="hidden sm:inline">{crypto.symbol}</span>
            </div>
          </div>
        </div>
      </td>
      <td className="p-2 text-right">
        ${/* format price to 2 decimal places & add commas */}
        {crypto.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td className="hidden p-2 text-right sm:table-cell">
        $
        {crypto.volume_24h.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td className="hidden p-2 text-right sm:table-cell">
        $
        {crypto.market_cap.toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}
      </td>
      <td
        className={`p-2 text-right ${
          crypto.percent_change_24h >= 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        <div className="flex items-center justify-end gap-1">
          <Image
            // conditionally render up or down arrow svg based on 24h price change
            src={crypto.percent_change_24h >= 0 ? "/greentri.svg" : "/redt.svg"}
            alt={crypto.percent_change_24h >= 0 ? "up" : "down"}
            width={12}
            height={12}
            className="h-3 w-3"
          />
          {crypto.percent_change_24h.toFixed(2)}%
        </div>
      </td>
    </tr>
  );
};

export default CryptoTableRow;
