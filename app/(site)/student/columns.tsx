"use client"

import { Pencil, Trash2 } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"

export type Student = {
  id: string
  nis: string
  nama: string
  kelas: string
  status: "Aktif" | "Non-Aktif"
  jenisKelamin: string
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
    size: 300
  },
  {
    accessorKey: "nama",
    header: "Nama",
    size: 300,
  },
  {
    accessorKey: "kelas",
    header: "Kelas",
    size: 300
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 300
  },
  {
    accessorKey: "jenisKelamin",
    header: "Jenis Kelamin",
    size: 300
  },
  {
    accessorKey: "tempatLahir",
    header: "Tempat Lahir",
    size: 300,
  },
  {
    accessorKey: "tanggalLahir",
    header: "Tanggal Lahir",
    size: 300
  },
  {
    accessorKey: "alamatRumah",
    header: "Alamat Rumah",
    size: 300
  },
  {
    accessorKey: "namaWali",
    header: "Nama Wali",
    size: 300
  },
  {
    accessorKey: "hubungan",
    header: "Hubungan Wali",
    size: 300
  },
  {
    accessorKey: "jenisKelaminWali",
    header: "Jenis Kelamin Wali",
    size: 300
  },
  {
    accessorKey: "emailWali",
    header: "Email Wali",
    size: 300
  },
  {
    accessorKey: "nomorTeleponWali",
    header: "Nomor Telepon Wali",
    size: 300
  },
  // {
  //   accessorKey: "foto",
  //   header: "Foto",
  //   size: 300
  // },
  {
    id: "aksi",
    header: () => (
      <div className="flex justify-center items-center gap-2">
        <p>Aksi</p>
      </div>
    ),
    accessorKey: "aksi",
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
          <Switch
            checked={student.status === "Aktif"}
          />
        </div>
      )
    },
    size: 200,
  },
]