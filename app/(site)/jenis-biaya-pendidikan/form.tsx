"use client";

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { ArrowLeft, CircleX, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardHeader } from "@/components/ui/card"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, useFormField } from "@/components/ui/form"
import { cn } from "@/lib/utils"

const jenisBiayaPendidikanSchema = z.object({
  nama_tagihan: z.string().min(1, "Nama wajib diisi"),
  waktu_pembayaran: z.enum(["bulanan", "tahunan", "1x"], {
    required_error: "Waktu pembayaran wajib diisi",
  }),
  status_cicilan: z.enum(["ya", "tidak"], {
    required_error: "Status cicilan wajib diisi",
  }),
})

type JenisBiayaPendidikanFormValues = z.infer<typeof jenisBiayaPendidikanSchema>

export default function JenisBiayaPendidikanForm() {
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm<JenisBiayaPendidikanFormValues>({
    resolver: zodResolver(jenisBiayaPendidikanSchema),
    defaultValues: {
      nama_tagihan: "",
      waktu_pembayaran: undefined,
      status_cicilan: undefined,
    },
  })

  function onSubmit(values: JenisBiayaPendidikanFormValues) {
    console.log("Form Values:", values)
    toast.success(`Data jenis biaya pendidikan berhasil ditambahkan ${pathname.includes("edit") ? "diperbarui" : "ditambahkan"}`)
    router.push("/jenis-biaya-pendidikan")
  }

  return (
    <Card className="mx-4 mt-4 px-10 py-4">
      <CardHeader className="px-0">
        <div className="flex flex-row justify-start items-center gap-4">
          <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => router.push("/user")}>
            <ArrowLeft />
          </Button>
          <span className="text-lg font-bold">Formulir Penambahan Data Jenis Biaya Pendidikan</span>
        </div>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-8 mt-4">
            {/* NAMA */}
            <FormField
              control={form.control}
              name="nama_tagihan"
              render={({ field }) => {
                const { error } = useFormField()
                return (
                  <FormItem>
                    <FormLabel 
                      className={cn(
                        error ? "text-destructive": "text-muted-foreground",
                        "text-lg font-bold"
                      )}
                    >
                      Nama Tagihan <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan Nama Tagihan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {/* Waktu Pembayaran */}
            <FormField
              control={form.control}
              name="waktu_pembayaran"
              render={({ field }) => {
                const { error } = useFormField()
                return (
                  <FormItem>
                    <FormLabel 
                      className={cn(
                        error ? "text-destructive": "text-muted-foreground",
                        "text-lg font-bold"
                      )}
                    >
                      Waktu Pembayaran <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Salah Satu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bulanan">Bulanan</SelectItem>
                        <SelectItem value="tahunan">Tahunan</SelectItem>
                        <SelectItem value="1x">1x</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {/* STATUS CICILAN  */}
            <FormField
              control={form.control}
              name="status_cicilan"
              render={({ field }) => {
                const { error } = useFormField()
                return (
                  <FormItem>
                    <FormLabel 
                      className={cn(
                        error ? "text-destructive": "text-muted-foreground",
                        "text-lg font-bold"
                      )}
                    >
                      Status Cicilan <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Salah Satu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ya">Ya</SelectItem>
                        <SelectItem value="tidak">Tidak</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>

          {/* BUTTON SUBMIT */}
          <div className="flex justify-end gap-4">
            <Button type="button" className="mt-6 bg-[#FFC31E] hover:bg-[#E0A900]">
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
