"use client"

import { ColumnDef } from "@tanstack/react-table"
import { formatToIDR } from "@/lib/utils"

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "jenisPembayaran",
    header: () => (
      <div className="text-center">
        <p>Jenis Pembayaran</p>
      </div>
    ),
    cell: ({ row }) => (
      <div className="pl-4">
        <p>{row.original.jenisPembayaran}</p>
      </div>
    ),
    size: 200
  },
  {
    accessorKey: "uangTunai",
    header: () => (
      <div className="text-center">
        <p>Uang Tunai</p>
      </div>
    ),
    cell: ({ row }) => {
      const uangTunai = parseFloat(row.getValue("uangTunai"))
      const formatted = formatToIDR(uangTunai)
 
      return <div className="font-medium">{formatted}</div>
    },
    size: 200
  },
  {
    accessorKey: "bsi",
    header: () => (
      <div className="text-center">
        <p>BSI</p>
      </div>
    ),
    cell: ({ row }) => {
      const bsi = parseFloat(row.getValue("bsi"))
      const formatted = formatToIDR(bsi)
 
      return <div className="font-medium">{formatted}</div>
    },
    size: 200
  },
  {
    accessorKey: "bankMandiri",
    header: () => (
      <div className="text-center">
        <p>Bank Mandiri</p>
      </div>
    ),
    cell: ({ row }) => {
      const bankMandiri = parseFloat(row.getValue("bankMandiri"))
      const formatted = formatToIDR(bankMandiri)
 
      return <div className="font-medium">{formatted}</div>
    },
    size: 200
  },
  {
    accessorKey: "bjb",
    header: () => (
      <div className="text-center">
        <p>BJB</p>
      </div>
    ),
    cell: ({ row }) => {
      const bjb = parseFloat(row.getValue("bjb"))
      const formatted = formatToIDR(bjb)
 
      return <div className="font-medium">{formatted}</div>
    },
    size: 200
  },
]