"use client"

import { CircleCheck, CircleX, Pencil, Trash2 } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
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
import { BankPenerimaTransfer } from "@/types/data"
import Link from "next/link"

export const columns: ColumnDef<BankPenerimaTransfer>[] = [
  {
    accessorKey: "namaBank",
    header: () => (
      <div className="text-center">
        <p>Nama Bank</p>
      </div>
    ),
    cell: ({ row }) => (
      <div className="pl-4">
        <p>{row.original.namaBank}</p>
      </div>
    ),
    size: 400
  },
  {
    accessorKey: "nomorRekening",
    header: () => (
      <div className="text-center">
        <p>Nomor Rekening</p>
      </div>
    ),
    size: 400
  },
  {
    accessorKey: "namaPemilikRekening",
    header: () => (
      <div className="text-center">
        <p>Nama Pemilik Rekening</p>
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
      const bankPenerimaTransfer = row.original
      const router = useRouter()

      const handleDelete = () => {
        router.push('/bank-penerima-transfer?status=delete-success')
      }
 
      return (
        <div className="flex justify-center items-center space-x-2">
          <Link href={"/bank-penerima-transfer/edit/" + bankPenerimaTransfer.id}>
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
                <AlertDialogTitle>Apakah Anda yakin untuk menghapus data bank penerima transfer?</AlertDialogTitle>
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