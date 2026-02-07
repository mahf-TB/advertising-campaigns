import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

type PaginationUnderlineProps = {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export const PaginationUnderline = ({
  page,
  total,
  limit,
  onPageChange,
  className,
}: PaginationUnderlineProps) => {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;
  const maxVisible = 5; // Nombre max de pages à afficher
  const sidePages = Math.floor(maxVisible / 2); // Pages de chaque côté

  const handleChange = (nextPage: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
    onPageChange(nextPage);
  };

  // Calcul des pages à afficher
  const getPagesToShow = () => {
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [1];
    let start = Math.max(2, page - sidePages);
    let end = Math.min(totalPages - 1, page + sidePages);

    if (start > 2) pages.push("ellipsis-start");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("ellipsis-end");
    pages.push(totalPages);

    return pages;
  };

  const pagesToShow = getPagesToShow();
  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem >
          <PaginationPrevious
            aria-disabled={isFirstPage ? true : undefined}
            className="rounded-none aria-disabled:pointer-events-none aria-disabled:opacity-50"
            onClick={handleChange(page - 1)}
          />
        </PaginationItem>

        {pagesToShow.map((p) => (
          <React.Fragment key={p}>
            {String(p).startsWith("ellipsis") ? (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem>
                <PaginationLink
                  isActive={p === page}
                  onClick={handleChange(p as number)}
                  className={
                    p === page
                      ? "border-primary! rounded-none border-0 border-b-2 bg-transparent! shadow-none!"
                      : "rounded-none"
                  }
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            )}
          </React.Fragment>
        ))}

        <PaginationItem >
          <PaginationNext
            aria-disabled={isLastPage ? true : undefined}
            className="rounded-none aria-disabled:pointer-events-none aria-disabled:opacity-50"
            onClick={handleChange(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
