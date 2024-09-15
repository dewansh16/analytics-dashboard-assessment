"use client";
import { FC, useEffect, useState } from "react";
import Papa from "papaparse";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const [evData, setEvData] = useState<Record<string, string>[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    [headers[0]]: true,
    [headers[1]]: true,
    [headers[2]]: true,
    [headers[3]]: true,
    [headers[4]]: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/Electric_Vehicle_Population_Data.csv");
      const csvData = await response.text();
      Papa.parse(csvData, {
        header: true,
        complete: (result: { data: Record<string, string>[] }) => {
          setEvData(result.data);
          const newHeaders = Object.keys(result.data[0] || {});
          setHeaders(newHeaders);
        },
      });
    };

    fetchData();
  }, []);

  const columns: ColumnDef<Record<string, string>>[] = headers.map(
    (header) => ({
      accessorKey: header,
      header: header,
      cell: ({ row }) => {
        const value = row.getValue(header) as string;
        console.log(value);
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="max-w-[100%] truncate">
                {value}
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    })
  );

  const table = useReactTable({
    data: evData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnVisibility },
  });

  return (
    <div className="flex justify-center items-center overflow-auto p-10">
      <div className="w-full">
        <div className="flex items-center py-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Edit Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-40 overflow-auto">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column, idx) => {
                  return (
                    <div key={idx}>
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={column.getIsVisible()}
                        className=""
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }>
                        {column.id}
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                    </div>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="min-w-fit">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={headers.length}
                    className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
