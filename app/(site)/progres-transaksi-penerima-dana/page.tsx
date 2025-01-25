"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Filter from "@/components/filter";
import { Input } from "@/components/ui/input";
import { MonthPicker } from "@/components/month-picker";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title as ChartTitle
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { columns } from "./columns"
import { DataTable } from "@/components/data-table";

ChartJS.register(ArcElement, Tooltip, Legend, ChartTitle);

export default function StatusPembayaranPage() {
  const [tahunAjaranStart, setTahunAjaranStart] = useState("")
  const [tahunAjaranEnd, setTahunAjaranEnd] = useState("")
  const [bulan, setBulan] = useState<Date | undefined>()

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
    console.log('TAHUN AJARAN MULAI', tahunAjaranStart)
    console.log('TAHUN AJARAN AKHIR', tahunAjaranEnd)
    console.log('BULAN', bulan)
  }

  const data = [
    {
      id: '1',
      title: 'SPP',
      labels: ["Sisa 33%", "Terbayar 67%"],
      datasets: [
        {
          data: [33, 67],
          backgroundColor: ["#FF8C66", "#167ABC"],
        },
      ]
    },
    {
      id: '2',
      title: 'Makan Siang',
      labels: ["Sisa 27%", "Terbayar 73%"],
      datasets: [
        {
          data: [27, 73],
          backgroundColor: ["#FF8C66", "#167ABC"],
        },
      ]
    },
    {
      id: '3',
      title: 'Jemputan',
      labels: ["Sisa 25%", "Terbayar 75%"],
      datasets: [
        {
          data: [25, 75],
          backgroundColor: ["#FF8C66", "#167ABC"],
        },
      ]
    },
    {
      id: '4',
      title: 'Program',
      labels: ["Sisa 22%", "Terbayar 78%"],
      datasets: [
        {
          data: [22, 78],
          backgroundColor: ["#FF8C66", "#167ABC"],
        },
      ]
    },
    {
      id: '5',
      title: 'DPP',
      labels: ["Sisa 56%", "Terbayar 44%"],
      datasets: [
        {
          data: [56, 44],
          backgroundColor: ["#FF8C66", "#167ABC"],
        },
      ]
    }
  ]

  const dataTable = [
    {
      jenisPembayaran: 'SPP',
      totalNominalTagihan: 54000000,
      totalNominalTerbayar: 36000000,
      totalSisaTagihan: 18000000
    },
    {
      jenisPembayaran: 'Makan Siang',
      totalNominalTagihan: 15000000,
      totalNominalTerbayar: 11000000,
      totalSisaTagihan: 4000000
    },
    {
      jenisPembayaran: 'Jemputan',
      totalNominalTagihan: 9000000,
      totalNominalTerbayar: 6750000,
      totalSisaTagihan: 2250000
    },
    {
      jenisPembayaran: 'Program',
      totalNominalTagihan: 135000000,
      totalNominalTerbayar: 105000000,
      totalSisaTagihan: 30000000
    },
    {
      jenisPembayaran: 'DPP',
      totalNominalTagihan: 1350000,
      totalNominalTerbayar: 600000000,
      totalSisaTagihan: 750000000
    },
  ]

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
    },
  };
  
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
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="bulan" className="text-md">Bulan</Label>
              <MonthPicker
                value={bulan || undefined}
                onChange={(date) => setBulan(date || undefined)}
                placeholder="Pilih Bulan"
              />
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
      <Card className="rounded-lg border md:mx-4 mt-4 shrink-0 flex flex-col gap-4 pt-4 font-spartan">
        <CardHeader className="font-bold text-xl">
          <CardTitle className="">Progres Pembayaran Bulan November 2024</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6 text-center place-items-center ">
            {data.slice(0,3).map(item => (
              <div key={item.id} className="min-w-[200px] max-w-[300px] ">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <Pie data={item} options={pieOptions} />
              </div>
            ))}
          </div>
          <h1 className="font-bold text-xl mt-16 ">
            Progres Pembayaran DPP dan Program Tahun Ajar 2024/2025 s.d. Bulan November 2024
          </h1>
          <div className="grid grid-cols-3 gap-6 text-center place-items-center ">
            {data.slice(3,5).map(item => (
              <div key={item.id} className="min-w-[200px] max-w-[300px] ">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <Pie data={item} options={pieOptions} />
              </div>
            ))}
          </div>
          <h1 className="font-bold text-xl mt-16">
            Ringkasan Progres Pembayaran
          </h1>
        </CardContent>
        <DataTable columns={columns} data={dataTable} />
      </Card>
    </>
  )
}