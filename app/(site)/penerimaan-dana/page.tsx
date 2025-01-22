"use client";

import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { columns } from "./columns";
import { PenerimaanDanaColumns } from "@/types/data";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileDown, FileUp, Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  jenisPembayaranSelectOptions, 
  kelasSelectOptions 
} from "@/lib/data";
import { useRouter } from "next/navigation";
import { DatePicker } from "@/components/date-picker";
import { UploadFileDialog } from "@/components/upload-file-dialog";

const data: PenerimaanDanaColumns[] = [
  {
    id: '1',
    tanggalTransaksi: new Date('2025-01-01'),
    nis: '12152089',
    namaSiswa: 'Nadin Kumala',
    kelas: '6A',
    jenisPembayaran: 'DPP',
    nominal: 15000000,
    metodePembayaran: 'Transfer (BSI)'
  },
  {
    id: '2',
    tanggalTransaksi: new Date('2025-01-05'),
    nis: '12152012',
    namaSiswa: 'Tara Prasetyo',
    kelas: '6A',
    jenisPembayaran: 'SPP Februari',
    nominal: 600000,
    metodePembayaran: 'Transfer (Mandiri)'
  },
  {
    id: '3',
    tanggalTransaksi: new Date('2025-01-05'),
    nis: '13152029',
    namaSiswa: 'Siti Andini',
    kelas: '3A',
    jenisPembayaran: 'SPP Januari',
    nominal: 600000,
    metodePembayaran: 'Tunai'
  },
  {
    id: '4',
    tanggalTransaksi: new Date('2025-01-05'),
    nis: '13152089',
    namaSiswa: 'Rizki Anugrah',
    kelas: '3A',
    jenisPembayaran: 'Makan Siang',
    nominal: 200000,
    metodePembayaran: 'Tunai'
  },
  {
    id: '5',
    tanggalTransaksi: new Date('2025-01-05'),
    nis: '14152089',
    namaSiswa: 'Reza Hakim',
    kelas: '2A',
    jenisPembayaran: 'Jemputan',
    nominal: 150000,
    metodePembayaran: 'Tunai'
  },
  {
    id: '6',
    tanggalTransaksi: new Date('2025-01-10'),
    nis: '12158081',
    namaSiswa: 'Dinda Kania',
    kelas: '4A',
    jenisPembayaran: 'SPP Desember 2024',
    nominal: 600000,
    metodePembayaran: 'Transfer (BJB)'
  },
  {
    id: '7',
    tanggalTransaksi: new Date('2025-01-13'),
    nis: '12152193',
    namaSiswa: 'Roni Budiman',
    kelas: '4A',
    jenisPembayaran: 'DPP',
    nominal: 15000000,
    metodePembayaran: 'Transfer (BSI)'
  },
  {
    id: '8',
    tanggalTransaksi: new Date('2025-01-13'),
    nis: '13152017',
    namaSiswa: 'Indah Amanda',
    kelas: '3A',
    jenisPembayaran: 'SPP Februari',
    nominal: 600000,
    metodePembayaran: 'Transfer (Mandiri)'
  },
  {
    id: '9',
    tanggalTransaksi: new Date('2025-01-15'),
    nis: '13152038',
    namaSiswa: 'Ahmad Ihsan',
    kelas: '3A',
    jenisPembayaran: 'Makan Siang',
    nominal: 200000,
    metodePembayaran: 'Tunai'
  },
  {
    id: '10',
    tanggalTransaksi: new Date('2025-01-15'),
    nis: '14152071',
    namaSiswa: 'Alam Fajrin',
    kelas: '2A',
    jenisPembayaran: 'Jemputan',
    nominal: 150000,
    metodePembayaran: 'Tunai'
  },
]

export default function TagihanSiswaPage() {
  const [name, setName] = useState('')
  const [kelas, setKelas] = useState('')
  const [jenisPembayaran, setJenisPembayaran] = useState('')
  const [tanggalTransaksi, setTanggalTransaksi] = useState<Date | undefined>()
  const router = useRouter()

  const handleFilter = (e: any) => {
    e.preventDefault()
    console.log('Filtering')
    console.log(name, kelas, jenisPembayaran, tanggalTransaksi)
  }
  
  return (
    <>
      <Card className="md:mx-4 mt-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Kata Kunci Pencarian</CardTitle>
        </CardHeader>
        <form onSubmit={handleFilter}>
          <CardContent className="flex flex-col md:grid md:grid-cols-2 justify-center items-center gap-4">
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="nama" className="text-md">Nama Siswa</Label>
              <div className="w-full relative">
                <Input
                  id="nama"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Temukan Nama Siswa..."
                />
                <Search className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2" />
              </div>
            </div>
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="jenisPembayaran" className="text-md">Jenis Pembayaran</Label>
              <Select onValueChange={(value) => setJenisPembayaran(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Jenis Pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  {jenisPembayaranSelectOptions.map((option) => (
                    <SelectItem value={option.value} key={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="kelas" className="text-md">Kelas</Label>
              <Select onValueChange={(value) => setKelas(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Kelas" />
                </SelectTrigger>
                <SelectContent>
                  {kelasSelectOptions.map((option) => (
                    <SelectItem value={option.value} key={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="jenisPembayaran" className="text-md">Tanggal Transaksi</Label>
              <DatePicker
                value={tanggalTransaksi || undefined}
                onChange={(date) => setTanggalTransaksi(date || undefined)}
                minDate={new Date("1900-01-01")}
                maxDate={new Date()}
                placeholder="Pilih Tanggal Transaksi"
              />
            </div>
            <div className="w-full hidden md:flex flex-col space-y-2"></div>
          </CardContent>
          <CardFooter className="flex flex-col md:flex-row justify-end gap-4">
            <Button variant="ghost" className="hover:bg-transparent text-[#F5365C] hover:text-[#D12C50] w-full md:w-fit">
              RESET
            </Button>
            <Button type="submit" variant="primary-red" className="w-full md:w-fit">
              <Search /> Cari
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Card className="rounded-lg border md:mx-4 mt-4 shrink-0 flex flex-col gap-4 pt-4">
        <CardContent className="flex flex-col md:flex-row justify-end gap-4">
          <Button variant="primary-red">
            <FileDown /> Unduh Template Import
          </Button>
          <UploadFileDialog
            title="Import Data Transaksi Pembayaran"
          >
            <Button variant="primary-red">
              <FileUp /> Impor Data
            </Button>
          </UploadFileDialog>
          <Button 
            onClick={() => router.push('/penerimaan-dana/input')}
            variant="primary-red"
            className="w-full md:w-fit"
          >
            <Plus /> Tambah
          </Button>
        </CardContent>
        <DataTable columns={columns} data={data} />
      </Card>
    </>
  )
}