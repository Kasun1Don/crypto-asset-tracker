"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@acme/ui/pagination";

// props for CryptoList
interface PaginateListProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginateList = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginateListProps) => {
  return (
    <div className="mt-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                onPageChange(currentPage > 1 ? currentPage - 1 : 1)
              }
              className="cursor-pointer"
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              onClick={() => onPageChange(1)}
              isActive={currentPage === 1}
              className="cursor-pointer"
            >
              1
            </PaginationLink>
          </PaginationItem>

          {currentPage > 2 && <PaginationEllipsis />}

          {currentPage > 1 && currentPage < totalPages && (
            <PaginationItem>
              <PaginationLink
                onClick={() => onPageChange(currentPage)}
                isActive={true}
                className="cursor-pointer"
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>
          )}

          {currentPage < totalPages - 1 && <PaginationEllipsis />}

          {totalPages > 1 && (
            <PaginationItem>
              <PaginationLink
                onClick={() => onPageChange(totalPages)}
                isActive={currentPage === totalPages}
                className="cursor-pointer"
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                onPageChange(
                  currentPage < totalPages ? currentPage + 1 : totalPages,
                )
              }
              className="cursor-pointer"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginateList;
