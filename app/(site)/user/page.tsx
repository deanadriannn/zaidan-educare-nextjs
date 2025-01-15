"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { User } from "@/types/data";
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

const data: User[] = [
  {
    id: '1',
    username: 'johndoe',
    nama: 'John Doe',
    role: 'Ketua Yayasan'
  },
  {
    id: '2',
    username: 'janedoe',
    nama: 'Jane Doe',
    role: 'Bendahara'
  },
  {
    id: '3',
    username: 'johndoejr',
    nama: 'John Doe Jr.',
    role: 'Administrator'
  }
]

export default function UserPage() {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')


  const handleFilter = (e: any) => {
    e.preventDefault()
    console.log('Filtering')
    console.log(name, role)
  }
  
  return (
    <>
      <Card className="mx-4 mt-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Filters</CardTitle>
        </CardHeader>
        <form onSubmit={handleFilter}>
          <CardContent className="flex justify-center items-center gap-4">
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
              <Label htmlFor="role" className="text-md">Role</Label>
              <Select onValueChange={(value) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ketua_yayasan">Ketua Yayasan</SelectItem>
                  <SelectItem value="bendahara">Bendahara</SelectItem>
                  <SelectItem value="administrator">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full flex flex-col space-y-2">
             
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button variant="ghost" className="hover:bg-transparent text-[#F5365C] hover:text-[#D12C50]">
              RESET
            </Button>
            <Button type="submit" variant="primary-red">
              <Search /> Cari
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Card className="rounded-lg border mx-4 mt-4 shrink-0 flex flex-col gap-4 px-4 pt-4 min-h-[50vh]">
        <div className="flex justify-end gap-4">
          <Button 
            onClick={() => window.location.href = '/user/input'}
            variant="primary-red"
          >
            <Plus /> Tambah
          </Button>
        </div>
        {/* <DataTable columns={columns} data={data} /> */}
        <DataTable columns={columns} data={data} />
      </Card>
    </>
  )
}