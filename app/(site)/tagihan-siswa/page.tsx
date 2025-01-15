"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { TagihanSiswaColumns } from "@/types/data";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const data: TagihanSiswaColumns[] = [
  {
    id: "1",
    nis: "123456",
    namaSiswa: "John Doe",
    kelas: "Kelas 1",
    daftarTagihan: ["DPP", "Buku Paket"],
    nominalDpp: 1000000,
    nominalProgram: 500000,
    nominalBulanan: 200000
  },
  {
    id: "2",
    nis: "123457",
    namaSiswa: "Jane Doe",
    kelas: "Kelas 2",
    daftarTagihan: ["DPP", "Buku Paket"],
    nominalDpp: 1000000,
    nominalProgram: 500000,
    nominalBulanan: 200000
  },
  {
    id: "3",
    nis: "123458",
    namaSiswa: "John Smith",
    kelas: "Kelas 3",
    daftarTagihan: ["DPP", "Buku Paket"],
    nominalDpp: 1000000,
    nominalProgram: 500000,
    nominalBulanan: 200000
  },
  {
    id: "4",
    nis: "123459",
    namaSiswa: "Jane Smith",
    kelas: "Kelas 4",
    daftarTagihan: ["DPP", "Buku Paket"],
    nominalDpp: 1000000,
    nominalProgram: 500000,
    nominalBulanan: 200000
  },
  {
    id: "5",
    nis: "123460",
    namaSiswa: "John Doe Jr.",
    kelas: "Kelas 5",
    daftarTagihan: ["DPP", "Buku Paket"],
    nominalDpp: 1000000,
    nominalProgram: 500000,
    nominalBulanan: 200000
  }
]

export default function TagihanSiswaPage() {
  const [name, setName] = useState('')
  const [kelas, setKelas] = useState('')


  const handleFilter = (e: any) => {
    e.preventDefault()
    console.log('Filtering')
    console.log(name, kelas)
  }
  
  return (
    <>
      <Card className="md:mx-4 mt-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Filters</CardTitle>
        </CardHeader>
        <form onSubmit={handleFilter}>
          <CardContent className="flex flex-col md:flex-row justify-center items-center gap-4">
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
                  <SelectItem value="1">Kelas 1</SelectItem>
                  <SelectItem value="2">Kelas 2</SelectItem>
                  <SelectItem value="3">Kelas 3</SelectItem>
                  <SelectItem value="4">Kelas 4</SelectItem>
                  <SelectItem value="5">Kelas 5</SelectItem>
                  <SelectItem value="6">Kelas 6</SelectItem>
                </SelectContent>
              </Select>
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
        <CardContent className="flex justify-end gap-4">
          <Button 
            onClick={() => window.location.href = '/tagihan-siswa/input'}
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