"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TagihanSiswa, columns } from "./columns";
import { DataTable } from "./data-table";
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

const data: TagihanSiswa[] = [
  {
    id: '1',
    nis: '1234567890',
    namaSiswa: 'John Doe',
    kelas: 'Kelas 1',
    daftarTagihan: ['DPP', 'Program', 'Bulanan'],
    nominalDpp: 1000000,
    nominalProgram: 500000,
    nominalBulanan: 100000,
  },
  {
    id: '2',
    nis: '1234567891',
    namaSiswa: 'Jane Doe',
    kelas: 'Kelas 2',
    daftarTagihan: ['DPP', 'Program', 'Bulanan'],
    nominalDpp: 1000000,
    nominalProgram: 500000,
    nominalBulanan: 100000,
  },
  {
    id: '3',
    nis: '1234567892',
    namaSiswa: 'John Smith',
    kelas: 'Kelas 3',
    daftarTagihan: ['DPP', 'Program', 'Bulanan'],
    nominalDpp: 1000000,
    nominalProgram: 500000,
    nominalBulanan: 100000,
  },
  {
    id: '4',
    nis: '1234567893',
    namaSiswa: 'Jane Smith',
    kelas: 'Kelas 4',
    daftarTagihan: ['DPP', 'Program', 'Bulanan'],
    nominalDpp: 1000000,
    nominalProgram: 500000,
    nominalBulanan: 100000,
  },
  {
    id: '5',
    nis: '1234567894',
    namaSiswa: 'John Doe Jr.',
    kelas: 'Kelas 5',
    daftarTagihan: ['DPP', 'Program', 'Bulanan'],
    nominalDpp: 1000000,
    nominalProgram: 500000,
    nominalBulanan: 100000,
  },
  {
    id: '6',
    nis: '1234567895',
    namaSiswa: 'Jane Doe Jr.',
    kelas: 'Kelas 6',
    daftarTagihan: ['DPP', 'Program', 'Bulanan'],
    nominalDpp: 1000000,
    nominalProgram: 500000,
    nominalBulanan: 100000,
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
      <Card className="mx-4 mt-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Filters</CardTitle>
        </CardHeader>
        <form onSubmit={handleFilter}>
          <CardContent className="flex justify-center items-center gap-4">
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
            <div className="w-full flex flex-col space-y-2"></div>
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
          <Button 
            onClick={() => window.location.href = '/tagihan-siswa/input'}
            variant="primary-red"
          >
            <Plus /> Tambah
          </Button>
        </div>
        <DataTable columns={columns} data={data} />
      </Card>
    </>
  )
}