interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg ${
          currentPage === 1
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        } text-white transition-colors`}
      >
        이전
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === page
              ? "bg-indigo-600"
              : "bg-gray-700 hover:bg-gray-600"
          } text-white transition-colors`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg ${
          currentPage === totalPages
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        } text-white transition-colors`}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
