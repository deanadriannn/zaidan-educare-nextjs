"use client";

import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDropzone } from "react-dropzone"
import toast from "react-hot-toast"
import { ArrowLeft, CalendarIcon, CircleUserRound, CloudUpload, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardHeader } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, useFormField } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const studentSchema = z.object({
  nama: z.string().min(1, "Nama tidak boleh kosong"),
  nis: z.string().min(1, "NIS tidak boleh kosong"),
  jenisKelamin: z.enum(["laki-laki", "perempuan"], {
    required_error: "Jenis kelamin tidak boleh kosong",
  }),
  bornDate: z.date().optional(),
  kelas: z.enum(["1","2","3","4","5","6"]).optional(),
  entranceDate: z.date().optional(),
  alamat: z.string().optional(),
  namaWali: z.string().optional(),
  hubunganWali: z.enum(["ayah","ibu","kakek","nenek","paman","bibi","saudara"]).optional(),
  jenisKelaminWali: z.enum(["laki-laki","perempuan"]).optional(),
  emailWali: z.string().email().optional(),
  nomorTeleponWali: z.string().optional(),
})

type StudentFormValues = z.infer<typeof studentSchema>

export default function InputStudent() {
  const router = useRouter()

  const [dataUrl, setDataUrl] = useState<string | null>(null)

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      nama: "",
      nis: "",
      jenisKelamin: undefined,
      bornDate: undefined,
      kelas: undefined,
      entranceDate: undefined,
      alamat: "",
      namaWali: "",
      hubunganWali: undefined,
      jenisKelaminWali: undefined,
      emailWali: "",
      nomorTeleponWali: "",
    },
  })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles?.length) return
    const file = acceptedFiles[0]
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result) {
        setDataUrl(reader.result as string)
      }
    }
    reader.readAsDataURL(file)
  }, [])

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } = useDropzone({
    onDrop,
  })

  function onSubmit(values: StudentFormValues) {
    console.log("Form Values:", values)
    toast.success("Data siswa berhasil ditambahkan")
    router.push("/student")
  }

  return (
    <Card className="mx-4 mt-4 px-10 py-4">
      <CardHeader className="px-0">
        <div className="flex flex-row justify-start items-center gap-4">
          <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => router.push("/student")}>
            <ArrowLeft />
          </Button>
          <span className="text-lg font-bold">Tambah Data Siswa</span>
        </div>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="photo" className="text-lg font-bold text-muted-foreground">Foto</Label>
            <div className="flex flex-col justify-center items-center gap-4">
              <div
                className="bg-muted h-60 w-60 rounded-full hover:cursor-pointer group"
                {...getRootProps()}
              >
                <Input type="file" id="photo" {...getInputProps()} />
                {dataUrl ? (
                  <div className="w-full h-full rounded-full relative group-hover:opacity-50 duration-200">
                    {/* PREVIEW */}
                    <img
                      src={dataUrl}
                      className="absolute inset-0 w-full h-full object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full">
                    {isDragActive ? (
                      <div className="flex flex-col justify-center items-center h-full w-full">
                        <CloudUpload className="w-14 h-14" />
                        <span>Pilih Gambar</span>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-center h-full w-full group-hover:opacity-50 duration-200">
                        <CircleUserRound className="w-14 h-14" />
                        <span>Pilih Gambar</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="font-semibold text-lg text-muted-foreground">
                Disarankan upload foto dengan rasio 1:1
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
            <FormField
              control={form.control}
              name="nama"
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
                      Nama <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan Nama" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="nis"
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
                      NIS <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan NIS" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="jenisKelamin"
              render={({ field }) => {
                const { error } = useFormField()
                return (
                  <FormItem className="space-y-3">
                    <FormLabel
                      className={cn(
                        error ? "text-destructive": "text-muted-foreground",
                        "text-lg font-bold"
                      )}
                    >
                      Jenis Kelamin
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="laki-laki" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Laki-laki
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="perempuan" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Perempuan
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {/* TANGGAL LAHIR */}
            <FormField
              control={form.control}
              name="bornDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Tanggal Lahir</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pilih Tanggal</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => field.onChange(date ?? undefined)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* KELAS */}
            <FormField
              control={form.control}
              name="kelas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Kelas</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TAHUN MASUK */}
            <FormField
              control={form.control}
              name="entranceDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Tahun Masuk</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pilih Tanggal</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => field.onChange(date ?? undefined)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ALAMAT */}
            <FormField
              control={form.control}
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Alamat Rumah</FormLabel>
                  <FormControl>
                    <Input placeholder="Jl. Jalan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* NAMA WALI */}
            <FormField
              control={form.control}
              name="namaWali"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Nama Wali</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* HUBUNGAN WALI */}
            <FormField
              control={form.control}
              name="hubunganWali"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Hubungan Wali</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Hubungan Wali" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ayah">Ayah</SelectItem>
                      <SelectItem value="ibu">Ibu</SelectItem>
                      <SelectItem value="kakek">Kakek</SelectItem>
                      <SelectItem value="nenek">Nenek</SelectItem>
                      <SelectItem value="paman">Paman</SelectItem>
                      <SelectItem value="bibi">Bibi</SelectItem>
                      <SelectItem value="saudara">Saudara</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* JENIS KELAMIN WALI */}
            <FormField
              control={form.control}
              name="jenisKelaminWali"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Jenis Kelamin Wali</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Jenis Kelamin Wali" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="laki-laki">Laki-laki</SelectItem>
                      <SelectItem value="perempuan">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* EMAIL WALI */}
            <FormField
              control={form.control}
              name="emailWali"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Email Wali</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* NOMOR TELEPON WALI */}
            <FormField
              control={form.control}
              name="nomorTeleponWali"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Nomor Telepon Wali</FormLabel>
                  <FormControl>
                    <Input placeholder="081234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* BUTTON SUBMIT */}
          <div className="flex justify-end">
            <Button type="submit" className="mt-6">
              <Save className="mr-2" />
              Simpan
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}
