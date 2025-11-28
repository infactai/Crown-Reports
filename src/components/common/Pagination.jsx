import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 10,
  totalItems = 0,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-6">
      {/* Items info */}
      <div className="text-sm text-gray-600 font-medium">
        Showing <span className="font-bold text-gray-900">{startItem}</span> to{" "}
        <span className="font-bold text-gray-900">{endItem}</span> of{" "}
        <span className="font-bold text-gray-900">{totalItems}</span> items
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="
            flex items-center gap-1 px-3 py-2 
            rounded-lg font-medium text-sm
            bg-white border border-gray-200
            text-gray-700
            hover:bg-gray-50 hover:border-gray-300
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
            hover:scale-105 active:scale-95
            cursor-pointer
          "
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-400"
              >
                ...
              </span>
            ) : (
              <button
                type="button"
                key={page}
                onClick={() => onPageChange(page)}
                className={`
                  min-w-[40px] h-10 px-3 rounded-lg font-semibold text-sm
                  transition-all duration-300
                  cursor-pointer
                  ${
                    currentPage === page
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-500/30 scale-110"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:scale-105"
                  }
                  active:scale-95
                `}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Next button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="
            flex items-center gap-1 px-3 py-2 
            rounded-lg font-medium text-sm
            bg-white border border-gray-200
            text-gray-700
            hover:bg-gray-50 hover:border-gray-300
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
            hover:scale-105 active:scale-95
            cursor-pointer
          "
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
