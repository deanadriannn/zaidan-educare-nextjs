"use client"

import { CircleCheck, CircleX, Eye, Pencil, Trash2 } from "lucide-react"
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
import { TagihanSiswaColumns } from "@/types/data"
import { formatToIDR } from "@/lib/utils"
import Link from "next/link"

export const columns: ColumnDef<TagihanSiswaColumns>[] = [
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
    accessorKey: "namaSiswa",
    header: () => (
      <div className="text-center">
        <p>Nama Siswa</p>
      </div>
    ),
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
  },
  {
    accessorKey: "daftarTagihan",
    header: () => (
      <div className="text-center">
        <p>Daftar Tagihan</p>
      </div>
    ),
    size: 300
  },
  {
    accessorKey: "nominalDpp",
    header: () => (
      <div className="text-center">
        <p>Nominal DPP</p>
      </div>
    ),
    cell: ({ row }) => {
      const nominalDpp = parseFloat(row.getValue("nominalDpp"))
      const formatted = formatToIDR(nominalDpp)
 
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "nominalProgram",
    header: () => (
      <div className="text-center">
        <p>Nominal Program</p>
      </div>
    ),
    cell: ({ row }) => {
      const nominalProgram = parseFloat(row.getValue("nominalProgram"))
      const formatted = formatToIDR(nominalProgram)
 
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "nominalBulanan",
    header: () => (
      <div className="text-center">
        <p>Nominal Bulanan</p>
      </div>
    ),
    cell: ({ row }) => {
      const nominalBulanan = parseFloat(row.getValue("nominalBulanan"))
      const formatted = formatToIDR(nominalBulanan)
 
      return <div className="font-medium">{formatted}</div>
    },
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
        router.push('/tagihan-siswa?status=delete-success')
      }
 
      return (
        <div className="flex justify-center items-center space-x-2">
          <Link href={"/tagihan-siswa/edit/" + student.id}>
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
          <Link href={"/tagihan-siswa/" + student.id}>
            <Button size="icon" variant="ghost">
              <Eye className="text-[#5787e1]" />
            </Button>
          </Link>
        </div>
      )
    },
    size: 100,
  },
]