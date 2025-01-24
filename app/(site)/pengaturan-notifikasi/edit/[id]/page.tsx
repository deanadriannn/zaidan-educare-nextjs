"use client";

import { usePathname, useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { ArrowLeft, CircleX, Minus, Plus, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";

type pengaturanNotifikasiPenagihanFormValues = z.infer<typeof pengaturanNotifikasiPenagihanSchema>

const pengaturanNotifikasiPenagihanSchema = z.object({
  format: z
  .string()
  .min(10, {
    message: "Format pesan notifikasi harus berisi minimal 10 karakter",
  })
  .max(200, {
    message: "Format pesan notifikasi tidak boleh lebih dari 200 karakter",
  }),
  pesan: z
  .string()
  .min(10, {
    message: "Pesan notifikasi harus berisi minimal 10 karakter",
  })
  .max(160, {
    message: "Pesan notifikasi harus berisi minimal 200 karakter",
  }),
})

export default function PengaturanNotifikasiPenagihanEditPage() {
  const router = useRouter()

  const [periodes, setPeriodes] = useState<string[]>(["1"])
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<pengaturanNotifikasiPenagihanFormValues>({
    resolver: zodResolver(pengaturanNotifikasiPenagihanSchema),
  })

  const handleAddPeriod = () => {
    setPeriodes((prev) => [...prev, ""])
  }

  const handleRemovePeriod = (index: number) => {
    setPeriodes((prev) => prev.filter((_, i) => i !== index))
  }

  function onSubmit(values: pengaturanNotifikasiPenagihanFormValues) {
    setIsLoading(true)
    console.log("Form Values:", values)
    console.log("Daftar periode:", periodes)
    toast.success("Pesan notifikasi berhasil diperbarui")
    router.push("/pengaturan-notifikasi")
  }

  return (
    <Card className="md:mx-4 mt-4 px-4 md:px-10 py-4">
      <CardHeader className="px-0">
        <div className="flex flex-row justify-start items-center gap-4">
          <Link href="/pengaturan-notifikasi">
            <ArrowLeft />
          </Link>
          <span 
            className="text-md md:text-lg font-bold"
          >
            Formulir Pengubahan Pengiriman Notifikasi Pengingat Pembayaran
          </span>
        </div>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="format"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-muted-foreground text-md md:text-lg">Format Pesan Notifikasi</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Masukkan format pesan notifikasi"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pesan"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-muted-foreground text-md md:text-lg">Pesan Notifikasi</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Masukkan pesan notifikasi"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TANGGAL PENGIRIMAN */}
          <div>
            <h2 className="font-bold text-muted-foreground text-md md:text-lg mb-2">Tanggal Pengiriman</h2>

            {periodes.map((period, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <div className="flex flex-col gap-2">
                  <Label className="font-semibold text-sm md:text-md">
                    Periode {index + 1}
                  </Label>
                  <Input
                    type="number"
                    min={1}
                    max={28}
                    value={period}
                    onChange={(e) => {
                      const val = e.target.value
                      // Pastikan masih dalam 1–28?
                      setPeriodes((prev) => {
                        const newArr = [...prev]
                        newArr[index] = val
                        return newArr
                      })
                    }}
                    placeholder="Masukkan tanggal pengiriman"
                    className="w-40"
                    disabled={isLoading}
                  />
                  <p className="text-sm text-muted-foreground">
                    * periode pengiriman diisi 1 - 28
                  </p>
                </div>

                {/* Tombol + / - */}
                {index === 0 ? (
                  <Button type="button" variant="primary-red" onClick={handleAddPeriod} disabled={isLoading}>
                    <Plus />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="primary-red"
                    onClick={() => handleRemovePeriod(index)}
                    disabled={isLoading}
                  >
                    <Minus />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* BUTTON SUBMIT */}
          <div className="flex justify-end gap-4">
            <Link href={"/pengaturan-notifikasi"}>
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
