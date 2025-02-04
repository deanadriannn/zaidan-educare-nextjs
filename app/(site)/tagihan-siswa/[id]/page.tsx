"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table";
import { formatToIDR } from "@/lib/utils";
import Link from "next/link";

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
      <div className="text-center">
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
    header: () => (
      <div className="text-center">
        <p>Waktu Pembayaran</p>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <p>{row.original.waktuPembayaran}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "statusCicilan",
    header: () => (
      <div className="text-center">
        <p>Status Cicilan</p>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <p>{row.original.statusCicilan}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "nominal",
    header: () => (
      <div className="text-center">
        <p>Nominal</p>
      </div>
    ),
    cell: ({ row }) => {
      const nominal = parseFloat(row.getValue("nominal"))
      const formatted = formatToIDR(nominal)
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
      statusCicilan: "Ya",
      nominal: 15000000,
    },
    {
      jenisPembayaran: "SPP",
      waktuPembayaran: "Bulanan",
      statusCicilan: "Tidak",
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
      statusCicilan: "Tidak",
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
          <Link href="/tagihan-siswa">
            <ArrowLeft />
          </Link>
          <span className="text-md md:text-lg font-bold">Informasi Data Tagihan Biaya Pendidikan Setiap Siswa</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 font-spartan px-0">
        <div className="flex flex-col gap-4 font-normal text-lg">
          {Object.entries(exampleData['biodata'])
          .filter(([key]) => ['nama', 'kelas'].includes(key))
          .map(([key, value]) => (
            <div key={key} className="flex flex-wrap gap-4 items-center">
              <p className="flex-none w-1/3 font-semibold capitalize">
                {key.replace(/([A-Z])/g, " $1")} {/* Format key menjadi lebih rapi */}
              </p>
              <p className="flex-1">{value}</p>
            </div>
          ))}
          
          <h1 className="font-extrabold text-xl">Biodata Siswa</h1>

          {/* Loop Data */}
          {Object.entries(exampleData['biodata'])
          .filter(([key]) => !['nama', 'kelas'].includes(key))
          .map(([key, value]) => (
            <div key={key} className="flex flex-wrap gap-4 items-center">
              <p className="flex-none w-1/3 font-semibold capitalize">
                {key.replace(/([A-Z])/g, " $1")} {/* Format key menjadi lebih rapi */}
              </p>
              <p className="flex-1">{value}</p>
            </div>
          ))}
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