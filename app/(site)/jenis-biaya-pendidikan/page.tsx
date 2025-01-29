"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { jenisBiayaPendidikanData } from "@/lib/data";
import { useRouter, useSearchParams } from "next/navigation";
import Filter from "@/components/filter";
import Link from "next/link";
import StatusMessage from "@/components/status-message";

export default function JenisBiayaPendidikanPage() {
  const [nama, setNama] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilter = (e: any) => {
    setIsLoading(true)
    
    e.preventDefault()
    
    const query = new URLSearchParams({
      nama: nama,
    })

    router.push(`/jenis-biaya-pendidikan?${query.toString()}`)

    setIsLoading(false)
  }

  const handleReset = () => {
    setNama('')
    router.push("/jenis-biaya-pendidikan")
  }
  
  return (
    <>
      {searchParams.get('status') === 'add-success' && (
        <StatusMessage 
          message="Data Jenis Biaya Pendidikan Berhasil Ditambahkan"
          backgroundColor="bg-[#DEF7EC]"
          backUrl="/jenis-biaya-pendidikan"
        />
      )}
      {searchParams.get('status') === 'edit-success' && (
        <StatusMessage 
          message="Data Jenis Biaya Pendidikan Berhasil Diperbarui"
          backgroundColor="bg-[#DEF7EC]"
          backUrl="/jenis-biaya-pendidikan"
        />
      )}
      {searchParams.get('status') === 'delete-success' && (
        <StatusMessage 
          message="Data Jenis Biaya Pendidikan Berhasil Dihapus"
          backgroundColor="bg-[#ffecec]"
          backUrl="/jenis-biaya-pendidikan"
        />
      )}
      <Filter>
        <form onSubmit={handleFilter}>
          <CardContent className="flex justify-center items-center gap-4">
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="namaTagihan" className="text-md">Nama Tagihan</Label>
              <div className="w-full relative">
                <Input
                  id="namaTagihan"
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Temukan Nama Tagihan..."
                  disabled={isLoading}
                />
                <Search className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col md:flex-row justify-end gap-4">
            <Button variant="ghost" className="hover:bg-transparent text-[#F5365C] hover:text-[#D12C50] w-full md:w-fit" disabled={isLoading} onClick={handleReset}>
              RESET
            </Button>
            <Button type="submit" variant="primary-red" className="w-full md:w-fit" disabled={isLoading}>
              <Search /> Cari
            </Button>
          </CardFooter>
        </form>
      </Filter>
      <Card className="rounded-lg border md:mx-4 mt-4 shrink-0 flex flex-col gap-4 pt-4">
        <CardContent className="flex justify-end gap-4">
          <Link href={'/jenis-biaya-pendidikan/input'}>
            <Button
              variant="primary-red"
              className="w-full md:w-fit"
            >
              <Plus /> Tambah
            </Button>
          </Link>
        </CardContent>
        <DataTable columns={columns} data={jenisBiayaPendidikanData} />
      </Card>
    </>
  )
}