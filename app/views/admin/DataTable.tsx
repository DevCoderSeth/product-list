"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Pencil,
  Trash,
  Eye,
} from "lucide-react";

import { useState, useRef, useEffect } from "react";
import { Button } from "../components/button";
import { DeleteDialog } from "./DeleteDialog";
import { useRouter } from "next/navigation";

type DataTableProps<TData extends { id: string | number }, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  hiddenColumns?: string[];
  addButtonLabel?: string;
  addButtonHref?: string;
  showActions?: boolean;
  showView?: boolean;
  showSearch?: boolean;
  showPagination?: boolean;
  editButtonLabel?: string;
  showDelete?: boolean;
  getViewUrl?: (row: TData) => string;
  onAddClick?: () => void;
  onDelete?: (id: number | string) => Promise<void>;
  onEdit?: (id: number | string) => void;
  loading?: boolean;
  columnCount?: number;
  skeletonRows?: number;
  renderDeleteDialog?: (row: TData) => {
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
  };
  isExpanded?: boolean; // Add prop for sidebar state
  navLocation?: "top" | "side"; // Add prop for nav location
};

export function DataTable<TData extends { id: string | number }, TValue>({
  columns,
  data,
  hiddenColumns = [],
  addButtonLabel,
  onAddClick,
  showActions = true,
  showSearch = true,
  showPagination = true,
  editButtonLabel,
  showView = false,
  showDelete = true,
  getViewUrl,
  onDelete,
  onEdit,
  loading,
  columnCount,
  skeletonRows,
  renderDeleteDialog,
  isExpanded = true, // Default to expanded
  navLocation = "side", // Default to side nav
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [hasOverflowRight, setHasOverflowRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;

      setHasScrolled(scrollLeft > 0);

      const scrolledToEnd =
        Math.abs(scrollLeft + clientWidth - scrollWidth) <= 2;
      setHasOverflowRight(!scrolledToEnd && scrollWidth > clientWidth);
    };

    const timeoutId = setTimeout(handleScroll, 0);

    const handleResize = () => {
      setTimeout(handleScroll, 10);
    };

    window.addEventListener("resize", handleResize);
    container.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timeoutId);
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [data, columns]);

  const handleDelete = async () => {
    if (!deletingId || !onDelete) return;
    try {
      await onDelete(deletingId);
      setDeletingId(null);
    } catch (error) {
      console.error("Delete failed:", error);
      setDeletingId(null);
    }
  };

  const actionsColumn: ColumnDef<TData, undefined> = {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const rowData = row.original;
      return (
        <div className="flex items-center gap-2">
          {showView && getViewUrl && (
            <Button
              variant="ghost"
              size="icon"
              className="p-2 rounded-md bg-secondary hover:cursor-pointer"
              onClick={() => router.push(getViewUrl(rowData))}
            >
              <Eye className="w-4 h-4" />
            </Button>
          )}

          <Button
            variant="ghost"
            size={editButtonLabel ? "sm" : "icon"}
            className={
              editButtonLabel
                ? "rounded-md hover:cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1"
                : "p-2 rounded-md bg-secondary "
            }
            onClick={() => onEdit?.(rowData.id)}
          >
            {editButtonLabel ? (
              <span className="text-sm font-medium">{editButtonLabel}</span>
            ) : (
              <Pencil className="w-4 h-4" />
            )}
          </Button>

          {showDelete && (
            <DeleteDialog
              open={deletingId === rowData.id}
              onOpenChange={(open) =>
                open ? setDeletingId(rowData.id) : setDeletingId(null)
              }
              onConfirm={handleDelete}
              trigger={
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-2 rounded-md bg-secondary"
                >
                  <Trash className="w-4 h-4 text-red-600" />
                </Button>
              }
              {...(renderDeleteDialog ? renderDeleteDialog(rowData) : {})}
            />
          )}
        </div>
      );
    },
  };

  const finalColumns = showActions ? [...columns, actionsColumn] : columns;
  const skeletonColumnCount =
    columnCount ?? columns.length + (showActions ? 1 : 0);

  const table = useReactTable({
    data,
    columns: finalColumns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "auto",
    initialState: {
      pagination: {
        pageSize: 9,
      },
    },
  });
  const skeletonRowCount = skeletonRows ?? table.getState().pagination.pageSize;

  return (
    <div
      className={`mx-auto space-y-4 transition-all duration-300
        ${
          isExpanded
            ? "md:max-w-[calc(100vw-1rem)]"
            : "md:max-w-[calc(100vw-4rem)]"
        }
        ${navLocation === "top" ? "lg:max-w-full" : ""}`}
    >
      {/* Filter and Add Button */}
      {showSearch && (
        <div className="flex items-center justify-between gap-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm w-full focus:outline-none focus:ring focus:ring-primary"
            />
          </div>

          {addButtonLabel && (
            <Button
              onClick={onAddClick}
              className="btn-primary flex items-center gap-2 hover:cursor-pointer"
            >
              {addButtonLabel}
              <Plus className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}

      {/* Table Container */}
      <div className="w-full overflow-hidden border border-gray-300 rounded-md bg-secondary/10">
        <div ref={scrollRef} className="overflow-x-auto">
          <table className="table-auto border-collapse w-full">
            <thead className="rounded-md bg-secondary">
              {loading ? (
                <tr>
                  {Array.from({ length: skeletonColumnCount }).map(
                    (_, colIndex) => (
                      <th
                        key={colIndex}
                        className={`py-3 px-4 text-left text-sm font-medium text-muted-foreground whitespace-nowrap
                          ${
                            colIndex === 0
                              ? "sticky left-0 bg-secondary z-10"
                              : ""
                          }
                          ${
                            colIndex === skeletonColumnCount - 1 && showActions
                              ? "md:sticky md:right-0 z-10"
                              : ""
                          }
                        `}
                      >
                        <span className="block w-24 h-6 bg-accent-1/10 rounded animate-pulse"></span>
                      </th>
                    )
                  )}
                </tr>
              ) : (
                table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header, i) => {
                      const colId = String(header.column.id);
                      const isUserHidden = hiddenColumns.includes(colId);
                      const isFirst = i === 0;

                      return (
                        <th
                          key={header.id}
                          className={`py-3 px-4 text-left text-sm font-medium text-muted-foreground whitespace-nowrap
                            ${isUserHidden ? "hidden md:table-cell" : ""}
                            ${
                              isFirst
                                ? `sticky left-0 bg-secondary z-10 transition-shadow ${
                                    hasScrolled
                                      ? "shadow-[inset_-4px_0_6px_-4px_rgba(0,0,0,0.15)]"
                                      : ""
                                  }`
                                : ""
                            }
                            ${
                              colId === "actions"
                                ? `md:sticky md:right-0 bg-secondary z-10 transition-shadow ${
                                    hasOverflowRight
                                      ? "md:shadow-[inset_4px_0_6px_-4px_rgba(0,0,0,0.15)]"
                                      : ""
                                  }`
                                : ""
                            }
                          `}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      );
                    })}
                  </tr>
                ))
              )}
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: skeletonRowCount }).map(
                    (_, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="border-b border-gray-300 last:border-none animate-pulse"
                      >
                        {Array.from({ length: skeletonColumnCount }).map(
                          (_, colIndex) => (
                            <td
                              key={colIndex}
                              className={`px-4 py-3 h-10 rounded
                              ${
                                colIndex === 0
                                  ? "sticky left-0 bg-secondary z-10"
                                  : ""
                              }
                              ${
                                colIndex === skeletonColumnCount - 1 &&
                                showActions
                                  ? "md:sticky md:right-0 z-10"
                                  : ""
                              }
                            `}
                            >
                              <span className="block w-full h-6 bg-accent-1/10 rounded"></span>
                            </td>
                          )
                        )}
                      </tr>
                    )
                  )
                : table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-gray-300 last:border-none hover:bg-muted/20"
                    >
                      {row.getVisibleCells().map((cell, i) => {
                        const colId = String(cell.column.id);
                        const isUserHidden = hiddenColumns.includes(colId);
                        const isFirst = i === 0;

                        return (
                          <td
                            key={cell.id}
                            className={`px-4 py-2 text-sm whitespace-nowrap
                              ${isUserHidden ? "hidden md:table-cell" : ""}
                              ${
                                isFirst
                                  ? `sticky left-0 bg-secondary z-10 transition-shadow ${
                                      hasScrolled
                                        ? "shadow-[inset_-4px_0_6px_-4px_rgba(0,0,0,0.15)]"
                                        : ""
                                    }`
                                  : ""
                              }
                              ${
                                colId === "actions"
                                  ? `md:sticky md:right-0 bg-secondary z-10 transition-shadow ${
                                      hasOverflowRight
                                        ? "md:shadow-[inset_4px_0_6px_-4px_rgba(0,0,0,0.15)]"
                                        : ""
                                    }`
                                  : ""
                              }
                            `}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="flex items-center gap-1 p-2 border rounded-md text-sm transition hover:cursor-pointer hover:bg-muted disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex items-center gap-1 p-2 border rounded-md text-sm transition hover:cursor-pointer hover:bg-muted disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
