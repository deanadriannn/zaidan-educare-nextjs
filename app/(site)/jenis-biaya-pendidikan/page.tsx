"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { JenisBiayaPendidikan, columns } from "./columns";
import { DataTable } from "./data-table";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

const data: JenisBiayaPendidikan[] = [
  {
    id: "1",
    namaTagihan: "SPP",
    waktuPembayaran: "Bulanan",
    statusCicilan: "Ya",
  }, 
  {
    id: "2",
    namaTagihan: "Uang Gedung",
    waktuPembayaran: "Tahunan",
    statusCicilan: "Tidak",
  }, 
  {
    id: "3",
    namaTagihan: "Uang Pangkal",
    waktuPembayaran: "1x",
    statusCicilan: "Tidak",
  },
  {
    id: "4",
    namaTagihan: "Uang Kegiatan",
    waktuPembayaran: "Bulanan",
    statusCicilan: "Ya",
  },
  {
    id: "5",
    namaTagihan: "Uang Seragam",
    waktuPembayaran: "1x",
    statusCicilan: "Tidak",
  }
]

export default function JenisBiayaPendidikanPage() {
  const [name, setName] = useState('')


  const handleFilter = (e: any) => {
    e.preventDefault()
    console.log('Filtering')
    console.log(name)
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
              <Label htmlFor="nama" className="text-md">Nama Tagihan</Label>
              <div className="w-full relative">
                <Input
                  id="nama"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Temukan Nama Tagihan..."
                />
                <Search className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2" />
              </div>
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
          <Button 
            onClick={() => window.location.href = '/jenis-biaya-pendidikan/input'}
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