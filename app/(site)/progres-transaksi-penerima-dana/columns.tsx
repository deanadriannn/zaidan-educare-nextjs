"use client"

import { ColumnDef } from "@tanstack/react-table"
import { formatToIDR } from "@/lib/utils"

type ProgresTransaksiPenerimaDanaColumns = {
  jenisPembayaran: string,
  totalNominalTagihan: number,
  totalNominalTerbayar: number,
  totalSisaTagihan: number
}

export const columns: ColumnDef<ProgresTransaksiPenerimaDanaColumns>[] = [
  {
    accessorKey: "jenisPembayaran",
    header: () => (
      <div className="text-center">
        <p>Jenis Pembayaran</p>
      </div>
    ),
  },
  {
    accessorKey: "totalNominalTagihan",
    header: () => (
      <div className="text-center">
        <p>Total Nominal Tagihan</p>
      </div>
    ),
    cell: ({ row }) => {
      const nominal = parseFloat(row.getValue("totalNominalTagihan"))
      const formatted = formatToIDR(nominal)
 
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "totalNominalTerbayar",
    header: () => (
      <div className="text-center">
        <p>Total Nominal Terbayar</p>
      </div>
    ),
    cell: ({ row }) => {
      const nominal = parseFloat(row.getValue("totalNominalTerbayar"))
      const formatted = formatToIDR(nominal)
 
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "totalSisaTagihan",
    header: () => (
      <div className="text-center">
        <p>Total Sisa Tagihan</p>
      </div>
    ),
    cell: ({ row }) => {
      const nominal = parseFloat(row.getValue("totalSisaTagihan"))
      const formatted = formatToIDR(nominal)
 
      return <div className="font-medium">{formatted}</div>
    },
  },
]