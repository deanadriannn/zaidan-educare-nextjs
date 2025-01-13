"use client"

import { Pencil, Trash2 } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export type Student = {
  id: string
  nis: string
  nama: string
  jenisKelamin: string
  kelas: string
  tempatLahir: string
  tanggalLahir: string
  alamatRumah: string
  namaWali: string
  hubungan: string
  jenisKelaminWali: string
  emailWali: string
  nomorTeleponWali: string
  foto: string
}

export const columns: ColumnDef<Student>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex justify-center items-center gap-2">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
        <p className="font-bold">Select All</p>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    size: 200,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nis",
    header: "NIS",
    size: 400
  },
  {
    accessorKey: "nama",
    header: "Nama",
    size: 400
  },
  {
    accessorKey: "jenisKelamin",
    header: "Jenis Kelamin",
    size: 400
  },
  {
    accessorKey: "kelas",
    header: "Kelas",
    size: 400
  },
  {
    accessorKey: "tempatLahir",
    header: "Tempat Lahir",
    size: 400
  },
  {
    accessorKey: "tanggalLahir",
    header: "Tanggal Lahir",
    size: 400
  },
  {
    accessorKey: "alamatRumah",
    header: "Alamat Rumah",
    size: 400
  },
  {
    accessorKey: "namaWali",
    header: "Nama Wali",
    size: 400
  },
  {
    accessorKey: "hubungan",
    header: "Hubungan",
    size: 400
  },
  {
    accessorKey: "jenisKelaminWali",
    header: "Jenis Kelamin Wali",
    size: 400
  },
  {
    accessorKey: "emailWali",
    header: "Email Wali",
    size: 400
  },
  {
    accessorKey: "nomorTeleponWali",
    header: "Nomor Telepon Wali",
    size: 400
  },
  {
    accessorKey: "foto",
    header: "Foto",
    size: 400
  },
  {
    id: "aksi",
    header: "Aksi",
    cell: ({ row }) => {
      const student = row.original
 
      return (
        <div className="flex justify-center items-center space-x-2">
          <Button size="icon" variant="ghost">
            <Pencil className="text-yellow-500"/>
          </Button>
          <Button size="icon" variant="ghost">
            <Trash2 className="text-destructive"/>
          </Button>
        </div>
      )
    },
    size: 200,
    meta: {
      headerClassName: "text-center sticky right-0 z-10",
    },
  },
]