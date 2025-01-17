"use client";

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { ArrowLeft, CalendarIcon, Check, ChevronsUpDown, CircleX, Minus, Plus, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, useFormField } from "@/components/ui/form"
import { cn, formatToIDR } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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
    required_error: "Nominal harus diisi",
    invalid_type_error: "Nominal harus berupa angka",
  })
  .positive("Nominal tidak boleh negatif atau nol"),
  metodePembayaran: z
  .string({
    required_error: "Metode pembayaran harus diisi",
  })
  .min(1, "Metode pembayaran harus diisi"),
  namaBank: z.string().optional(), 
})

export default function PenerimaanDanaForm() {
  const router = useRouter()

  const form = useForm<tagihanSiswaFormValues>({
    resolver: zodResolver(penerimaanDanaSchema),
    defaultValues: {
      metodePembayaran: "",
      namaBank: ""
    },
  })

  function onSubmit(values: tagihanSiswaFormValues) {
    console.log("Form Values:", values)
    toast.success("Data traksaksi pembayaran biaya pendidikan berhasil diperbarui")
    router.push("/penerimaan-dana")
  }

  return (
    <Card className="md:mx-4 mt-4 px-4 md:px-10 py-4">
      <CardHeader className="px-0">
        <div className="flex flex-row justify-start items-center gap-4">
          <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => router.push("/penerimaan-dana")}>
            <ArrowLeft />
          </Button>
          <span 
            className="text-md md:text-lg font-bold"
          >
            Formulir Pengubahan Data Pembayaran Biaya Pendidikan
          </span>
        </div>
      </CardHeader>

      <div className="mt-4 flex flex-col gap-4 font-spartan">
        {/* NAMA SISWA */}
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-10">
          <Label className="text-lg font-semibold text-muted-foreground col-span-1 md:col-span-3">Nama</Label>
          <p className="text-lg text-black col-span-1 md:col-span-3 lg:col-span-7">
            John
          </p>
        </div>

        {/* KELAS SISWA */}
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-10">
          <Label className="text-lg font-semibold text-muted-foreground col-span-1 md:col-span-3">Kelas</Label>
          <p className="text-lg text-black col-span-1 md:col-span-3 lg:col-span-7">
            1-A
          </p>
        </div>

        {/* NIS SISWA */}
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-10">
          <Label className="text-lg font-semibold text-muted-foreground col-span-1 md:col-span-3">NIS</Label>
          <p className="text-lg text-black col-span-1 md:col-span-3 lg:col-span-7">
            1234445
          </p>
        </div>

        {/* TANGGAL TRANSAKSI */}
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-10">
          <Label className="text-lg font-semibold text-muted-foreground col-span-1 md:col-span-3">Tanggal Transaksi</Label>
          <p className="text-lg text-black col-span-1 md:col-span-3 lg:col-span-7">
            9 September 2021
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 font-spartan">
        <h1 className="font-bold text-black text-xl">Daftar Transaksi Pembayaran</h1>

        {/* JENIS PEMBAYARAN */}
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-10">
          <Label className="text-lg font-semibold text-muted-foreground col-span-1 md:col-span-3">Jenis Pembayaran</Label>
          <p className="text-lg text-black col-span-1 md:col-span-3 lg:col-span-7">
            SPP Januari
          </p>
        </div>

        {/* WAKTU PEMBAYARAN */}
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-10">
          <Label className="text-lg font-semibold text-muted-foreground col-span-1 md:col-span-3">Waktu Pembayaran</Label>
          <p className="text-lg text-black col-span-1 md:col-span-3 lg:col-span-7">
            1x
          </p>
        </div>

        {/* STATUS CICILAN */}
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-10">
          <Label className="text-lg font-semibold text-muted-foreground col-span-1 md:col-span-3">Status Cicilan</Label>
          <p className="text-lg text-black col-span-1 md:col-span-3 lg:col-span-7">
            Ya
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 font-spartan mt-4">
          <FormField
            control={form.control}
            name="nominal"
            render={({ field }) => {
              const { error } = useFormField()
              return (
                <FormItem className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-10 items-center">
                  <FormLabel 
                    className={cn(
                      error ? "text-destructive": "text-muted-foreground",
                      "text-lg font-semibold col-span-1 md:col-span-3"
                    )}
                  >
                    Nominal
                  </FormLabel>
                  <div className="col-span-1 md:col-span-3">
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        value={field.value || ""} // Untuk mencegah warning controlled/uncontrolled
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name="metodePembayaran"
            render={({ field }) => {
              const { error } = useFormField()
              return (
                <FormItem className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-10 items-center">
                  <FormLabel 
                    className={cn(
                      error ? "text-destructive": "text-muted-foreground",
                      "text-lg font-semibold col-span-1 md:col-span-3"
                    )}
                  >
                    Metode Pembayaran
                  </FormLabel>
                  <div className="col-span-1 md:col-span-3">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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

          {form.watch("metodePembayaran") === "transfer" && (
            <FormField
              control={form.control}
              name="namaBank"
              render={({ field }) => {
                const { error } = useFormField()
                return (
                  <FormItem className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-10 items-center">
                    <FormLabel 
                      className={cn(
                        error ? "text-destructive": "text-muted-foreground",
                        "text-lg font-semibold col-span-1 md:col-span-3"
                      )}
                    >
                      Nama Bank
                    </FormLabel>
                    <div className="col-span-1 md:col-span-3">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          )}

          {/* BUTTON SUBMIT */}
          <div className="flex justify-end gap-4">
            <Button type="button" className="mt-6 bg-[#FFC31E] hover:bg-[#E0A900]" onClick={() => router.push("/penerimaan-dana")}>
              <CircleX className="mr-2" />
              Batal
            </Button>
            <Button type="submit" className="mt-6 bg-[#2C5392] hover:bg-[#233D6E]">
              <Save className="mr-2" />
              Simpan
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}
