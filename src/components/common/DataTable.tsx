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
}: DataTableProps<T>) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

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
              <div className="flex items-center text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} results
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={ChevronLeft}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  icon={ChevronRight}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
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