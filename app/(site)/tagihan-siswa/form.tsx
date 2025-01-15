"use client";

import { useCallback, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDropzone } from "react-dropzone"
import toast from "react-hot-toast"
import { ArrowLeft, Check, ChevronsUpDown, CircleX, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, useFormField } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Label } from "@/components/ui/label";

type tagihanSiswaFormValues = z.infer<typeof tagihanSiswaSchema>

// TODO: Simpan data siswa dari database ke sini
const exampleData = [
  { 
    label: "Abdul", 
    value: "Abdul",
    kelas: '3-A',
    nis: '123589',
  },
  {
    label: "Budi",
    value: "Budi",
    kelas: '1-B',
    nis: '123590',
  },
  {
    label: "Cici",
    value: "Cici",
    kelas: '2-C',
    nis: '123591',
  },
  {
    label: "Dodi",
    value: "Dodi",
    kelas: '5-D',
    nis: '123592',
  },
  {
    label: "Euis",
    value: "Euis",
    kelas: '6-E',
    nis: '123593',
  }
] as const

const tagihanSiswaSchema = z.object({
  namaSiswa: z.string({
    required_error: "Nama siswa harus dipilih",
  }),
})

export default function TagihanSiswaForm() {
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm<tagihanSiswaFormValues>({
    resolver: zodResolver(tagihanSiswaSchema),
    defaultValues: {
      
    },
  })

  function onSubmit(values: tagihanSiswaFormValues) {
    console.log("Form Values:", values)
    toast.success(`Data tagihan biaya pendidikan berhasil ${pathname.includes("edit") ? "diperbarui" : "ditambahkan"}`)
    router.push("/tagihan-siswa")
  }

  return (
    <Card className="mx-4 mt-4 px-10 py-4">
      <CardHeader className="px-0">
        <div className="flex flex-row justify-start items-center gap-4">
          <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => router.push("/tagihan-siswa")}>
            <ArrowLeft />
          </Button>
          <span 
            className="text-lg font-bold"
          >
            {`Formulir ${pathname.includes("edit") ? "Pengubahan" : "Penambahan"} Data Tagihan Biaya Pendidikan`}
          </span>
        </div>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* AUTO COMPLETE SEARCH SISWA */}
          <FormField
            control={form.control}
            name="namaSiswa"
            render={({ field }) => {
              const { error } = useFormField()
              return (
                <>
                  <FormItem className="flex flex-col">
                    <FormLabel 
                      className={cn(
                        error ? "text-destructive": "text-muted-foreground",
                        "text-lg font-bold"
                      )}
                    >
                      Nama Siswa <span className="text-destructive">*</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? exampleData.find(
                                  (siswa) => siswa.value === field.value
                                )?.label
                              : "Pilih Nama Siswa"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Cari nama siswa..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>Tidak menemukan nama siswa.</CommandEmpty>
                            <CommandGroup>
                              {exampleData.map((siswa) => (
                                <CommandItem
                                  value={siswa.label}
                                  key={siswa.value}
                                  onSelect={() => {
                                    form.setValue("namaSiswa", siswa.value)
                                  }}
                                >
                                  {siswa.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      siswa.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>

                  {/* DATA SISWA YANG TERISI OTOMATIS */}
                  <div className="mt-4 flex flex-col gap-4 font-spartan pl-1">
                    {/* KELAS SISWA */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-10">
                      <Label className="text-lg font-semibold text-muted-foreground col-span-1">Kelas</Label>
                      <p className="text-lg text-black col-span-1">
                        {field.value
                          ? exampleData.find(
                              (siswa) => siswa.value === field.value
                            )?.kelas
                          : ""}
                      </p>
                    </div>

                    {/* NIS SISWA */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-10">
                      <Label className="text-lg font-semibold text-muted-foreground col-span-1">NIS</Label>
                      <p className="text-lg text-black col-span-1">
                        {field.value
                          ? exampleData.find(
                              (siswa) => siswa.value === field.value
                            )?.nis
                          : ""}
                      </p>
                    </div>
                  </div>
                </>
              )
            }}
          />

          {/* BUTTON SUBMIT */}
          <div className="flex justify-end gap-4">
            <Button type="button" className="mt-6 bg-[#FFC31E] hover:bg-[#E0A900]" onClick={() => router.push("/siswa")}>
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
