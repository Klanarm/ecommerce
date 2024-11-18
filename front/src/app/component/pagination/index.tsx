"use client";
import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  goToPage,
  goToNextPage,
  goToPreviousPage,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(
      1,
      Math.min(
        currentPage - Math.floor(maxVisiblePages / 2),
        totalPages - maxVisiblePages + 1
      )
    );
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => goToPage(1)}
          className={`px-2 py-1 mx-1 rounded ${
            currentPage === 1 ? "bg-gray-700 text-white" : "text-gray-600"
          }`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="start-ellipsis">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-2 py-1 mx-1 rounded ${
            currentPage === i
              ? "bg-gray-700 text-white border border-black"
              : "text-gray-600"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="end-ellipsis">...</span>);
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className={`px-2 py-1 mx-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-700 text-white"
              : "text-gray-600"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="px-2 py-1 text-gray-600 rounded disabled:opacity-50"
      >
        &lt;
      </button>

      {renderPageNumbers()}

      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="px-2 py-1 text-gray-600 rounded disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
