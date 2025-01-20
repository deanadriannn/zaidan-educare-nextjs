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

export default function RekapitulasiPenerimaanDanaPage() {
  const [tahunAjaranStart, setTahunAjaranStart] = useState('')

  const handleFilter = (e: any) => {
    e.preventDefault()
    console.log('Filtering')
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
              <Label htmlFor="tahunAjaranStart" className="text-md">Tahun Ajaran</Label>
              <div className="w-full flex gap-4 items-center">
                <Input
                  id="tahunAjaranStart"
                  type="text"
                  value={tahunAjaranStart}
                  onChange={(e) => setTahunAjaranStart(e.target.value)}
                  placeholder="Masukkan Tahun Ajaran"
                />
                <p>/</p>
                <Input
                  id="tahunAjaranStart"
                  type="text"
                  value={tahunAjaranStart}
                  onChange={(e) => setTahunAjaranStart(e.target.value)}
                  placeholder="Masukkan Tahun Ajaran"
                />
              </div>
            </div>
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
          <Button variant="primary-red">
            <FileDown /> Unduh
          </Button>
        </CardContent>
        {/* @ts-ignore */}
        <DataTable columns={columns} data={statusPembayaranData} />
      </Card>
    </>
  )
}