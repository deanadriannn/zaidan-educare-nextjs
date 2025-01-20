"use client"

import { ColumnDef } from "@tanstack/react-table"
import { StatusPembayaranColumns } from "@/types/data"
import { formatToIDR } from "@/lib/utils"

export const columns: ColumnDef<StatusPembayaranColumns>[] = [
  {
    accessorKey: "nis",
    header: () => (
      <div className="pl-4">
        <p>NIS</p>
      </div>
    ),
    cell: ({ row }) => (
      <div className="pl-4">
        <p>{row.original.nis}</p>
      </div>
    ),
    size: 200
  },
  {
    accessorKey: "namaSiswa",
    header: "Nama Siswa",
    size: 200,
  },
  {
    accessorKey: "kelas",
    header: "Kelas",
    size: 200
  },
  {
    accessorKey: "jenisPembayaran",
    header: "Jenis Pembayaran",
    size: 200
  },
  {
    accessorKey: "nominalTagihan",
    header: "Nominal Tagihan",
    cell: ({ row }) => {
      const nominalTagihan = parseFloat(row.getValue("nominalTagihan"))
      const formatted = formatToIDR(nominalTagihan)
 
      return <div className="font-medium">{formatted}</div>
    },
    size: 200
  },
  {
    accessorKey: "statusPembayaran",
    header: "Status Pembayaran",
    size: 200
  },
  {
    accessorKey: "nominalSudahDibayar",
    header: "Nominal Sudah Dibayar",
    cell: ({ row }) => {
      const nominalSudahDibayar = parseFloat(row.getValue("nominalSudahDibayar"))
      const formatted = formatToIDR(nominalSudahDibayar)
 
      return <div className="font-medium">{formatted}</div>
    },
    size: 200
  },
  {
    accessorKey: "sisaTagihan",
    header: "Sisa Tagihan",
    cell: ({ row }) => {
      const sisaTagihan = parseFloat(row.getValue("sisaTagihan"))
      const formatted = formatToIDR(sisaTagihan)
 
      return <div className="font-medium">{formatted}</div>
    },
    size: 200
  },
]