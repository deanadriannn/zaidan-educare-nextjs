"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
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
import { kelasSelectOptions, tagihanSiswaData } from "@/lib/data";
import { useRouter } from "next/navigation";
import Filter from "@/components/filter";
import Link from "next/link";

export default function TagihanSiswaPage() {
  const [nama, setNama] = useState('')
  const [kelas, setKelas] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleFilter = (e: any) => {
    setIsLoading(true)

    e.preventDefault()
    
    const query = new URLSearchParams({
      nama: nama,
      kelas: kelas,
    })

    router.push(`/tagihan-siswa?${query.toString()}`)

    setIsLoading(false)
  }

  const handleReset = () => {
    setNama('')
    setKelas('')
    router.push("/tagihan-siswa")
  }
  
  return (
    <>
      <Filter>
        <form onSubmit={handleFilter}>
          <CardContent className="flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="nama" className="text-md">Nama Siswa</Label>
              <div className="w-full relative">
                <Input
                  id="nama"
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Temukan Nama Siswa..."
                  disabled={isLoading}
                />
                <Search className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2" />
              </div>
            </div>
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="kelas" className="text-md">Kelas</Label>
              <Select onValueChange={(value) => setKelas(value)} disabled={isLoading}>
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
          </CardContent>
          <CardFooter className="flex flex-col md:flex-row justify-end gap-4">
            <Button variant="ghost" className="hover:bg-transparent text-[#F5365C] hover:text-[#D12C50] w-full md:w-fit" onClick={handleReset} disabled={isLoading}> 
              RESET
            </Button>
            <Button type="submit" variant="primary-red" className="w-full md:w-fit" disabled={isLoading}>
              <Search /> Cari
            </Button>
          </CardFooter>
        </form>
      </Filter>
      <Card className="rounded-lg border md:mx-4 mt-4 shrink-0 flex flex-col gap-4 pt-4">
        <CardContent className="flex justify-end gap-4">
          <Link href={'/tagihan-siswa/input'}>
            <Button
              variant="primary-red"
              className="w-full md:w-fit"
              disabled={isLoading}
            >
              <Plus /> Tambah
            </Button>
          </Link>
        </CardContent>
        <DataTable columns={columns} data={tagihanSiswaData} />
      </Card>
    </>
  )
}