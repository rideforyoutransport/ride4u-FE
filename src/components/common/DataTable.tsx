import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { cn } from '../../utils/helpers';

interface Column<T> {
  key: keyof T | string;
  header: string | React.ReactNode;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
}

interface DataTableProps<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  onAdd?: () => void;
  onDelete?: (selectedIds: string[]) => void;
  addButtonText?: string;
  className?: string;
  selectable?: boolean;
  getItemId?: (item: T) => string;
  emptyMessage?: string;
  
  // Backend pagination props
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  pageSizeOptions?: number[];
}

export function DataTable<T extends Record<string, any>>({
  title,
  data,
  columns,
  loading = false,
  onAdd,
  onDelete,
  addButtonText = 'Add New',
  className,
  selectable = false,
  getItemId = (item) => item.id,
  emptyMessage,
  pagination,
  onPageChange,
  onLimitChange,
  pageSizeOptions = [10, 20, 50, 100],
}: DataTableProps<T>) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  // Use backend pagination if provided, otherwise fall back to frontend pagination
  const isBackendPagination = !!(pagination && onPageChange);
  
  // Frontend pagination (fallback)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  
  let paginatedData = data;
  let totalPages = 1;
  let startIndex = 0;
  let endIndex = data.length;
  let totalCount = data.length;
  let pageLimit = itemsPerPage;
  let activePage = currentPage;

  if (isBackendPagination && pagination) {
    // Backend pagination
    paginatedData = data; // Data is already paginated from backend
    totalPages = pagination.totalPages;
    startIndex = (pagination.currentPage - 1) * pagination.limit;
    endIndex = Math.min(startIndex + pagination.limit, pagination.totalCount);
    totalCount = pagination.totalCount;
    pageLimit = pagination.limit;
    activePage = pagination.currentPage;
  } else {
    // Frontend pagination
    startIndex = (currentPage - 1) * itemsPerPage;
    endIndex = startIndex + itemsPerPage;
    paginatedData = data.slice(startIndex, endIndex);
    totalPages = Math.ceil(data.length / itemsPerPage);
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(data.map(getItemId));
      setSelectedItems(allIds);
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedItems(newSelected);
  };

  const handlePageChange = (page: number) => {
    if (isBackendPagination && onPageChange) {
      onPageChange(page);
    } else {
      setCurrentPage(page);
    }
    setSelectedItems(new Set()); // Clear selections when changing page
  };

  const handleLimitChange = (newLimit: number) => {
    if (isBackendPagination && onLimitChange) {
      onLimitChange(newLimit);
    }
    setSelectedItems(new Set()); // Clear selections when changing limit
  };

  const enhancedColumns: Column<T>[] = selectable
    ? [
        {
          key: 'select',
          header: (
            <input
              type="checkbox"
              checked={selectedItems.size === data.length && data.length > 0}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
          ),
          render: (item) => (
            <input
              type="checkbox"
              checked={selectedItems.has(getItemId(item))}
              onChange={(e) => handleSelectItem(getItemId(item), e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
          ),
          className: 'w-12',
        },
        ...columns,
      ]
    : columns;

  if (loading) {
    return (
      <div className={cn('space-y-4', className)}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <div className="flex items-center space-x-2">
            {onAdd && (
              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={onAdd}
              >
                {addButtonText}
              </Button>
            )}
          </div>
        </div>

        {/* Loading State */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={cn('space-y-4', className)}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <div className="flex items-center space-x-2">
            {onAdd && (
              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={onAdd}
              >
                {addButtonText}
              </Button>
            )}
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="text-center py-12">
            <p className="text-gray-500">
              {emptyMessage || `No ${title.toLowerCase()} found`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <div className="flex items-center space-x-2">
          {selectedItems.size > 0 && onDelete && (
            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={() => {
                onDelete(Array.from(selectedItems));
                setSelectedItems(new Set());
              }}
            >
              Delete ({selectedItems.size})
            </Button>
          )}
          {onAdd && (
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={onAdd}
            >
              {addButtonText}
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {enhancedColumns.map((column, index) => (
                  <th
                    key={String(column.key) || index}
                    className={cn(
                      'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                      column.className
                    )}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((item, rowIndex) => (
                <tr key={getItemId(item) || rowIndex} className="hover:bg-gray-50">
                  {enhancedColumns.map((column, colIndex) => (
                    <td
                      key={String(column.key) || colIndex}
                      className={cn(
                        'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
                        column.className
                      )}
                    >
                      {column.render
                        ? column.render(item)
                        : String(item[column.key as keyof T] || '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {endIndex} of {totalCount} results
                </div>
                
                {/* Page size selector */}
                {isBackendPagination && onLimitChange && (
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-700">Show:</label>
                    <select
                      value={pageLimit}
                      onChange={(e) => handleLimitChange(Number(e.target.value))}
                      className="border-gray-300 rounded-md text-sm focus:ring-primary-500 focus:border-primary-500"
                    >
                      {pageSizeOptions.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={ChevronLeft}
                  onClick={() => handlePageChange(Math.max(1, activePage - 1))}
                  disabled={activePage === 1}
                >
                  Previous
                </Button>
                
                {/* Page numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (activePage <= 3) {
                      pageNum = i + 1;
                    } else if (activePage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = activePage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={cn(
                          'px-3 py-1 text-sm rounded-md',
                          pageNum === activePage
                            ? 'bg-primary-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        )}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  icon={ChevronRight}
                  onClick={() => handlePageChange(Math.min(totalPages, activePage + 1))}
                  disabled={activePage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}