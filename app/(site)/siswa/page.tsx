"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleArrowUp, FileDown, FileUp, Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { kelasSelectOptions, siswaData } from "@/lib/data";
import { useRouter, useSearchParams } from "next/navigation";
import { ConfirmAlert } from "@/components/confirm-alert";
import { StudentInfo } from "@/types/data";
import { ClassPromotionForm } from "@/components/class-promotion-form";
import { UploadFileDialog } from "@/components/upload-file-dialog";
import Filter from "@/components/filter";
import Link from "next/link";
import StatusMessage from "@/components/status-message";

export default function StudentPage() {
  const [nama, setNama] = useState('')
  const [nis, setNis] = useState('')
  const [kelas, setKelas] = useState('')
  const [selectedStudents, setSelectedStudents] = useState<StudentInfo[]>([])
  const [isPromotionFormOpen, setIsPromotionFormOpen] = useState(false);
  const [isConfirmationAlertOpen, setIsConfirmationAlertOpen] = useState(false);
  const [isDownloadSuccess, setIsDownloadSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilter = (e: any) => {
    setIsLoading(true)

    e.preventDefault()
    const query = new URLSearchParams({
      nama: nama,
      nis: nis,
      kelas: kelas,
    })

    router.push(`/siswa?${query.toString()}`)
    setIsLoading(false)
  }

  const handleReset = () => {
    setNama('')
    setNis('')
    setKelas('all')
    router.push("/siswa")
  }

  const handleNaikKelas = () => {
    console.log("Siswa terpilih: ", selectedStudents)
    const studentsPG = selectedStudents.filter((s) => s.kelas === "PG")
    const studentsTKB = selectedStudents.filter((s) => s.kelas === "TK-B")

    if (studentsPG.length > 0 || studentsTKB.length > 0) {
      setIsPromotionFormOpen(true);
    } else {
      setIsConfirmationAlertOpen(true);
    }
  }

  const handleNaikKelasConfirm = () => {
    console.log("Kenaikan kelas siswa berhasil diproses");
    console.log("Siswa terpilih: ", selectedStudents);
    setIsConfirmationAlertOpen(false);
  }

  const handlePromotionSubmit = (data: StudentInfo[]) => {
    console.log("Data akhir dari form:", data);
    setIsPromotionFormOpen(false);
  };
  
  return (
    <>
      {searchParams.get('status') === 'add-success' && (
        <StatusMessage 
          message="Data Siswa Berhasil Ditambahkan"
          backgroundColor="bg-[#DEF7EC]"
          backUrl="/siswa"
        />
      )}
      {searchParams.get('status') === 'edit-success' && (
        <StatusMessage 
          message="Data Siswa Berhasil Diperbarui"
          backgroundColor="bg-[#DEF7EC]"
          backUrl="/siswa"
        />
      )}
      {searchParams.get('status') === 'upload-success' && (
        <StatusMessage 
          message="Data Siswa Berhasil Ditambahkan Melalui Import Data"
          backgroundColor="bg-[#DEF7EC]"
          backUrl="/siswa"
        />
      )}
      {isDownloadSuccess && (
        <StatusMessage 
          message="Template Import Berhasil Diunduh"
          backgroundColor="bg-[#DEF7EC]"
          handleDelete={() => setIsDownloadSuccess(prev => !prev)}
        />
      )}
      {searchParams.get('status') === 'delete-success' && (
        <StatusMessage 
          message="Data Siswa Berhasil Dihapus"
          backgroundColor="bg-[#ffecec]"
          backUrl="/siswa"
        />
      )}
      <Filter>
        <form onSubmit={handleFilter}>
          <CardContent className="flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="nama" className="text-md">Nama</Label>
              <div className="w-full relative">
                <Input
                  id="nama"
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Temukan Nama..."
                  disabled={isLoading}
                />
                <Search className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2" />
              </div>
            </div>
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="nis" className="text-md">NIS</Label>
              <div className="w-full relative">
                <Input
                  id="nis"
                  type="text"
                  value={nis}
                  onChange={(e) => setNis(e.target.value)}
                  placeholder="Temukan NIS..."
                  disabled={isLoading}
                />
                <Search className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2" />
              </div>
            </div>
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="kelas" className="text-md">Kelas</Label>
              <Select onValueChange={(value) => setKelas(value)} disabled={isLoading} value={kelas}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Kelas" />
                </SelectTrigger>
                <SelectContent>
                  {kelasSelectOptions.map((option) => (
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
              disabled={isLoading}
              onClick={handleReset}
            >
              RESET
            </Button>
            <Button type="submit" variant="primary-red" className="w-full md:w-fit" disabled={isLoading}>
              <Search /> Cari
            </Button>
          </CardFooter>
        </form>
      </Filter>
      <Card className="rounded-lg border md:mx-4 mt-4 shrink-0 flex flex-col gap-4 pt-4">
        <CardContent className="flex flex-col md:flex-row justify-end gap-4">
          <Button variant="primary-red" onClick={handleNaikKelas}>
              <CircleArrowUp /> Naik Kelas
            </Button>
          <Link 
            href="/download/Template Import Data Siswa.xlsx"
            download="Template Import Data Siswa.xlsx"
            onClick={() => setIsDownloadSuccess(true)}
          >
            <Button variant="primary-red">
              <FileDown /> Unduh Template Import
            </Button>
          </Link>
          <UploadFileDialog
            title="Import Data Siswa"
            successUrl="/siswa?status=upload-success"
          >
            <Button variant="primary-red">
              <FileUp /> Impor Data
            </Button>
          </UploadFileDialog>
          <Link href="/siswa/input">
            <Button
              variant="primary-red"
            >
              <Plus /> Tambah
            </Button>
        
          </Link>
        </CardContent>
        <DataTable 
          columns={columns}
          data={siswaData}
          onSelectionChange={(rows) => {
            setSelectedStudents(rows)
          }}
        />
      </Card>
      <ConfirmAlert
        title="Kenaikan Kelas"
        description="Apakah Anda yakin akan memproses kenaikan kelas siswa?"
        open={isConfirmationAlertOpen}
        onOpenChange={setIsConfirmationAlertOpen}
        handleAction={handleNaikKelasConfirm}
      />
      <ClassPromotionForm
        open={isPromotionFormOpen}
        onOpenChange={setIsPromotionFormOpen}
        selectedStudents={selectedStudents}
        handleAction={handlePromotionSubmit}
      />
    </>
  )
}