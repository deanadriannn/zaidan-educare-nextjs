"use client"

import React, { CSSProperties, useState } from 'react'
import '../site.css'
import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table'
import { Button } from "@/components/ui/button"
import { JenisBiayaPendidikan } from "@/types/data"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const getCommonPinningStyles = (column: Column<JenisBiayaPendidikan>): CSSProperties => {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right')

  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 4px -4px gray inset'
      : isFirstRightPinnedColumn
        ? '4px 0 4px -4px gray inset'
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnPinning, setColumnPinning] = useState({
    left: [],
    right: ["aksi"] as string[],
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    columnResizeMode: 'onChange',
    state: {
      columnPinning,
    },
    getPaginationRowModel: getPaginationRowModel(),
  })

  const pageIndex = table.getState().pagination.pageIndex   // Halaman ke- (0-based)
  const pageSize = table.getState().pagination.pageSize     // Jumlah baris per halaman

  // Indeks baris pertama (1-based)
  const firstRowIndex = pageIndex * pageSize + 1
  // Banyaknya baris di halaman aktif
  const currentPageRows = table.getPaginationRowModel().rows.length
  // Indeks baris terakhir (1-based)
  const lastRowIndex = firstRowIndex + currentPageRows - 1

  // Total baris setelah filter/sort (sebelum pagination)
  const totalRows = table.getPrePaginationRowModel().rows.length

  return (
    <div className="p-2">
      <div className="table-container">
        <table
          // style={{
          //   width: table.getTotalSize(),
          // }}
          className='w-full'
        >
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  const { column } = header

                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      // @ts-ignore
                      style={{ ...getCommonPinningStyles(column) }}
                    >
                      <div className="whitespace-nowrap">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}{' '}
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  const { column } = cell
                  return (
                    <td
                      key={cell.id}
                      // @ts-ignore
                      style={{ ...getCommonPinningStyles(column) }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4'>
        <span className='font-semibold text-[#5E5E5E]'>
          Menampilkan {firstRowIndex}–{lastRowIndex} dari {totalRows} data
        </span>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="hover:bg-transparent text-[#ea3323] hover:text-[#ea3423d7] disabled:text-muted-foreground"
        >
          <ChevronLeft />
        </Button>
        <div className='bg-[#ea3323] w-8 h-8 rounded-lg flex justify-center items-center'>
          <span className='text-white'>
            {pageIndex + 1}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="hover:bg-transparent text-[#ea3323] hover:text-[#ea3423d7] disabled:text-muted-foreground"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}