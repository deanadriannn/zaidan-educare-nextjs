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

const bankPenerimaTransferSchema = z.object({
  namaBank: z.string().min(1, "Nama bank wajib diisi"),
  nomorRekening: z.string().min(1, "Nomor rekening wajib diisi"),
  namaPemilikRekening: z.string().min(1, "Nama pemilik rekening wajib diisi"),
})

type BankPenerimaTransferFormValues = z.infer<typeof bankPenerimaTransferSchema>

export default function BankPenerimaTransferForm() {
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm<BankPenerimaTransferFormValues>({
    resolver: zodResolver(bankPenerimaTransferSchema),
    defaultValues: {
      namaBank: "",
      nomorRekening: "",
      namaPemilikRekening: "",
    },
  })

  function onSubmit(values: BankPenerimaTransferFormValues) {
    console.log("Form Values:", values)
    toast.success(`Data bank penerima transfer berhasil ${pathname.includes("edit") ? "diperbarui" : "ditambahkan"}`)
    router.push("/bank-penerima-transfer")
  }

  return (
    <Card className="md:mx-4 mt-4 px-10 py-4">
      <CardHeader className="px-0">
        <div className="flex flex-row justify-start items-center gap-4">
          <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => router.push("/bank-penerima-transfer")}>
            <ArrowLeft />
          </Button>
          <span className="text-md md:text-lg font-bold">{`Formulir ${pathname.includes("edit") ? "Pengubahan" : "Penambahan"} Data Bank Penerima Transfer`}</span>
        </div>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-8 mt-4">
            {/* NAMA BANK */}
            <FormField
              control={form.control}
              name="namaBank"
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
                      Nama Bank <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan Nama Bank" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {/* NOMOR REKENING */}
            <FormField
              control={form.control}
              name="nomorRekening"
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
                      Nomor Rekening <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan Nomor Rekening" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {/* NAMA PEMILIK REKENING */}
            <FormField
              control={form.control}
              name="namaPemilikRekening"
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
                      Nama Pemilik Rekening <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan Nama Pemilik Rekening" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            
          </div>

          {/* BUTTON SUBMIT */}
          <div className="flex justify-end gap-4">
            <Button type="button" className="mt-6 bg-[#FFC31E] hover:bg-[#E0A900]" onClick={() => router.push("/bank-penerima-transfer")}>
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
