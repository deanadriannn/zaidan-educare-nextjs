"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation";

const exampleData: any = {
  biodata: {
    nama: "Rizki Anugrah",
    kelas: "3-B",
    nis: "13152089",
    tahunMasuk: 2020,
    namaWali: "Dandi",
    hubunganWali: "Ayah Kandung",
    emailWali: "dandi71@gmail.com",
    nomorTeleponWali: "087261438139",
  },
  daftarTagihan: [
    {
      jenisPembayaran: "DPP",
      waktuPembayaran: "1x",
      statusCicilan: true,
      nominal: 15000000,
    },
    {
      jenisPembayaran: "SPP",
      waktuPembayaran: "Bulanan",
      statusCicilan: false,
      nominal: 600000,
    },
    {
      jenisPembayaran: "Makan Siang",
      waktuPembayaran: "Bulanan",
      statusCicilan: false,
      nominal: 200000,
    },
    {
      jenisPembayaran: "Jemputan",
      waktuPembayaran: "Bulanan",
      statusCicilan: false,
      nominal: 150000,
    },
    {
      jenisPembayaran: "Kamping",
      waktuPembayaran: "Tahunan",
      statusCicilan: true,
      nominal: 1500000,
    },
  ],
};

export default function TagihanSiswaPage() {
  const router = useRouter()
  
  return (
    <Card className="mx-4 mt-4 px-10 py-4">
      <CardHeader className="px-0">
        <div className="flex flex-row justify-start items-center gap-4">
          <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => router.push("/tagihan-siswa")}>
            <ArrowLeft />
          </Button>
          <span className="text-lg font-bold">Informasi Data Tagihan Biaya Pendidikan Setiap Siswa</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-0 font-spartan">
        <div className="grid grid-cols-6 gap-y-2 font-normal text-lg">
          <p className="col-span-1">Nama Siswa</p>
          <p className="col-span-5">{exampleData['biodata'].nama}</p>
          <p className="col-span-1">Kelas</p>
          <p className="col-span-5">{exampleData['biodata'].kelas}</p>
        </div>
        <div className="grid grid-cols-6 gap-y-2 font-normal text-lg mt-2">
          <h1 className="font-extrabold text-xl col-span-6">Biodata Siswa</h1>
          <p className="col-span-1">NIS</p>
          <p className="col-span-5">{exampleData['biodata'].nis}</p>
          <p className="col-span-1">Tahun Masuk</p>
          <p className="col-span-5">{exampleData['biodata'].tahunMasuk}</p>
          <p className="col-span-1">Nama Wali</p>
          <p className="col-span-5">{exampleData['biodata'].namaWali}</p>
          <p className="col-span-1">Hubungan Wali</p>
          <p className="col-span-5">{exampleData['biodata'].hubunganWali}</p>
          <p className="col-span-1">Email Wali</p>
          <p className="col-span-5">{exampleData['biodata'].emailWali}</p>
          <p className="col-span-1">Nomor Telepon Wali</p>
          <p className="col-span-5">{exampleData['biodata'].nomorTeleponWali}</p>
        </div>
        <div className="grid grid-cols-6 gap-y-2 font-normal text-lg mt-2">
          <h1 className="font-extrabold text-xl col-span-6">Daftar Tagihan</h1>
          
        </div>
      </CardContent>
    </Card>
  )
}