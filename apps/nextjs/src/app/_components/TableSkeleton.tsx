// this component is the loading state skeleton for the crypto table
import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@acme/ui/pagination";
import { Skeleton } from "@acme/ui/skeleton";

const TableSkeleton = () => {
  return (
    <div className="container mx-auto px-1 py-4 sm:p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="sm:min-w-25 min-w-18 text-left"># Rank</th>
              <th className="p-2 text-left">Name</th>
              <th className="text-right sm:p-2">Price</th>
              <th className="hidden max-w-40 p-2 text-right sm:table-cell">
                Volume(24h)
              </th>
              <th className="hidden p-2 text-right sm:table-cell">
                Market Cap
              </th>
              <th className="pl-1 text-right sm:p-2">
                <span className="hidden sm:inline">24h % Change</span>
                <span className="sm:hidden">24h %</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 20 }).map((_, index) => (
              <tr key={index} className="border-b">
                <td className="min-w-16 p-2">
                  <Skeleton className="h-4 w-8" />
                </td>
                <td className="max-w-32 p-2 sm:max-w-60">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="mt-1 h-3 w-16 text-gray-500" />
                    </div>
                  </div>
                </td>
                <td className="p-2 text-right">
                  <Skeleton className="ml-auto h-4 w-24" />
                </td>
                <td className="hidden p-2 text-right sm:table-cell">
                  <Skeleton className="ml-auto h-4 w-32" />
                </td>
                <td className="hidden p-2 text-right sm:table-cell">
                  <Skeleton className="ml-auto h-4 w-32" />
                </td>
                <td className="p-2 text-right">
                  <Skeleton className="ml-auto h-4 w-16" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious className="cursor-not-allowed opacity-50" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext className="cursor-not-allowed opacity-50" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default TableSkeleton;
