"use client"

import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle,
} from "./ui/alert-dialog"
import { CircleCheck, CircleX } from "lucide-react"
import { StudentInfo } from "@/types/data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useState, useEffect } from "react"

export function ClassPromotionForm ({
  open,
  onOpenChange,
  selectedStudents,
  handleAction
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedStudents: StudentInfo[]
  handleAction: (data: StudentInfo[]) => void
}) {
  const [data, setData] = useState<StudentInfo[]>([])

  useEffect(() => {
    setData(selectedStudents.map((s) => ({ ...s, lanjut: "" })))
  }, [selectedStudents])
  
  const studentsPG = data.filter((s) => s.kelas === "PG")
  const studentsTKB = data.filter((s) => s.kelas === "TK-B")

  function handleSelectChange(studentId: string, value: string) {
    setData((prev) =>
      prev.map((item) =>
        item.id === studentId ? { ...item, lanjut: value } : item
      )
    )
  }

  function onSubmit() {
    handleAction(data)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-5xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Kenaikan Kelas</AlertDialogTitle>
          <AlertDialogDescription>
            Anda akan memproses kenaikan kelas atau meluluskan siswa.
            <br />
            Total Siswa: {data.length}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* TABLE UNTUK PG */}
        {studentsPG.length > 0 && (
          <div className="mt-4">
            <h2 className="font-semibold text-md mb-2">
              Kelulusan Siswa Play Ground (PG)
            </h2>
            <table className="w-full border text-left text-sm">
              <thead>
                <tr className="bg-gray-50 text-sm font-semibold border-b">
                  <th className="p-2 text-center">NIS</th>
                  <th className="p-2 text-center">Nama Siswa</th>
                  <th className="p-2 text-center">Jenis Kelamin</th>
                  <th className="p-2 text-center">Status Kelulusan</th>
                  <th className="p-2 text-center">Apakah akan lanjut kelas TK-A di sekolah Zaidan?</th>
                </tr>
              </thead>
              <tbody>
                {studentsPG.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="p-2 text-center">{student.nis}</td>
                    <td className="p-2">{student.nama}</td>
                    <td className="p-2 text-center">{student.jenisKelamin}</td>
                    <td className="p-2 text-center">Lulus</td>
                    <td className="p-2">
                      <Select
                        value={student.lanjut || ""}
                        onValueChange={(val) => handleSelectChange(student.id, val)}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Pilih Salah Satu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ya">Ya</SelectItem>
                          <SelectItem value="Tidak">Tidak</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TABLE UNTUK TK-B */}
        {studentsTKB.length > 0 && (
          <div className="mt-6">
            <h2 className="font-semibold text-md mb-2">
              Kelulusan Siswa TK-B
            </h2>
            <table className="w-full border text-left text-sm">
              <thead>
                <tr className="bg-gray-50 text-sm font-semibold border-b">
                  <th className="p-2 text-center">NIS</th>
                  <th className="p-2 text-center">Nama Siswa</th>
                  <th className="p-2 text-center">Jenis Kelamin</th>
                  <th className="p-2 text-center">Status Kelulusan</th>
                  <th className="p-2 text-center">Apakah akan lanjut kelas 1 di sekolah Zaidan?</th>
                </tr>
              </thead>
              <tbody>
                {studentsTKB.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="p-2 text-center">{student.nis}</td>
                    <td className="p-2">{student.nama}</td>
                    <td className="p-2 text-center">{student.jenisKelamin}</td>
                    <td className="p-2 text-center">Lulus</td>
                    <td className="p-2">
                      <Select
                        value={student.lanjut || ""}
                        onValueChange={(val) => handleSelectChange(student.id, val)}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Pilih Salah Satu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ya">Ya</SelectItem>
                          <SelectItem value="Tidak">Tidak</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <AlertDialogFooter className="flex justify-end mt-6 gap-4">
          <AlertDialogCancel className="bg-[#FFC31E] hover:bg-[#E0A900] text-white hover:text-white">
            <CircleX className="mr-1" /> Batal
          </AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit} className="bg-[#2C5392] hover:bg-[#233D6E] text-white">
            <CircleCheck className="mr-1" /> Simpan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}