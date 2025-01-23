"use client"

import Filter from "@/components/filter";
import { MonthPicker } from "@/components/month-picker";
import { TrendChart } from "@/components/trend-chart";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserStore } from "@/hooks/use-user";
import { jenisPembayaranSelectOptions } from "@/lib/data";
import { Search } from "lucide-react";
import { useState } from "react";

export default function DashboardPage() {
  const { role } = useUserStore();
  const [jenisPembayaran, setJenisPembayaran] = useState('')
  const [bulanStart, setBulanStart] = useState<Date | undefined>()
  const [bulanEnd, setBulanEnd] = useState<Date | undefined>()
  
  const handleFilter = (e: any) => {
    e.preventDefault()
    console.log('BULAN MULAI', bulanStart)
    console.log('BULAN AKHIR', bulanEnd)
    console.log('JENIS PEMBAYARAN', jenisPembayaran)
  }

  const handleReset = () => {
    setBulanStart(undefined)
    setBulanEnd(undefined)
    setJenisPembayaran('')
  }

  return (
    <>
      {(role === "Bendahara" || role === "Ketua Yayasan") && (
        <Filter>
          <form onSubmit={handleFilter}>
            <CardContent className="flex flex-col md:flex-row justify-center items-center gap-4">
              <div className="w-full flex flex-col space-y-2">
                <Label htmlFor="bulanStart" className="text-md">Bulan dari</Label>
                <MonthPicker
                  value={bulanStart || undefined}
                  onChange={(date) => setBulanStart(date || undefined)}
                  placeholder="Pilih Bulan"
                />
              </div>
              <div className="w-full flex flex-col space-y-2">
                <Label htmlFor="bulanEnd" className="text-md">Sampai Bulan</Label>
                <MonthPicker
                  value={bulanEnd || undefined}
                  onChange={(date) => setBulanEnd(date || undefined)}
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
              <Button 
                variant="ghost"
                className="hover:bg-transparent text-[#F5365C] hover:text-[#D12C50] w-full md:w-fit"
                type="button"
                onClick={handleReset}
              >
                RESET
              </Button>
              <Button type="submit" variant="primary-red" className="w-full md:w-fit">
                <Search /> Cari
              </Button>
            </CardFooter>
          </form>
        </Filter>
      )}
      <Card className='flex flex-auto gap-4 md:mx-4 mt-4 shrink-0'>
        {role === "Administrator" && (
          <div className="flex-1 rounded-xl bg-sidebar justify-center items-center flex py-10">
            <span className="text-2xl font-bold font-secular">
              Selamat Datang {role}
            </span>
          </div>
        )}

        {(role === "Bendahara" || role === "Ketua Yayasan") && (
          <div className="flex flex-col w-full">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Trend Data Ringkasan Jumlah Transaksi
              </CardTitle>
            </CardHeader>

            {/* Menampilkan grafik untuk semua jenis pembayaran */}
            <CardContent className="w-full max-w-96">
              <TrendChart
                paymentType={jenisPembayaran || 'all'}
                dateStart={bulanStart}
                dateEnd={bulanEnd}
              />
            </CardContent>
          </div>
        )}
      </Card>
    </>
  )
}