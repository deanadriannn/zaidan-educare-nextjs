"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleArrowUp, FileDown, FileUp, Plus, Search, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { kelasSelectOptions, siswaData } from "@/lib/data";
import { useRouter } from "next/navigation";
import { ConfirmAlert } from "@/components/confirm-alert";
import { StudentInfo } from "@/types/data";
import { ClassPromotionForm } from "@/components/class-promotion-form";
import { UploadFileDialog } from "@/components/upload-file-dialog";

export default function StudentPage() {
  const [name, setName] = useState('')
  const [nis, setNis] = useState('')
  const [kelas, setKelas] = useState('')
  const router = useRouter()
  const [selectedStudents, setSelectedStudents] = useState<StudentInfo[]>([])
  const [isPromotionFormOpen, setIsPromotionFormOpen] = useState(false);

  const handleFilter = (e: any) => {
    e.preventDefault()
    console.log('Filtering')
    console.log(name, nis, kelas)
  }

  const handleNaikKelas = () => {
    console.log("Siswa terpilih: ", selectedStudents)
    setIsPromotionFormOpen(true);
  }

  const handlePromotionSubmit = (data: StudentInfo[]) => {
    console.log("Data akhir dari form:", data);
    setIsPromotionFormOpen(false);
  };
  
  return (
    <>
      <Card className="md:mx-4 mt-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Kata Kunci Pencarian</CardTitle>
        </CardHeader>
        <form onSubmit={handleFilter}>
          <CardContent className="flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="nama" className="text-md">Nama</Label>
              <div className="w-full relative">
                <Input
                  id="nama"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Temukan Nama..."
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
                />
                <Search className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2" />
              </div>
            </div>
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="kelas" className="text-md">Kelas</Label>
              <Select onValueChange={(value) => setKelas(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kelas" />
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
            <Button variant="ghost" className="hover:bg-transparent text-[#F5365C] hover:text-[#D12C50] w-full md:w-fit">
              RESET
            </Button>
            <Button type="submit" variant="primary-red" className="w-full md:w-fit">
              <Search /> Cari
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Card className="rounded-lg border md:mx-4 mt-4 shrink-0 flex flex-col gap-4 pt-4">
        <CardContent className="flex flex-col md:flex-row justify-end gap-4">
          <ConfirmAlert
            title="Kenaikan Kelas"
            description="Apakah Anda yakin akan memproses kenaikan kelas siswa?"
            handleAction={handleNaikKelas}
          >
            <Button variant="primary-red">
              <CircleArrowUp /> Naik Kelas
            </Button>
          </ConfirmAlert>
          <Button variant="primary-red">
            <FileDown /> Unduh Template Import
          </Button>
          <UploadFileDialog
            title="Import Data Siswa"
          >
            <Button variant="primary-red">
              <FileUp /> Impor Data
            </Button>
          </UploadFileDialog>
          <Button 
            onClick={() => router.push('/siswa/input')}
            variant="primary-red"
          >
            <Plus /> Tambah
          </Button>
        </CardContent>
        <DataTable 
          columns={columns}
          data={siswaData}
          onSelectionChange={(rows) => {
            setSelectedStudents(rows)
          }}
        />
      </Card>
      <ClassPromotionForm
        open={isPromotionFormOpen}
        onOpenChange={setIsPromotionFormOpen}
        selectedStudents={selectedStudents}
        handleAction={handlePromotionSubmit}
      />
    </>
  )
}