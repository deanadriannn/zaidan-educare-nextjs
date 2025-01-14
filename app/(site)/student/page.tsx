"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Student, columns } from "./columns";
import { DataTable } from "./data-table";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleArrowUp, FileDown, FileUp, Plus, Search, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const data: Student[] = [
  {
    id: "1",
    nis: "1234",
    nama: "John Doe",
    jenisKelamin: "Laki-laki",
    kelas: "XII RPL",
    status: "Aktif",
    tempatLahir: "Jakarta",
    tanggalLahir: "2000-01-01",
    alamatRumah: "Jl. Lorem Ipsum",
    namaWali: "Vi",
    hubungan: "Ibu",
    jenisKelaminWali: "Perempuan",
    emailWali: "email@example.com",
    nomorTeleponWali: "08123456789",
    foto: ""
  },
  {
    id: "2",
    nis: "1234",
    nama: "John Doe",
    jenisKelamin: "Laki-laki",
    kelas: "XII RPL",
    status: "Non-Aktif",
    tempatLahir: "Jakarta",
    tanggalLahir: "2000-01-01",
    alamatRumah: "Jl. Lorem Ipsum",
    namaWali: "Vi",
    hubungan: "Ibu",
    jenisKelaminWali: "Perempuan",
    emailWali: "email@example.com",
    nomorTeleponWali: "08123456789",
    foto: ""
  },
  {
    id: "3",
    nis: "1234",
    nama: "John Doe",
    jenisKelamin: "Laki-laki",
    kelas: "XII RPL",
    status: "Aktif",
    tempatLahir: "Jakarta",
    tanggalLahir: "2000-01-01",
    alamatRumah: "Jl. Lorem Ipsum",
    namaWali: "Vi",
    hubungan: "Ibu",
    jenisKelaminWali: "Perempuan",
    emailWali: "email@example.com",
    nomorTeleponWali: "08123456789",
    foto: ""
  },
  {
    id: "4",
    nis: "1234",
    status: "Aktif",
    nama: "John Doe",
    jenisKelamin: "Laki-laki",
    kelas: "XII RPL",
    tempatLahir: "Jakarta",
    tanggalLahir: "2000-01-01",
    alamatRumah: "Jl. Lorem Ipsum",
    namaWali: "Vi",
    hubungan: "Ibu",
    jenisKelaminWali: "Perempuan",
    emailWali: "email@example.com",
    nomorTeleponWali: "08123456789",
    foto: ""
  },
  {
    id: "5",
    nis: "1234",
    nama: "John Doe",
    jenisKelamin: "Laki-laki",
    kelas: "XII RPL",
    status: "Aktif",
    tempatLahir: "Jakarta",
    tanggalLahir: "2000-01-01",
    alamatRumah: "Jl. Lorem Ipsum",
    namaWali: "Vi",
    hubungan: "Ibu",
    jenisKelaminWali: "Perempuan",
    emailWali: "email@example.com",
    nomorTeleponWali: "08123456789",
    foto: ""
  },
  {
    id: "6",
    nis: "1234",
    nama: "John Doe",
    jenisKelamin: "Laki-laki",
    kelas: "XII RPL",
    status: "Aktif",
    tempatLahir: "Jakarta",
    tanggalLahir: "2000-01-01",
    alamatRumah: "Jl. Lorem Ipsum",
    namaWali: "Vi",
    hubungan: "Ibu",
    jenisKelaminWali: "Perempuan",
    emailWali: "email@example.com",
    nomorTeleponWali: "08123456789",
    foto: ""
  },
  {
    id: "7",
    nis: "1234",
    nama: "John Doe",
    jenisKelamin: "Laki-laki",
    kelas: "XII RPL",
    tempatLahir: "Jakarta",
    status: "Aktif",
    tanggalLahir: "2000-01-01",
    alamatRumah: "Jl. Lorem Ipsum",
    namaWali: "Vi",
    hubungan: "Ibu",
    jenisKelaminWali: "Perempuan",
    emailWali: "email@example.com",
    nomorTeleponWali: "08123456789",
    foto: ""
  },
  {
    id: "8",
    nis: "1234",
    nama: "John Doe",
    jenisKelamin: "Laki-laki",
    kelas: "XII RPL",
    status: "Aktif",
    tempatLahir: "Jakarta",
    tanggalLahir: "2000-01-01",
    alamatRumah: "Jl. Lorem Ipsum",
    namaWali: "Vi",
    hubungan: "Ibu",
    jenisKelaminWali: "Perempuan",
    emailWali: "email@example.com",
    nomorTeleponWali: "08123456789",
    foto: ""
  },
  {
    id: "9",
    nis: "1234",
    nama: "John Doe",
    jenisKelamin: "Laki-laki",
    kelas: "XII RPL",
    status: "Non-Aktif",
    tempatLahir: "Jakarta",
    tanggalLahir: "2000-01-01",
    alamatRumah: "Jl. Lorem Ipsum",
    namaWali: "Vi",
    hubungan: "Ibu",
    jenisKelaminWali: "Perempuan",
    emailWali: "email@example.com",
    nomorTeleponWali: "08123456789",
    foto: ""
  },
  {
    id: "10",
    nis: "1234",
    nama: "John Doe",
    jenisKelamin: "Laki-laki",
    kelas: "XII RPL",
    tempatLahir: "Jakarta",
    tanggalLahir: "2000-01-01",
    alamatRumah: "Jl. Lorem Ipsum",
    namaWali: "Vi",
    hubungan: "Ibu",
    jenisKelaminWali: "Perempuan",
    emailWali: "email@example.com",
    status: "Aktif",
    nomorTeleponWali: "08123456789",
    foto: ""
  },
  {
    id: "11",
    nis: "1234",
    nama: "John Doe",
    jenisKelamin: "Laki-laki",
    kelas: "XII RPL",
    tempatLahir: "Jakarta",
    tanggalLahir: "2000-01-01",
    alamatRumah: "Jl. Lorem Ipsum",
    namaWali: "Vi",
    hubungan: "Ibu",
    jenisKelaminWali: "Perempuan",
    status: "Aktif",
    emailWali: "email@example.com",
    nomorTeleponWali: "08123456789",
    foto: ""
  },
  {
    id: "12",
    nis: "1234",
    nama: "John Doe",
    jenisKelamin: "Laki-laki",
    kelas: "XII RPL",
    tempatLahir: "Jakarta",
    tanggalLahir: "2000-01-01",
    alamatRumah: "Jl. Lorem Ipsum",
    namaWali: "Vi",
    hubungan: "Ibu",
    status: "Aktif",
    jenisKelaminWali: "Perempuan",
    emailWali: "email@example.com",
    nomorTeleponWali: "08123456789",
    foto: ""
  },
]

export default function StudentPage() {
  const [name, setName] = useState('')
  const [nis, setNis] = useState('')
  const [kelas, setKelas] = useState('')


  const handleFilter = (e: any) => {
    e.preventDefault()
    console.log('Filtering')
    console.log(name, nis, kelas)
  }
  
  return (
    <>
      <Card className="mx-4 mt-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Filters</CardTitle>
        </CardHeader>
        <form onSubmit={handleFilter}>
          <CardContent className="flex justify-center items-center gap-4">
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="nama" className="text-md">Nama</Label>
              <div className="w-full relative">
                <Input
                  id="nama"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Temukan Nama..."
                />
                <Search className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2" />
              </div>
            </div>
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="nis" className="text-md">NIS</Label>
              <div className="w-full relative">
                <Input
                  id="nis"
                  type="text"
                  value={nis}
                  onChange={(e) => setNis(e.target.value)}
                  placeholder="Temukan NIS..."
                />
                <Search className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2" />
              </div>
            </div>
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="kelas" className="text-md">Kelas</Label>
              <Select onValueChange={(value) => setKelas(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kelas..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button variant="ghost" className="hover:bg-transparent text-[#F5365C] hover:text-[#D12C50]">
              RESET
            </Button>
            <Button type="submit" variant="primary-red">
              <Search /> Cari
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Card className="rounded-lg border mx-4 mt-4 shrink-0 flex flex-col gap-4 px-4 pt-4 min-h-[50vh]">
        <div className="flex justify-end gap-4">
          <Button variant="primary-red">
            <CircleArrowUp /> Naik Kelas
          </Button>
          <Button variant="primary-red">
            <FileDown /> Unduh Template Import
          </Button>
          <Button variant="primary-red">
            <FileUp /> Impor Data
          </Button>
          <Button 
            onClick={() => window.location.href = '/student/input'}
            variant="primary-red"
          >
            <Plus /> Tambah
          </Button>
        </div>
        {/* <DataTable columns={columns} data={data} /> */}
        <DataTable columns={columns} data={data} />
      </Card>
    </>
  )
}