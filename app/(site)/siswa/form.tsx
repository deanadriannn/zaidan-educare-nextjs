"use client";

import { useCallback, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { format } from "date-fns"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDropzone } from "react-dropzone"
import toast from "react-hot-toast"
import { ArrowLeft, CalendarIcon, CircleUserRound, CircleX, CloudUpload, Save } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea";

const studentSchema = z.object({
  nama: z.string().min(1, "Nama tidak boleh kosong"),
  nis: z.string().min(1, "NIS tidak boleh kosong"),
  jenisKelamin: z.enum(["laki_laki", "perempuan"], {
    required_error: "Jenis kelamin tidak boleh kosong",
  }),
  tanggalLahir: z.date({
    required_error: "Tanggal lahir tidak boleh kosong",
  }),
  kelas: z.string({
    required_error: "Kelas tidak boleh kosong",
  }),
  tahunMasuk: z.date({
    required_error: "Tanggal masuk tidak boleh kosong",
  }),
  alamat: z
  .string()
  .min(10, {
    message: "Alamat minimal 10 karakter.",
  })
  .max(160, {
    message: "Alamat maksimal 160 karakter.",
  }),
  namaWali: z.string().min(1, "Nama wali tidak boleh kosong"),
  hubunganWali: z.string().min(1, "Hubungan wali tidak boleh kosong"),
  jenisKelaminWali: z.enum(["laki_laki", "perempuan"], {
    required_error: "Jenis kelamin wali tidak boleh kosong",
  }),
  emailWali: z.string({
    required_error: "Email wali tidak boleh kosong",
  }).email({
    message: "Email wajib diisi dengan format yang benar",
  }),
  nomorTeleponWali: z.string({
    required_error: "Nomor telepon wali tidak boleh kosong",
  })
  .min(10, "Nomor telepon harus minimal 10 karakter")
})

type StudentFormValues = z.infer<typeof studentSchema>

export default function StudentForm() {
  const router = useRouter()
  const pathname = usePathname()

  const [dataUrl, setDataUrl] = useState<string | null>(null)

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      nama: "",
      nis: "",
      jenisKelamin: "laki_laki",
      tanggalLahir: undefined,
      kelas: undefined,
      tahunMasuk: undefined,
      alamat: "",
      namaWali: "",
      hubunganWali: "",
      jenisKelaminWali: "laki_laki",
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
    console.log("Photo:", acceptedFiles)
    toast.success(`Data siswa berhasil ${pathname.includes("edit") ? "diperbarui" : "ditambahkan"}`)
    router.push("/siswa")
  }

  return (
    <Card className="md:mx-4 mt-4 px-10 py-4">
      <CardHeader className="px-0">
        <div className="flex flex-row justify-start items-center gap-4">
          <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => router.push("/siswa")}>
            <ArrowLeft />
          </Button>
          <span className="text-md md:text-lg font-bold">{`Formulir ${pathname.includes("edit") ? "Pengubahan" : "Penambahan"} Data Siswa`}</span>
        </div>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* PHOTO */}
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
              <div className="font-semibold text-lg text-muted-foreground text-center md:text-start">
                Disarankan upload foto dengan rasio 1:1
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
            {/* NAMA */}
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

            {/* NIS */}
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

            {/* JENIS KELAMIN */}
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
                      Jenis Kelamin <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-y-1 space-x-6"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="laki_laki" className="h-6 w-6" />
                          </FormControl>
                          <FormLabel className="font-normal text-md">
                            Laki-laki
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="perempuan" className="h-6 w-6" />
                          </FormControl>
                          <FormLabel className="font-normal text-md">
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
              name="tanggalLahir"
              render={({ field }) => {
                const { error } = useFormField()
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel
                      className={cn(
                        error ? "text-destructive": "text-muted-foreground",
                        "text-lg font-bold"
                      )}
                    >
                      Tanggal Lahir <span className="text-destructive">*</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Masukkan tanggal lahir</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {/* KELAS */}
            <FormField
              control={form.control}
              name="kelas"
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
                      Kelas <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Kelas" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1_A">1-A</SelectItem>
                        <SelectItem value="1_B">1-B</SelectItem>
                        <SelectItem value="1_C">1-C</SelectItem>
                        <SelectItem value="2_A">2-A</SelectItem>
                        <SelectItem value="2_B">2-B</SelectItem>
                        <SelectItem value="2_C">2-C</SelectItem>
                        <SelectItem value="3_A">3-A</SelectItem>
                        <SelectItem value="3_B">3-B</SelectItem>
                        <SelectItem value="3_C">3-C</SelectItem>
                        <SelectItem value="4_A">4-A</SelectItem>
                        <SelectItem value="4_B">4-B</SelectItem>
                        <SelectItem value="4_C">4-C</SelectItem>
                        <SelectItem value="5_A">5-A</SelectItem>
                        <SelectItem value="5_B">5-B</SelectItem>
                        <SelectItem value="5_C">5-C</SelectItem>
                        <SelectItem value="6_A">6-A</SelectItem>
                        <SelectItem value="6_B">6-B</SelectItem>
                        <SelectItem value="6_C">6-C</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {/* TAHUN MASUK */}
            <FormField
              control={form.control}
              name="tahunMasuk"
              render={({ field }) => {
                const { error } = useFormField()
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel
                      className={cn(
                        error ? "text-destructive": "text-muted-foreground",
                        "text-lg font-bold"
                      )}
                    >
                      Tahun Masuk <span className="text-destructive">*</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Masukkan tahun masuk</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {/* ALAMAT */}
            <FormField
              control={form.control}
              name="alamat"
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
                      Alamat Rumah <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Masukkan Alamat Rumah"
                        className=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {/* NAMA WALI */}
            <FormField
              control={form.control}
              name="namaWali"
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
                      Nama Wali <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan Nama" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {/* HUBUNGAN WALI */}
            <FormField
              control={form.control}
              name="hubunganWali"
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
                      Hubungan Wali <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan Nama" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {/* JENIS KELAMIN WALI */}
            <FormField
              control={form.control}
              name="jenisKelaminWali"
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
                      Jenis Kelamin Wali <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-y-1 space-x-6"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="laki_laki" className="h-6 w-6" />
                          </FormControl>
                          <FormLabel className="font-normal text-md">
                            Laki-laki
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="perempuan" className="h-6 w-6" />
                          </FormControl>
                          <FormLabel className="font-normal text-md">
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

            {/* EMAIL WALI */}
            <FormField
              control={form.control}
              name="emailWali"
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
                      Email Wali <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan Email Wali" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {/* NOMOR TELEPON WALI */}
            <FormField
              control={form.control}
              name="nomorTeleponWali"
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
                      Nomor Telepon Wali <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="08XXXXXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>

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
