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
import { PenerimaanDanaColumns } from "@/types/data"

export const columns: ColumnDef<PenerimaanDanaColumns>[] = [
  {
    accessorKey: "tanggalTransaksi",
    header: () => (
      <div className="pl-4">
        <p>Tanggal Transaksi</p>
      </div>
    ),
    cell: ({ row }) => {
      const tanggalTransaksi = row.original.tanggalTransaksi
      const formatted = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "long"
      }).format(tanggalTransaksi)
 
      return <div className="pl-4">{formatted}</div>
    },
    size: 300
  },
  {
    accessorKey: "nis",
    header: "NIS",
    cell: ({ row }) => (
      <div>
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
    accessorKey: "jenisPembayaran",
    header: "Jenis Pembayaran",
    size: 300
  },
  {
    accessorKey: "nominal",
    header: "Nominal",
    cell: ({ row }) => {
      const nominal = parseFloat(row.getValue("nominal"))
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(nominal)
 
      return <div className="font-medium">{formatted}</div>
    },
    size: 300
  },
  {
    accessorKey: "metodePembayaran",
    header: "Metode Pembayaran",
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
        toast.success("Data transaksi pembayaran biaya pendidikan berhasil dihapus")
      }
 
      return (
        <div className="flex justify-center items-center space-x-2">
          <Button size="icon" variant="ghost" onClick={() => router.push("/penerimaan-dana/edit/" + student.id)}>
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
                <AlertDialogTitle>Apakah Anda yakin untuk menghapus data transaksi pembayaran biaya pendidikan?</AlertDialogTitle>
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
    size: 200,
  },
]