"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileDown, Search } from "lucide-react";
import { rekapitulasiPenerimaanDanaData } from "@/lib/data";
import Filter from "@/components/filter";

export default function RekapitulasiPenerimaanDanaPage() {
  const [tahunAjaranStart, setTahunAjaranStart] = useState("")
  const [tahunAjaranEnd, setTahunAjaranEnd] = useState("")

  // Fungsi untuk memfilter input
  function handleTahunAjaranStartChange(e: React.ChangeEvent<HTMLInputElement>) {
    let val = e.target.value
    val = val.replace(/\D/g, "")
    val = val.replace(/^0+/, "")
    setTahunAjaranStart(val)
  }

  function handleTahunAjaranEndChange(e: React.ChangeEvent<HTMLInputElement>) {
    let val = e.target.value
    val = val.replace(/\D/g, "")
    val = val.replace(/^0+/, "")
    setTahunAjaranEnd(val)
  }

  const handleFilter = (e: any) => {
    e.preventDefault()
    const startNum = parseInt(tahunAjaranStart, 10) || 0
    const endNum = parseInt(tahunAjaranEnd, 10) || 0
    console.log("Nilai start:", startNum, "end:", endNum)
  }
  
  return (
    <>
      <Filter>
        <form onSubmit={handleFilter}>
          <CardContent className="flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="tahunAjaranStart" className="text-md">Tahun Ajaran</Label>
              <div className="w-full flex gap-4 items-center">
                <Input
                  id="tahunAjaranStart"
                  type="text"
                  value={tahunAjaranStart}
                  onChange={handleTahunAjaranStartChange}
                  placeholder="Masukkan Tahun Ajaran"
                />
                <p>/</p>
                <Input
                  id="tahunAjaranStart"
                  type="text"
                  value={tahunAjaranEnd}
                  onChange={handleTahunAjaranEndChange}
                  placeholder="Masukkan Tahun Ajaran"
                />
              </div>
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
          <Button variant="primary-red">
            <FileDown /> Unduh
          </Button>
        </CardContent>
        <span className="mx-6 font-bold text-muted-foreground">
          Ringkasan Data Penerimaan Biaya Pendidikan
        </span>
        <div className="mx-6 flex flex-col justify-between items-start gap-4">
          <div className="flex justify-start items-start gap-8 w-full">
            {/* Kolom Jenis Pembayaran */}
            <div className="flex flex-col gap-2">
              <span className="font-bold">Jenis Pembayaran</span>
              {rekapitulasiPenerimaanDanaData.map((data) => (
                <span key={data.id}>{data.jenisPembayaran}</span>
              ))}
            </div>

            {/* Kolom Total Dana */}
            <div className="flex flex-col gap-2">
              <span className="font-bold">Total Dana</span>
              {rekapitulasiPenerimaanDanaData.map((data) => {
                // Hitung total semua properti kecuali `id` dan `jenisPembayaran`
                const totalPerJenis = Object.entries(data)
                  .filter(([key]) => key !== "id" && key !== "jenisPembayaran")
                  // @ts-ignore
                  .reduce((sum, [, value]) => sum + value, 0);

                return (
                  <span key={data.id}>
                    Rp {totalPerJenis.toLocaleString("id-ID")}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Kolom Total Dana Terkumpul */}
          <div className="flex flex-col gap-2">
            <span className="font-bold">Total Dana Terkumpul</span>
            <span className="font-bold text-green-600">
              Rp{" "}
              {rekapitulasiPenerimaanDanaData.reduce((acc, data) => {
                // Hitung total keseluruhan
                const totalPerJenis = Object.entries(data)
                  .filter(([key]) => key !== "id" && key !== "jenisPembayaran")
                  // @ts-ignore
                  .reduce((sum, [, value]) => sum + value, 0);

                return acc + totalPerJenis;
              }, 0).toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        <span 
          className="mx-6 font-bold text-muted-foreground mt-4"
        >
          Detail Data
        </span>
        {/* @ts-ignore */}
        <DataTable columns={columns} data={rekapitulasiPenerimaanDanaData} />
      </Card>
    </>
  )
}