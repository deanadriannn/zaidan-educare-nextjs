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
import { useRouter } from "next/navigation";
import Filter from "@/components/filter";

export default function BankPenerimaTransferPage() {
  const [name, setName] = useState('')
  const router = useRouter()

  const handleFilter = (e: any) => {
    e.preventDefault()
    console.log('Filtering')
    console.log(name)
  }
  
  return (
    <>
      <Filter>
        <form onSubmit={handleFilter}>
          <CardContent className="flex justify-center items-center gap-4">
            <div className="w-full flex flex-col space-y-2">
              <Label htmlFor="nama" className="text-md">Nama Bank</Label>
              <div className="w-full relative">
                <Input
                  id="nama"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Temukan Nama Bank..."
                />
                <Search className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2" />
              </div>
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
      <Card className="rounded-lg border md:mx-4 mt-4 shrink-0 flex flex-col gap-4 pt-4">
        <CardContent className="flex justify-end gap-4">
          <Button 
            onClick={() => router.push('/bank-penerima-transfer/input')}
            variant="primary-red"
            className="w-full md:w-fit"
          >
            <Plus /> Tambah
          </Button>
        </CardContent>
        <DataTable columns={columns} data={bankData} />
      </Card>
    </>
  )
}