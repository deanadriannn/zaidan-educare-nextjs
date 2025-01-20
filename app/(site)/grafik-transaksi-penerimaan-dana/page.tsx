"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { jenisPembayaranSelectOptions } from "@/lib/data";
import { DatePicker } from "@/components/date-picker";

export default function StatusPembayaranPage() {
  const [jenisPembayaran, setJenisPembayaran] = useState('')
  const [bulanStart, setBulanStart] = useState<Date | undefined>()
  const [bulanEnd, setBulanEnd] = useState<Date | undefined>()

  const handleFilter = (e: any) => {
    e.preventDefault()
    console.log('Filtering')
    console.log(bulanStart, bulanEnd, jenisPembayaran)
  }
  
  return (
    <>
      <Card className="md:mx-4 mt-4 font-spartan">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Filters</CardTitle>
        </CardHeader>
        <form onSubmit={handleFilter}>
          <CardContent className="flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="nama" className="text-md">Bulan dari</Label>
              <DatePicker
                value={bulanStart || undefined}
                onChange={(date) => setBulanStart(date || undefined)}
                minDate={new Date("1900-01-01")}
                maxDate={new Date()}
                placeholder="Pilih Bulan"
              />
            </div>
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="kelas" className="text-md">Sampai Bulan</Label>
              <DatePicker
                value={bulanEnd || undefined}
                onChange={(date) => setBulanEnd(date || undefined)}
                minDate={new Date("1900-01-01")}
                maxDate={new Date()}
                placeholder="Pilih Bulan"
              />
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
      <Card className="rounded-lg border md:mx-4 mt-4 shrink-0 flex flex-col gap-4 pt-4 font-spartan">
        <CardHeader className="font-bold text-xl">
          Trend Data Ringkasan Jumlah Transaksi
        </CardHeader>
      </Card>
    </>
  )
}