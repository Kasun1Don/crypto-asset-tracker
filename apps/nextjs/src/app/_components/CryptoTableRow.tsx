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
      <td className="min-w-[3rem] p-2">{crypto.cmc_rank}</td>
      <td className="min-w-[9rem] p-2">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* pass symbol prop to CryptoIcon component */}
          <CryptoIcon symbol={crypto.symbol} />
          <div>
            <div className="break-words font-medium">
              {/* on mobile show symbol, on desktop show name */}
              <span className="sm:hidden">{crypto.symbol}</span>
              <span className="hidden sm:inline">{crypto.name}</span>
            </div>
            <div className="text-sm text-gray-500">
              {/* on mobile hide symbol and show market cap */}
              <span className="whitespace-nowrap sm:hidden">
                ${/* if market cap > $1T show in trillions else billions */}
                {crypto.market_cap >= 1000000000000
                  ? (crypto.market_cap / 1000000000000).toFixed(2) + " Tn"
                  : (crypto.market_cap / 1000000000).toFixed(2) + " Bn"}
              </span>
              <span className="hidden sm:inline">{crypto.symbol}</span>
            </div>
          </div>
        </div>
      </td>
      <td className="min-w-[6rem] whitespace-nowrap p-2 text-right">
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
      <td className={`p-2 text-right`}>
        <div className="flex items-center justify-end gap-1">
          <div
            className={`flex min-w-[5rem] max-w-[5rem] items-center justify-center gap-1 rounded-md px-1 py-1 text-sm sm:max-w-none ${
              crypto.percent_change_24h >= 0
                ? "bg-green-600/20 text-green-600"
                : "bg-red-600/20 text-red-600"
            }`}
          >
            <Image
              src={
                crypto.percent_change_24h >= 0 ? "/greentri.svg" : "/redt.svg"
              }
              alt={crypto.percent_change_24h >= 0 ? "up" : "down"}
              width={12}
              height={12}
              className="h-3 w-3"
            />
            <span className="truncate">
              {crypto.percent_change_24h.toFixed(2)}%
            </span>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default CryptoTableRow;
