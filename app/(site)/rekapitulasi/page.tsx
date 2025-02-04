"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileDown, Search } from "lucide-react";
import { rekapitulasiPenerimaanDanaData } from "@/lib/data";
import Filter from "@/components/filter";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const FilterSchema = z.object({
  tahunAjaranStart: z
  .string()
  .regex(/^\d{4}$/, "Tahun harus 4 digit angka"),
  tahunAjaranEnd: z
  .string()
  .regex(/^\d{4}$/, "Tahun harus 4 digit angka"),
});

export default function RekapitulasiPenerimaanDanaPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm<z.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      tahunAjaranStart: "",
      tahunAjaranEnd: "",
    }
  });

  useEffect(() => {
    const start = searchParams.get("tahunAjaranStart")
    const end   = searchParams.get("tahunAjaranEnd")

    if (start && end) {
      // @ts-ignore
      setData(rekapitulasiPenerimaanDanaData)
    } else {
      setData([])
    }
  }, [searchParams])

  const handleFilter = (values: z.infer<typeof FilterSchema>) => {
    setIsLoading(true)

    const startNum = parseInt(values.tahunAjaranStart, 10) || 0
    const endNum = parseInt(values.tahunAjaranEnd, 10) || 0

    const query = new URLSearchParams({
      tahunAjaranStart: startNum.toString(),
      tahunAjaranEnd: endNum.toString(),
    })

    router.push(`/rekapitulasi?${query.toString()}`)

    setIsLoading(false)
  }

  const handleReset = () => {
    form.reset()
    setData([])
    router.push("/rekapitulasi")
  }
  
  return (
    <>
      <Filter>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFilter)}>
            <CardContent className="flex flex-col md:flex-row justify-center items-center gap-4">
              <div className="w-full flex flex-col space-y-2">
                <Label htmlFor="tahunAjaranStart" className="text-md">
                  Tahun Ajaran <span className="text-destructive">*</span>
                </Label>
                <div className="w-full flex gap-4 items-center">
                  <FormField
                    control={form.control}
                    name="tahunAjaranStart"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Masukkan Tahun Ajaran"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <p>/</p>
                  <FormField
                    control={form.control}
                    name="tahunAjaranEnd"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            id="tahunAjaranStart"
                            type="text"
                            placeholder="Masukkan Tahun Ajaran"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
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
        </Form>
      </Filter>
      <Card className="rounded-lg border md:mx-4 mt-4 shrink-0 flex flex-col gap-4 pt-4">
        <CardContent className="flex justify-end gap-4">
          <Link
            href="/download/Data Unduh Rekapitulasi Biaya Pendidikan.xlsx"
            download="Data Unduh Rekapitulasi Biaya Pendidikan.xlsx"
          >
            <Button variant="primary-red">
              <FileDown /> Unduh
            </Button>
          </Link>
        </CardContent>
        <span className="mx-6 font-bold text-muted-foreground">
          Ringkasan Data Penerimaan Biaya Pendidikan
        </span>
        <div className="mx-6 flex flex-col justify-between items-start gap-4">
          <div className="flex justify-start items-start gap-8 w-full">
            {/* Kolom Jenis Pembayaran */}
            <div className="flex flex-col gap-2">
              {/* <span className="font-bold">Jenis Pembayaran</span> */}
              <span>Total Dana Terkumpul</span>
              {rekapitulasiPenerimaanDanaData.map((data) => (
                <span key={data.id}>{data.jenisPembayaran}</span>
              ))}
            </div>

            {/* Kolom Total Dana */}
            <div className="flex flex-col gap-2">
              <span className="">
                Rp{" "}
                {(searchParams.get("tahunAjaranStart") && searchParams.get("tahunAjaranEnd")) ? (
                  rekapitulasiPenerimaanDanaData.reduce((acc, data) => {
                    // Hitung total keseluruhan
                    const totalPerJenis = Object.entries(data)
                      .filter(([key]) => key !== "id" && key !== "jenisPembayaran")
                      // @ts-ignore
                      .reduce((sum, [, value]) => sum + value, 0);

                    return acc + totalPerJenis;
                  }, 0).toLocaleString("id-ID")
                ): (
                  "0"
                )}
              </span>
              {/* <span className="font-bold">Total Dana</span> */}
              {rekapitulasiPenerimaanDanaData.map((data) => {
                // Hitung total semua properti kecuali `id` dan `jenisPembayaran`
                const totalPerJenis = Object.entries(data)
                  .filter(([key]) => key !== "id" && key !== "jenisPembayaran")
                  // @ts-ignore
                  .reduce((sum, [, value]) => sum + value, 0);

                return (
                  <span key={data.id}>
                    {(searchParams.get("tahunAjaranStart") && searchParams.get("tahunAjaranEnd")) ? (
                      `Rp ${totalPerJenis.toLocaleString("id-ID")}`
                    ): (
                      "Rp 0"
                    )}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Kolom Total Dana Terkumpul */}
          {/* <div className="flex flex-col gap-2">
            <span className="font-bold">Total Dana Terkumpul</span>
            <span className="font-bold text-green-600">
              Rp{" "}
              {(searchParams.get("tahunAjaranStart") && searchParams.get("tahunAjaranEnd")) ? (
                rekapitulasiPenerimaanDanaData.reduce((acc, data) => {
                  // Hitung total keseluruhan
                  const totalPerJenis = Object.entries(data)
                    .filter(([key]) => key !== "id" && key !== "jenisPembayaran")
                    // @ts-ignore
                    .reduce((sum, [, value]) => sum + value, 0);

                  return acc + totalPerJenis;
                }, 0).toLocaleString("id-ID")
              ): (
                "0"
              )}
            </span>
          </div> */}
        </div>

        <span 
          className="mx-6 font-bold text-muted-foreground mt-4"
        >
          Detail Data
        </span>
        {/* @ts-ignore */}
        <DataTable columns={columns} data={data} />
      </Card>
    </>
  )
}