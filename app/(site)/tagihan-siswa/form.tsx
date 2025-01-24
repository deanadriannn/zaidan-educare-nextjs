"use client";

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { ArrowLeft, Check, ChevronsUpDown, CircleX, Minus, Plus, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";

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

const jenisPembayaranContoh = [
  {
    jenisPembayaran: "DPP",
    waktuPembayaran: "1x",
    statusCicilan: "Ya",
  },
  {
    jenisPembayaran: "SPP",
    waktuPembayaran: "Bulanan",
    statusCicilan: "Ya",
  },
  {
    jenisPembayaran: "Makan Siang",
    waktuPembayaran: "Harian",
    statusCicilan: "Tidak",
  },
  {
    jenisPembayaran: "Jemputan",
    waktuPembayaran: "Bulanan",
    statusCicilan: "Ya",
  },
  {
    jenisPembayaran: "Kamping",
    waktuPembayaran: "Tahunan",
    statusCicilan: "Tidak",
  },
] as const;

const tagihanSiswaSchema = z.object({
  namaSiswa: z.string({
    required_error: "Nama siswa harus dipilih",
  }),
})

type PaymentItem = {
  jenisPembayaran: string;
  waktuPembayaran: string;
  statusCicilan: "Ya" | "Tidak" | "";
  nominal: number;
};

export default function TagihanSiswaForm() {
  const router = useRouter()
  const pathname = usePathname()

  const [paymentItems, setPaymentItems] = useState<PaymentItem[]>([
    // Boleh awali dengan 1 baris “kosong” atau sesuai kebutuhan
    {
      jenisPembayaran: "",
      waktuPembayaran: "",
      statusCicilan: "",
      nominal: 0,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<tagihanSiswaFormValues>({
    resolver: zodResolver(tagihanSiswaSchema),
    defaultValues: {
      
    },
  })

  const handleAddRow = () => {
    setPaymentItems((prev) => [
      ...prev,
      {
        jenisPembayaran: "",
        waktuPembayaran: "",
        statusCicilan: "",
        nominal: 0,
      },
    ]);
  };

  // Fungsi untuk menghapus baris tertentu
  const handleRemoveRow = (index: number) => {
    setPaymentItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSelectJenisPembayaran = (index: number, val: string) => {
    // Cari data master
    const found = jenisPembayaranContoh.find(
      (item) => item.jenisPembayaran === val
    );
    if (!found) return;

    setPaymentItems((prev) => {
      const newItems = [...prev];
      newItems[index] = {
        ...newItems[index],
        jenisPembayaran: found.jenisPembayaran,
        waktuPembayaran: found.waktuPembayaran,
        statusCicilan: found.statusCicilan,
      };
      return newItems;
    });
  };

  const handleNominalChange = (index: number, value: string) => {
    const parsed = parseInt(value) || 0;
    setPaymentItems((prev) => {
      const newItems = [...prev];
      newItems[index].nominal = parsed;
      return newItems;
    });
  };

  function onSubmit(values: tagihanSiswaFormValues) {
    setIsLoading(true)
    console.log("Form Values:", values)
    console.log("Data Tagihan:", paymentItems)
    toast.success(`Data tagihan biaya pendidikan berhasil ${pathname.includes("edit") ? "diperbarui" : "ditambahkan"}`)
    router.push("/tagihan-siswa")
  }

  return (
    <Card className="md:mx-4 mt-4 px-4 md:px-10 py-4">
      <CardHeader className="px-0">
        <div className="flex flex-row justify-start items-center gap-4">
          <Link href="/tagihan-siswa">
            <ArrowLeft />
          </Link>
          <span 
            className="text-md md:text-lg font-bold"
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
                              "w-full md:w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={isLoading}
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
                      <PopoverContent className="popover-content-width-full p-0">
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
                  <div className="mt-4 flex gap-8 font-spartan pl-1">
                    <div className="flex flex-col gap-2">
                      <Label className="text-lg font-semibold text-muted-foreground">Kelas</Label>
                      <Label className="text-lg font-semibold text-muted-foreground">NIS</Label>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-lg text-black">
                        {field.value
                          ? exampleData.find(
                              (siswa) => siswa.value === field.value
                            )?.kelas
                          : ""}
                      </p>
                      <p className="text-lg text-black">
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

          {/* TOMBOL TAMBAH BARIS */}
          <div className="flex justify-end mb-2">
            <Button variant="primary-red" onClick={handleAddRow} type="button" disabled={isLoading}>
              <Plus />
            </Button>
          </div>

          {/* TABEL INPUT DATA TAGIHAN BIAYA PENDIDIKAN */}
          <div className="table-container">
            <table className="w-full border text-left text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-sm font-semibold">
                  <th className="p-2">Jenis Pembayaran</th>
                  <th className="p-2">Waktu Pembayaran</th>
                  <th className="p-2">Status Cicilan</th>
                  <th className="p-2">Nominal</th>
                  <th className="p-2 text-center sticky right-0 z-10">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paymentItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    {/* Pilih Jenis Pembayaran */}
                    <td className="p-2">
                      <Select
                        value={item.jenisPembayaran}
                        onValueChange={(val) =>
                          handleSelectJenisPembayaran(index, val)
                        }
                        disabled={isLoading}
                      >
                        <SelectTrigger className="w-44">
                          <SelectValue placeholder="Pilih Salah Satu" />
                        </SelectTrigger>
                        <SelectContent>
                          {jenisPembayaranContoh.map((option) => (
                            <SelectItem
                              key={option.jenisPembayaran}
                              value={option.jenisPembayaran}
                            >
                              {option.jenisPembayaran}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>

                    {/* Waktu Pembayaran (read-only) */}
                    <td className="p-2 text-center">
                      {item.waktuPembayaran ? item.waktuPembayaran : "-"}
                    </td>

                    {/* Status Cicilan (read-only) */}
                    <td className="p-2 text-center">
                      {item.statusCicilan ? item.statusCicilan : "-"}
                    </td>

                    {/* Nominal (masih input, jika mau diisi manual) */}
                    <td className="p-2">
                      <Input
                        type="number"
                        className="w-28"
                        value={item.nominal || ""}
                        onChange={(e) => handleNominalChange(index, e.target.value)}
                        disabled={isLoading}
                      />
                    </td>

                    {/* Tombol Hapus Baris */}
                    <td className="p-2 text-center sticky right-0 z-10">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveRow(index)}
                        type="button"
                        disabled={isLoading}
                      >
                        <Minus />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* BUTTON SUBMIT */}
          <div className="flex justify-end gap-4">
            <Link href={"/tagihan-siswa"}>
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
