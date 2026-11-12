import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import { setPageSize } from "../../../../store/slice/taskSlice";

interface TaskListPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  // pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export const TaskListPagination: React.FC<TaskListPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  // pageSize,
  onPageChange,
  // onPageSizeChange,
}) => {
  
  const {pageSize} = useSelector((state: RootState)=> state.task);
  const dispatch = useDispatch();
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-t border-(--primary-border) text-xs text-(--secondary-text)">
      <div className="flex items-center gap-2">
        <span className="text-[11px]">Total: {totalItems}</span>
        {/* {onPageSizeChange && ( */}
          <select
            value={pageSize}
            onChange={(e) => dispatch(setPageSize(Number(e.target.value)))}
            className="px-1.5 py-0.5 text-[11px] border border-(--primary-border) rounded bg-transparent text-(--primary-text) cursor-pointer"
          >
            {[5, 10, 20, 50].map((sz) => (
              <option key={sz} value={sz} className="bg-(--primary-bg) text-(--primary-text)">
                {sz} / page
              </option>
            ))}
          </select>
        {/* )} */}
      </div>

      <div className="flex items-center gap-1">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-2 py-1 rounded-md border border-(--primary-border) text-(--primary-text) disabled:opacity-40 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
        >
          Prev
        </button>

        <div className="flex items-center gap-1 overflow-x-auto max-w-[120px] scrollbar-none">
          {pages.map((pg) => (
            <button
              key={pg}
              onClick={() => onPageChange(pg)}
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border cursor-pointer ${
                currentPage === pg
                  ? "bg-(--accent-bg) text-white border-(--primary-border)"
                  : "border-transparent text-(--secondary-text) hover:border-(--primary-border)"
              }`}
            >
              {pg}
            </button>
          ))}
        </div>

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-2 py-1 rounded-md border border-(--primary-border) text-(--primary-text) disabled:opacity-40 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskListPagination;
