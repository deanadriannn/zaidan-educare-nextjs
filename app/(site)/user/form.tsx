"use client";

import { usePathname, useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ArrowLeft, CircleX, Eye, EyeOff, Save } from "lucide-react"
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
import { useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { penggunaAplikasiSelectOptions } from "@/lib/data";

function getUserSchema(isEdit: boolean) {
  return z.object({
    nama: z.string().min(1, "Nama wajib diisi"),
    foto: z
    .instanceof(File).optional(),
    username: z.string().min(1, "Username wajib diisi"),
    password: isEdit
    ? z.string().optional()
    : z.string().min(1, "Password wajib diisi"),
    role: z.string({
      required_error: "Role wajib diisi",
    }).min(1, "Role wajib diisi"),
  })
}

export default function UserForm() {
  const router = useRouter()
  const pathname = usePathname()
  
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const isEdit = pathname.includes("edit")
  const userSchema = getUserSchema(isEdit)

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      nama: isEdit ? "Ratna Puspita Sari" : "",
      foto: undefined,
      username: isEdit ? "ratna" : "",
      password: "",
      role: isEdit ? "ketua_yayasan" : undefined,
    },
  })

  function onSubmit(values: z.infer<typeof userSchema>) {
    setIsLoading(true)
    console.log("Form Values:", values)
    if (isEdit) {
      router.push('/user?status=edit-success')
    } else {
      router.push('/user?status=add-success')
    }
  }

  return (
    <Card className="md:mx-4 mt-4 px-4 md:px-10 py-4">
      <CardHeader className="px-0">
        <div className="flex flex-row justify-start items-center gap-4">
          <Link href="/user">
            <ArrowLeft />
          </Link>
          <span className="text-md md:text-lg font-bold">{`Formulir ${pathname.includes("edit") ? "Pengubahan" : "Penambahan"} Data Pengguna Aplikasi`}</span>
        </div>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-8 mt-4">
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
                      <Input placeholder="Masukkan Nama" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {/* FOTO */}
            <FormField
              control={form.control}
              name="foto"
              render={({ field: { value, onChange, ...fieldProps } }) => {
                return (
                  <FormItem>
                    <FormLabel 
                      className="text-muted-foreground text-lg font-bold"
                    >
                      Foto
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...fieldProps}
                          type="file"
                          accept="image/*"
                          onChange={(event) =>
                            onChange(event.target.files && event.target.files[0])
                          }
                          className="hover:cursor-pointer opacity-0 absolute w-full h-full"
                          disabled={isLoading}
                        />
                        <Button 
                          className="w-full bg-[#f1f2f3] hover:bg-[#f1f2f3] flex justify-start items-center gap-2" 
                          disabled={isLoading} 
                          type="button"
                        >
                          <span className="border-2 p-0.5 border-gray-500 text-muted-foreground rounded-md hover:cursor-pointer">Pilih File</span>
                          {value ? (
                            <span className="text-muted-foreground">{value?.name}</span>
                          ): (
                            <span className="text-muted-foreground">Tidak ada file yang dipilih</span>
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {/* USERNAME */}
            <FormField
              control={form.control}
              name="username"
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
                      Username <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan Username" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="password"
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
                      Password {isEdit ? "Baru" : <span className="text-destructive">*</span>}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder={`Masukkan Password ${isEdit ? "Baru" : ""}`} {...field} 
                          type={showPassword ? "text" : "password"}
                          disabled={isLoading}
                        />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-0 h-14 w-14 hover:bg-transparent"
                                onClick={() => setShowPassword((prev) => !prev)}
                                type="button"
                                disabled={isLoading}
                              >
                                {showPassword ? 
                                  <EyeOff /> : 
                                  <Eye />
                                }
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {showPassword ? "Sembunyikan" : "Tampilkan"} password
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {/* ROLE */}
            <FormField
              control={form.control}
              name="role"
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
                      Role <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Salah Satu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Pilih Salah Satu" disabled>Pilih Salah Satu</SelectItem>
                        <SelectItem value="Ketua Yayasan">Ketua Yayasan</SelectItem>
                        <SelectItem value="Bendahara">Bendahara</SelectItem>
                        <SelectItem value="Administrator">Administrator</SelectItem>
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
            <Link href={"/user"}>
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
