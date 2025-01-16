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
import { CalendarIcon, FileDown, FileUp, Plus, Search } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns"

const data: PenerimaanDanaColumns[] = [
  {
    id: '1',
    tanggalTransaksi: new Date('2024-12-06'),
    nis: '123456789',
    namaSiswa: 'John Doe',
    kelas: '1-A',
    jenisPembayaran: 'SPP Januari 2022',
    nominal: 1000000,
    metodePembayaran: 'Transfer'
  },
  // buat 3 data lagi
  {
    id: '2',
    tanggalTransaksi: new Date('2024-10-06'),
    nis: '123456789',
    namaSiswa: 'Jane Doe',
    kelas: '4-B',
    jenisPembayaran: 'SPP Februari 2022',
    nominal: 2000000,
    metodePembayaran: 'Tunai'
  },
  {
    id: '3',
    tanggalTransaksi: new Date('2024-11-27'),
    nis: '123456789',
    namaSiswa: 'Alex',
    kelas: '2-C',
    jenisPembayaran: 'SPP Maret 2021',
    nominal: 3000000,
    metodePembayaran: 'Transfer'
  },
]

export default function TagihanSiswaPage() {
  const [name, setName] = useState('')
  const [kelas, setKelas] = useState('')
  const [jenisPembayaran, setJenisPembayaran] = useState('')
  const [tanggalTransaksi, setTanggalTransaksi] = useState<Date | undefined>()

  const handleFilter = (e: any) => {
    e.preventDefault()
    console.log('Filtering')
    console.log(name, kelas, jenisPembayaran, tanggalTransaksi)
  }
  
  return (
    <>
      <Card className="md:mx-4 mt-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Filters</CardTitle>
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
              <Label htmlFor="jenisPembayaran" className="text-md">Tanggal Transaksi</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !tanggalTransaksi && "text-muted-foreground"
                    )}
                  >
                    {tanggalTransaksi ? (
                      format(tanggalTransaksi, "PPP")
                    ) : (
                      <span>Masukkan tanggal transaksi</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={tanggalTransaksi}
                    onSelect={(date) => setTanggalTransaksi(date)}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-full hidden md:flex flex-col space-y-2"></div>
          </CardContent>
          <CardFooter className="flex flex-col md:flex-row justify-end gap-4">
            <Button variant="outline" className="hover:bg-transparent text-[#F5365C] hover:text-[#D12C50] w-full md:w-fit">
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
          <Button variant="primary-red">
            <FileUp /> Impor Data
          </Button>
          <Button 
            onClick={() => window.location.href = '/penerimaan-dana/input'}
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