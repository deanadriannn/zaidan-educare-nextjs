"use client"

import { ColumnDef } from "@tanstack/react-table"
import { StatusPembayaranColumns } from "@/types/data"
import { formatToIDR } from "@/lib/utils"

export const columns: ColumnDef<StatusPembayaranColumns>[] = [
  {
    accessorKey: "nis",
    header: () => (
      <div className="text-center">
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
    header: () => (
      <div className="text-center">
        <p>Nama Siswa</p>
      </div>
    ),
    size: 200,
  },
  {
    accessorKey: "kelas",
    header: () => (
      <div className="text-center">
        <p>Kelas</p>
      </div>
    ),
    size: 200
  },
  {
    accessorKey: "jenisPembayaran",
    header: () => (
      <div className="text-center">
        <p>Jenis Pembayaran</p>
      </div>
    ),
    size: 200
  },
  {
    accessorKey: "nominalTagihan",
    header: () => (
      <div className="text-center">
        <p>Nominal Tagihan</p>
      </div>
    ),
    cell: ({ row }) => {
      const nominalTagihan = parseFloat(row.getValue("nominalTagihan"))
      const formatted = formatToIDR(nominalTagihan)
 
      return <div className="font-medium">{formatted}</div>
    },
    size: 200
  },
  {
    accessorKey: "statusPembayaran",
    header: () => (
      <div className="text-center">
        <p>Status Pembayaran</p>
      </div>
    ),
    size: 200
  },
  {
    accessorKey: "nominalSudahDibayar",
    header: () => (
      <div className="text-center">
        <p>Nominal Sudah Dibayar</p>
      </div>
    ),
    cell: ({ row }) => {
      const nominalSudahDibayar = parseFloat(row.getValue("nominalSudahDibayar"))
      const formatted = formatToIDR(nominalSudahDibayar)
 
      return <div className="font-medium">{formatted}</div>
    },
    size: 200
  },
  {
    accessorKey: "sisaTagihan",
    header: () => (
      <div className="text-center">
        <p>Sisa Tagihan</p>
      </div>
    ),
    cell: ({ row }) => {
      const sisaTagihan = parseFloat(row.getValue("sisaTagihan"))
      const formatted = formatToIDR(sisaTagihan)
 
      return <div className="font-medium">{formatted}</div>
    },
    size: 200
  },
]