import "./Pagination.css";

interface PaginationProps {
  page: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  const hasPrevPage = page > 0;
  const hasNextPage = page < totalPages - 1;

  return (
    <div className="pagination">
      <div className="pagination__buttons">
        <button className="button" disabled={!hasPrevPage} onClick={() => onPageChange(page - 1)}>
          Previous
        </button>
        <button className="button" disabled={!hasNextPage} onClick={() => onPageChange(page + 1)}>
          Next
        </button>
      </div>
      <span className="pagination__count">Page {page + 1} / {Math.ceil(totalItems / pageSize)}</span>
    </div>
  );
}