"use client"

import { CircleCheck, CircleX, Pencil, Trash2 } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog"
import { StudentInfo } from "@/types/data"

export const columns: ColumnDef<StudentInfo>[] = [
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
    size: 200
  },
  {
    accessorKey: "nama",
    header: "Nama",
    size: 200,
  },
  {
    accessorKey: "kelas",
    header: "Kelas",
    size: 200
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 200
  },
  {
    accessorKey: "jenisKelamin",
    header: "Jenis Kelamin",
    size: 200
  },
  {
    accessorKey: "tempatLahir",
    header: "Tempat Lahir",
    size: 200,
  },
  {
    accessorKey: "tanggalLahir",
    header: "Tanggal Lahir",
    size: 200
  },
  {
    accessorKey: "alamatRumah",
    header: "Alamat Rumah",
    size: 200
  },
  {
    accessorKey: "namaWali",
    header: "Nama Wali",
    size: 200
  },
  {
    accessorKey: "hubungan",
    header: "Hubungan Wali",
    size: 200
  },
  {
    accessorKey: "jenisKelaminWali",
    header: "Jenis Kelamin Wali",
    size: 200
  },
  {
    accessorKey: "emailWali",
    header: "Email Wali",
    size: 200
  },
  {
    accessorKey: "nomorTeleponWali",
    header: "Nomor Telepon Wali",
    size: 200
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
      const router = useRouter()

      const handleDelete = () => {
        toast.success("Data siswa berhasil dihapus")
      }
 
      return (
        <div className="flex justify-center items-center space-x-2">
          <Button size="icon" variant="ghost" onClick={() => router.push("/siswa/edit/" + student.id)}>
            <Pencil className="text-yellow-500"/>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="ghost">
                <Trash2 className="text-destructive"/>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Apakah Anda yakin untuk menghapus data siswa?</AlertDialogTitle>
                <AlertDialogDescription>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-[#608BC1] text-white hover:bg-[#4B6F9A] hover:text-white">
                  <CircleX /> Tidak
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDelete} 
                  className="bg-[#F5365C] text-white hover:bg-[#D12C50]"
                >
                  <CircleCheck /> Ya
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Switch
            checked={student.status === "Aktif"}
          />
        </div>
      )
    },
    size: 200,
  },
]