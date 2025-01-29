"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { bankData } from "@/lib/data";
import { useRouter, useSearchParams } from "next/navigation";
import Filter from "@/components/filter";
import Link from "next/link";
import StatusMessage from "@/components/status-message";

export default function BankPenerimaTransferPage() {
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

    router.push(`/bank-penerima-transfer?${query.toString()}`)

    setIsLoading(false)
  }

  const handleReset = () => {
    setNama('')
    router.push("/bank-penerima-transfer")
  }
  
  return (
    <>
      {searchParams.get('status') === 'add-success' && (
        <StatusMessage 
          message="Data Bank Penerima Transfer Berhasil Ditambahkan"
          backgroundColor="bg-[#DEF7EC]"
          backUrl="/bank-penerima-transfer"
        />
      )}
      {searchParams.get('status') === 'edit-success' && (
        <StatusMessage 
          message="Data Bank Penerima Transfer Berhasil Diperbarui"
          backgroundColor="bg-[#DEF7EC]"
          backUrl="/bank-penerima-transfer"
        />
      )}
      {searchParams.get('status') === 'delete-success' && (
        <StatusMessage 
          message="Data Bank Penerima Transfer Berhasil Dihapus"
          backgroundColor="bg-[#ffecec]"
          backUrl="/bank-penerima-transfer"
        />
      )}
      <Filter>
        <form onSubmit={handleFilter}>
          <CardContent className="flex justify-center items-center gap-4">
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="nama" className="text-md">Nama Bank</Label>
              <div className="w-full relative">
                <Input
                  id="nama"
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Temukan Nama Bank..."
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
          <Link href="/bank-penerima-transfer/input">
            <Button
              variant="primary-red"
              className="w-full md:w-fit"
            >
              <Plus /> Tambah
            </Button>
          </Link>
        </CardContent>
        <DataTable columns={columns} data={bankData} />
      </Card>
    </>
  )
}