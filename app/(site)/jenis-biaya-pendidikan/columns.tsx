"use client"

import { CircleCheck, CircleX, Pencil, Trash2 } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
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
import { JenisBiayaPendidikan } from "@/types/data"
import Link from "next/link"
import { useRouter } from "next/navigation"

export const columns: ColumnDef<JenisBiayaPendidikan>[] = [
  {
    accessorKey: "namaTagihan",
    header: () => (
      <div className="text-center">
        <p>Nama Tagihan</p>
      </div>
    ),
    cell: ({ row }) => (
      <div className="pl-4">
        <p>{row.original.namaTagihan}</p>
      </div>
    ),
    size: 400
  },
  {
    accessorKey: "waktuPembayaran",
    header: () => (
      <div className="text-center">
        <p>Waktu Pembayaran</p>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <p>{row.original.waktuPembayaran}</p>
      </div>
    ),
    size: 400
  },
  {
    accessorKey: "statusCicilan",
    header: () => (
      <div className="text-center">
        <p>Status Cicilan</p>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <p>{row.original.statusCicilan}</p>
      </div>
    ),
    size: 400
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
      const jenisBiayaPendidikan = row.original
      const router = useRouter()

      const handleDelete = () => {
        router.push('/jenis-biaya-pendidikan?status=delete-success')
      }
 
      return (
        <div className="flex justify-center items-center space-x-2">
          <Link href={"/jenis-biaya-pendidikan/edit/" + jenisBiayaPendidikan.id}>
            <Button size="icon" variant="ghost">
              <Pencil className="text-yellow-500"/>
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="ghost">
                <Trash2 className="text-destructive"/>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Apakah Anda yakin untuk menghapus data jenis biaya pendidikan?</AlertDialogTitle>
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
        </div>
      )
    },
  },
]