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
import Link from "next/link";

const jenisBiayaPendidikanSchema = z.object({
  namaTagihan: z.string().min(1, "Nama tagihan wajib diisi"),
  waktuPembayaran: z.string().min(1, "Waktu pembayaran wajib diisi"),
  statusCicilan: z.string().min(1, "Status cicilan wajib diisi"),
})

type JenisBiayaPendidikanFormValues = z.infer<typeof jenisBiayaPendidikanSchema>

export default function JenisBiayaPendidikanForm() {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)

  const isEdit = pathname.includes("edit")

  const form = useForm<JenisBiayaPendidikanFormValues>({
    resolver: zodResolver(jenisBiayaPendidikanSchema),
    defaultValues: {
      namaTagihan: isEdit ? "SPP" : "",
      waktuPembayaran: isEdit ? "bulanan" : "",
      statusCicilan: isEdit ? "ya" : "",
    },
  })

  function onSubmit(values: JenisBiayaPendidikanFormValues) {
    setIsLoading(true)
    console.log("Form Values:", values)
    if (isEdit) {
      router.push('/jenis-biaya-pendidikan?status=edit-success')
    } else {
      router.push('/jenis-biaya-pendidikan?status=add-success')
    }
  }

  return (
    <Card className="md:mx-4 mt-4 px-4 md:px-10 py-4">
      <CardHeader className="px-0">
        <div className="flex flex-row justify-start items-center gap-4">
          <Link href="/jenis-biaya-pendidikan">
            <ArrowLeft />
          </Link>
          <span className="text-md md:text-lg font-bold">{`Formulir ${pathname.includes("edit") ? "Pengubahan" : "Penambahan"} Data Jenis Biaya Pendidikan`}</span>
        </div>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-8 mt-4">
            {/* NAMA TAGIHAN */}
            <FormField
              control={form.control}
              name="namaTagihan"
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
                      <Input placeholder="Masukkan Nama Tagihan" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {/* Waktu Pembayaran */}
            <FormField
              control={form.control}
              name="waktuPembayaran"
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
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Salah Satu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Pilih Salah Satu" disabled>Pilih Salah Satu</SelectItem>
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
              name="statusCicilan"
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
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Salah Satu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Pilih Salah Satu" disabled>Pilih Salah Satu</SelectItem>
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
            <Link href={"/jenis-biaya-pendidikan"}>
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
