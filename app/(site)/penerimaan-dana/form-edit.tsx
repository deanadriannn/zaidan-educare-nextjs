"use client";

import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { ArrowLeft, CircleX, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, useFormField } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

type tagihanSiswaFormValues = z.infer<typeof penerimaanDanaSchema>

const metodePembayaranContoh = [
  {
    value: "tunai",
    label: "Tunai",
  },
  {
    value: "transfer",
    label: "Transfer",
  }
] as const;

const namaBankContoh = [
  {
    value: "bca",
    label: "BCA",
  },
  {
    value: "bni",
    label: "BNI",
  },
  {
    value: "bri",
    label: "BRI",
  },
  {
    value: "mandiri",
    label: "Mandiri",
  },
  {
    value: "cimb",
    label: "CIMB Niaga",
  },
  {
    value: "maybank",
    label: "Maybank",
  },
  {
    value: "danamon",
    label: "Danamon",
  },
  {
    value: "muamalat",
    label: "Muamalat",
  },
  {
    value: "panin",
    label: "Panin",
  },
  {
    value: "bukopin",
    label: "Bukopin",
  },
  {
    value: "btn",
    label: "BTN",
  },
] as const;

const penerimaanDanaSchema = z.object({
  nominal: z.number({
    required_error: "Nominal wajib diisi",
    invalid_type_error: "Nominal wajib diisi",
  })
  .positive("Nominal tidak boleh negatif atau nol"),
  metodePembayaran: z
  .string({
    required_error: "Metode pembayaran wajib diisi",
  })
  .min(1, "Metode pembayaran wajib diisi"),
  namaBank: z.string().optional(), 
})

export default function PenerimaanDanaForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<tagihanSiswaFormValues>({
    resolver: zodResolver(penerimaanDanaSchema),
    defaultValues: {
      nominal: 1000000,
      metodePembayaran: "transfer",
      namaBank: "bri"
    },
  })

  function onSubmit(values: tagihanSiswaFormValues) {
    setIsLoading(true)
    console.log("Form Values:", values)
    router.push('/penerimaan-dana?status=edit-success')
  }

  return (
    <Card className="md:mx-4 mt-4 px-4 md:px-10 py-4">
      <CardHeader className="px-0">
        <div className="flex flex-row justify-start items-center gap-4">
          <Link href="/penerimaan-dana">
            <ArrowLeft />
          </Link>
          <span 
            className="text-md md:text-lg font-bold"
          >
            Formulir Pengubahan Data Pembayaran Biaya Pendidikan
          </span>
        </div>
      </CardHeader>

      <div className="mt-4 flex gap-8 font-spartan">
        <div className="flex flex-col gap-4">
          <Label className="text-lg font-semibold text-muted-foreground">Nama</Label>
          <Label className="text-lg font-semibold text-muted-foreground">Kelas</Label>
          <Label className="text-lg font-semibold text-muted-foreground">NIS</Label>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-lg text-black">
            John
          </p>
          <p className="text-lg text-black">
            1-A
          </p>
          <p className="text-lg text-black">
            1234445
          </p>
        </div>
        <div className="flex gap-6 ml-10">
          <Label className="text-lg font-semibold text-muted-foreground">Tanggal Transaksi</Label>
          <p className="text-lg text-black">
            9 September 2021
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 font-spartan">
          <div className="mt-8 flex flex-col gap-4 font-spartan mb-2">
            <h1 className="font-bold text-black text-xl">Daftar Transaksi Pembayaran</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              <Label className="text-lg font-semibold text-muted-foreground col-span-1">Jenis Pembayaran</Label>
              <p className="text-lg text-black col-span-1">
                SPP Januari
              </p>
              <div className="md:col-span-2 lg:col-span-4 xl:col-span-6"></div>

              <Label className="text-lg font-semibold text-muted-foreground">Waktu Pembayaran</Label>
              <p className="text-lg text-black">
                1x
              </p>
              <div className="md:col-span-2 lg:col-span-4 xl:col-span-6"></div>

              <Label className="text-lg font-semibold text-muted-foreground">Status Cicilan</Label>
              <p className="text-lg text-black">
                Ya
              </p>
              <div className="md:col-span-2 lg:col-span-4 xl:col-span-6"></div>

              <Label className={cn(
                form.getFieldState("nominal").error ? "text-muted-foreground": "text-muted-foreground",
                "text-lg font-semibold col-span-1"
              )}>Nominal</Label>
              <FormField
                control={form.control}
                name="nominal"
                render={({ field }) => {
                  const { error } = useFormField()
                  return (
                    <FormItem className="flex gap-4 items-center col-span-1">
                      <div>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field}
                            value={field.value || ""} // Untuk mencegah warning controlled/uncontrolled
                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                            className="w-full"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )
                }}
              />
              <div className="md:col-span-2 lg:col-span-4 xl:col-span-6"></div>

              <Label className={cn(
                form.getFieldState("metodePembayaran").error ? "text-muted-foreground": "text-muted-foreground",
                "text-lg font-semibold col-span-1"
              )}>Metode Pembayaran</Label>
              <FormField
                control={form.control}
                name="metodePembayaran"
                render={({ field }) => {
                  const { error } = useFormField()
                  return (
                    <FormItem className="flex gap-4 items-center col-span-1">
                      <div className="w-full">
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih Salah Satu" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {metodePembayaranContoh.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )
                }}
              />
              <div className="md:col-span-2 lg:col-span-4 xl:col-span-6"></div>

              {form.watch("metodePembayaran") === "transfer" && (
                <>
                  <Label className={cn(
                    form.getFieldState("namaBank").error ? "text-muted-foreground": "text-muted-foreground",
                    "text-lg font-semibold col-span-1"
                  )}>Nama Bank</Label>
                  <FormField
                    control={form.control}
                    name="namaBank"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex gap-4 items-center col-span-1">
                          <div className="w-full">
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih Salah Satu" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {namaBankContoh.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )
                    }}
                  />
                </>
              )}
            </div>
          </div>

          {/* BUTTON SUBMIT */}
          <div className="flex justify-end gap-4">
            <Link href={"/penerimaan-dana"}>
              <Button type="button" className="mt-6 bg-[#FFC31E] hover:bg-[#E0A900]" disabled={isLoading}>
                <CircleX className="mr-2" />
                Batal
              </Button>
            </Link>
            <Button type="submit" className="mt-6 bg-[#2C5392] hover:bg-[#233D6E]" disabled={isLoading}>
              <Save className="mr-2" />
              Simpan
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}
