"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, FileDown, Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { jenisPembayaranSelectOptions, kelasSelectOptions, statusPembayaranData, tagihanSiswaData } from "@/lib/data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function StatusPembayaranPage() {
  const [name, setName] = useState('')
  const [kelas, setKelas] = useState('')
  const [jenisPembayaran, setJenisPembayaran] = useState('')
  const [bulanStart, setBulanStart] = useState<Date | undefined>()
  const [bulanEnd, setBulanEnd] = useState<Date | undefined>()

  const handleFilter = (e: any) => {
    e.preventDefault()
    console.log('Filtering')
    console.log(name, kelas, jenisPembayaran)
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !bulanStart && "text-muted-foreground"
                    )}
                  >
                    {bulanStart ? (
                      format(bulanStart, "PPP")
                    ) : (
                      <span>Tanggal</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={bulanStart}
                    onSelect={(date) => setBulanStart(date)}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="kelas" className="text-md">Sampai Bulan</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !bulanEnd && "text-muted-foreground"
                    )}
                  >
                    {bulanEnd ? (
                      format(bulanEnd, "PPP")
                    ) : (
                      <span>Tanggal</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={bulanEnd}
                    onSelect={(date) => setBulanEnd(date)}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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