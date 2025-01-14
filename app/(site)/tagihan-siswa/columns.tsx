"use client"

import { CircleCheck, CircleX, Eye, Pencil, Trash2 } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
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
import { TagihanSiswaColumns } from "@/types/data"

export const columns: ColumnDef<TagihanSiswaColumns>[] = [
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
    size: 300
  },
  {
    accessorKey: "namaSiswa",
    header: "Nama Siswa",
    size: 300,
  },
  {
    accessorKey: "kelas",
    header: "Kelas",
    size: 300
  },
  {
    accessorKey: "daftarTagihan",
    header: "Daftar Tagihan",
    size: 300
  },
  {
    accessorKey: "nominalDpp",
    header: "Nominal DPP",
    cell: ({ row }) => {
      const nominalDpp = parseFloat(row.getValue("nominalDpp"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "IDR",
      }).format(nominalDpp)
 
      return <div className="font-medium">{formatted}</div>
    },
    size: 300
  },
  {
    accessorKey: "nominalProgram",
    header: "Nominal Program",
    cell: ({ row }) => {
      const nominalProgram = parseFloat(row.getValue("nominalProgram"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "IDR",
      }).format(nominalProgram)
 
      return <div className="font-medium">{formatted}</div>
    },
    size: 300,
  },
  {
    accessorKey: "nominalBulanan",
    header: "Nominal Bulanan",
    cell: ({ row }) => {
      const nominalBulanan = parseFloat(row.getValue("nominalBulanan"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "IDR",
      }).format(nominalBulanan)
 
      return <div className="font-medium">{formatted}</div>
    },
    size: 300
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
        toast.success("Data tagihan biaya pendidikan berhasil dihapus")
      }
 
      return (
        <div className="flex justify-center items-center space-x-2">
          <Button size="icon" variant="ghost" onClick={() => router.push("/tagihan-siswa/edit/" + student.id)}>
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
                <AlertDialogTitle>Apakah Anda yakin untuk menghapus data tagihan biaya pendidikan?</AlertDialogTitle>
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
          <Button size="icon" variant="ghost" onClick={() => router.push("/tagihan-siswa/" + student.id)}>
            <Eye className="text-[#5787e1]" />
          </Button>
        </div>
      )
    },
    size: 200,
  },
]