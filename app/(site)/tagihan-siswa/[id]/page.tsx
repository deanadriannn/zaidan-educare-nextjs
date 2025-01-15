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
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table";

type StudentInfo = {
  nama: string;
  kelas: string;
  nis: string;
  tahunMasuk: number;
  namaWali: string;
  hubunganWali: string;
  emailWali: string;
  nomorTeleponWali: string;
};

// Tipe untuk jenis biaya pendidikan
export type PaymentInfo = {
  jenisPembayaran: string;
  waktuPembayaran: string; // Contoh: "Bulanan", "Tahunan", dll.
  statusCicilan: "Ya" | "Tidak"; // true jika "Ya", false jika "Tidak"
  nominal: number; // Nominal biaya dalam angka
};

// Tipe utama untuk siswa dan daftar tagihan
type Student = {
  biodata: StudentInfo;
  daftarTagihan: PaymentInfo[];
};

const columns: ColumnDef<PaymentInfo>[] = [
  {
    accessorKey: "jenisPembayaran",
    header: () => (
      <div className="pl-4">
        <p>Jenis Pembayaran</p>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="pl-4">
          <p>{row.original.jenisPembayaran}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "waktuPembayaran",
    header: "Waktu Pembayaran",
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original.waktuPembayaran}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "statusCicilan",
    header: "Status Cicilan",
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original.statusCicilan}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "nominal",
    header: "Nominal",
    cell: ({ row }) => {
      const nominal = parseFloat(row.getValue("nominal"))
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(nominal)
      return (
        <div>
          <p>{formatted}</p>
        </div>
      )
    },
  },
]

const exampleData: Student = {
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
      statusCicilan: "Tidak",
      nominal: 15000000,
    },
    {
      jenisPembayaran: "SPP",
      waktuPembayaran: "Bulanan",
      statusCicilan: "Ya",
      nominal: 600000,
    },
    {
      jenisPembayaran: "Makan Siang",
      waktuPembayaran: "Bulanan",
      statusCicilan: "Tidak",
      nominal: 200000,
    },
    {
      jenisPembayaran: "Jemputan",
      waktuPembayaran: "Bulanan",
      statusCicilan: "Ya",
      nominal: 150000,
    },
    {
      jenisPembayaran: "Kamping",
      waktuPembayaran: "Tahunan",
      statusCicilan: "Ya",
      nominal: 1500000,
    },
  ],
};

export default function TagihanSiswaPage() {
  const router = useRouter()
  
  return (
    <Card className="md:mx-4 mt-4 px-4 md:px-10 py-4">
      <CardHeader className="px-0">
        <div className="flex flex-row justify-start items-center gap-4">
          <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => router.push("/tagihan-siswa")}>
            <ArrowLeft />
          </Button>
          <span className="text-md md:text-lg font-bold">Informasi Data Tagihan Biaya Pendidikan Setiap Siswa</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 font-spartan px-0">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-2 font-normal text-lg">
          <p className="col-span-1">Nama Siswa</p>
          <p className="col-span-1 lg:col-span-2 xl:col-span-3">{exampleData['biodata'].nama}</p>
          <p className="col-span-1">Kelas</p>
          <p className="col-span-1 lg:col-span-2 xl:col-span-3">{exampleData['biodata'].kelas}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-2 font-normal text-lg mt-2">
          <h1 className="font-extrabold text-xl col-span-2 lg:col-span-3 xl:col-span-4">Biodata Siswa</h1>
          <p className="col-span-1">NIS</p>
          <p className="col-span-1 lg:col-span-2 xl:col-span-3">{exampleData['biodata'].nis}</p>
          <p className="col-span-1">Tahun Masuk</p>
          <p className="col-span-1 lg:col-span-2 xl:col-span-3">{exampleData['biodata'].tahunMasuk}</p>
          <p className="col-span-1">Nama Wali</p>
          <p className="col-span-1 lg:col-span-2 xl:col-span-3">{exampleData['biodata'].namaWali}</p>
          <p className="col-span-1">Hubungan Wali</p>
          <p className="col-span-1 lg:col-span-2 xl:col-span-3">{exampleData['biodata'].hubunganWali}</p>
          <p className="col-span-1">Email Wali</p>
          <p className="col-span-1 lg:col-span-2 xl:col-span-3">{exampleData['biodata'].emailWali}</p>
          <p className="col-span-1">Nomor Telepon Wali</p>
          <p className="col-span-1 lg:col-span-2 xl:col-span-3">{exampleData['biodata'].nomorTeleponWali}</p>
        </div>
        <div className="font-normal text-lg mt-2">
          <h1 className="font-extrabold text-xl mb-2">Daftar Tagihan</h1>
          <DataTable 
            columns={columns} 
            data={exampleData.daftarTagihan} 
            pagination={false} 
            showTotalData={false}
            className="px-0"
          />
        </div>
      </CardContent>
    </Card>
  )
}