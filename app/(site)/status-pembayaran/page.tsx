"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileDown, Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { jenisPembayaranSelectOptions, kelasSelectOptions, statusPembayaranData, tagihanSiswaData } from "@/lib/data";
import Filter from "@/components/filter";
import Link from "next/link";

export default function StatusPembayaranPage() {
  const [name, setName] = useState('')
  const [kelas, setKelas] = useState('')
  const [jenisPembayaran, setJenisPembayaran] = useState('')
  const [statusPembayaran, setStatusPembayaran] = useState('')

  const handleFilter = (e: any) => {
    e.preventDefault()
    console.log('Filtering')
    console.log(name, kelas, jenisPembayaran, statusPembayaran)
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
              <Label htmlFor="statusPembayaran" className="text-md">Status Pembayaran</Label>
              <Select onValueChange={(value) => setStatusPembayaran(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lunas">Lunas</SelectItem>
                  <SelectItem value="belum_lunas">Belum Lunas</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
      </Filter>
      <Card className="rounded-lg border md:mx-4 mt-4 shrink-0 flex flex-col gap-4 pt-4">
        <CardContent className="flex justify-end gap-4">
          <Link
            href="/download/Data Unduh Status Pembayaran.xlsx"
            download="Data Unduh Status Pembayaran.xlsx"
          >
            <Button variant="primary-red">
              <FileDown /> Unduh
            </Button>
          </Link>
        </CardContent>
        {/* @ts-ignore */}
        <DataTable columns={columns} data={statusPembayaranData} />
      </Card>
    </>
  )
}