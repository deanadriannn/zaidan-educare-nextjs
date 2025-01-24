"use client"

import { Pencil, Trash2 } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { StudentInfo } from "@/types/data"
import { format } from "date-fns"
import { ConfirmAlert } from "@/components/confirm-alert"
import Link from "next/link"

export const columns: ColumnDef<StudentInfo>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="text-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    size: 100,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nis",
    header: () => (
      <div className="text-center">
        <p>NIS</p>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <p>{row.original.nis}</p>
      </div>
    ),
  },
  {
    accessorKey: "nama",
    header: () => (
      <div className="text-center">
        <p>Nama</p>
      </div>
    ),
    size: 150,
  },
  {
    accessorKey: "kelas",
    header: () => (
      <div className="text-center">
        <p>Kelas</p>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <p>{row.original.kelas}</p>
      </div>
    ),
    size: 100
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="text-center">
        <p>Status</p>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <p>{row.original.status}</p>
      </div>
    ),
    size: 200
  },
  {
    accessorKey: "jenisKelamin",
    header: () => (
      <div className="text-center">
        <p>Jenis Kelamin</p>
      </div>
    ),
    size: 200
  },
  {
    accessorKey: "tempatLahir",
    header: () => (
      <div className="text-center">
        <p>Tempat Lahir</p>
      </div>
    ),
    size: 200,
  },
  {
    accessorKey: "tanggalLahir",
    header: () => (
      <div className="text-center">
        <p>Tanggal Lahir</p>
      </div>
    ),
    cell: ({ row }) => {
      const tanggalLahir = row.original.tanggalLahir
      const formatted = format(tanggalLahir, "dd-MM-yyyy")
      return (
        <p>{formatted}</p>
      )
    },
    size: 150
  },
  {
    accessorKey: "alamatRumah",
    header: () => (
      <div className="text-center">
        <p>Alamat Rumah</p>
      </div>
    ),
    size: 200
  },
  {
    accessorKey: "tahunMasuk",
    header: () => (
      <div className="text-center">
        <p>Tahun Masuk</p>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <p>{row.original.tahunMasuk}</p>
      </div>
    )
  },
  {
    accessorKey: "tahunKeluar",
    header: () => (
      <div className="text-center">
        <p>Tahun Keluar</p>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <p>{row.original.tahunKeluar}</p>
      </div>
    )
  },
  {
    accessorKey: "namaWali",
    header: () => (
      <div className="text-center">
        <p>Nama Wali</p>
      </div>
    ),
    size: 150
  },
  {
    accessorKey: "hubungan",
    header: () => (
      <div className="text-center">
        <p>Hubungan Wali</p>
      </div>
    ),
    size: 150
  },
  {
    accessorKey: "jenisKelaminWali",
    header: () => (
      <div className="text-center">
        <p>Jenis Kelamin Wali</p>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <p>{row.original.jenisKelaminWali}</p>
      </div>
    ),
    size: 150
  },
  {
    accessorKey: "emailWali",
    header: () => (
      <div className="text-center">
        <p>Email Wali</p>
      </div>
    ),
    size: 200
  },
  {
    accessorKey: "nomorTeleponWali",
    header: () => (
      <div className="text-center">
        <p>Nomor Telepon Wali</p>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <p>{row.original.nomorTeleponWali}</p>
      </div>
    ),
    size: 150
  },
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
      const router = useRouter()

      const handleDelete = () => {
        toast.success("Data siswa berhasil dihapus")
      }
 
      return (
        <div className="flex justify-center items-center space-x-2">
          <Link href={"/siswa/edit/" + student.id}>
            <Button size="icon" variant="ghost">
              <Pencil className="text-yellow-500"/>
            </Button>
          </Link>
          <ConfirmAlert
            title="Apakah Anda yakin untuk menghapus data siswa?"
            handleAction={handleDelete}
          >
            <Button size="icon" variant="ghost">
              <Trash2 className="text-destructive"/>
            </Button>
          </ConfirmAlert>
          <Switch
            checked={student.status === "Aktif"}
          />
        </div>
      )
    },
    size: 150,
  },
]