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
import { DatePicker } from "@/components/date-picker";
import Link from "next/link";

type penerimaanDanaFormValues = z.infer<typeof penerimaanDanaSchema>

// TODO: Simpan data siswa dari database ke sini
const exampleData = [
  { 
    label: "Abdul", 
    value: "Abdul",
    kelas: '3-A',
    nis: '123589',
    daftarTagihan: [
      {
        jenisPembayaran: "DPP",
        waktuPembayaran: "1x",
        statusCicilan: "Ya",
        nominal: 15000000,
        metodePembayaran: "",
        namaBank: "",
      },
      {
        jenisPembayaran: "SPP",
        waktuPembayaran: "Bulanan",
        statusCicilan: "Tidak",
        nominal: 600000,
        metodePembayaran: "",
        namaBank: "",
      },
      {
        jenisPembayaran: "Makan Siang",
        waktuPembayaran: "Bulanan",
        statusCicilan: "Tidak",
        nominal: 200000,
        metodePembayaran: "",
        namaBank: "",
      },
      {
        jenisPembayaran: "Jemputan",
        waktuPembayaran: "Bulanan",
        statusCicilan: "Tidak",
        nominal: 150000,
        metodePembayaran: "",
        namaBank: "",
      },
      {
        jenisPembayaran: "Kamping",
        waktuPembayaran: "Tahunan",
        statusCicilan: "Ya",
        nominal: 1500000,
        metodePembayaran: "",
        namaBank: "",
      },
    ]
  },
  {
    label: "Budi",
    value: "Budi",
    kelas: '1-B',
    nis: '123590',
    daftarTagihan: [
      {
        jenisPembayaran: "DPP",
        waktuPembayaran: "1x",
        statusCicilan: "Ya",
        nominal: 15000000,
        metodePembayaran: "",
        namaBank: "",
      },
      {
        jenisPembayaran: "SPP",
        waktuPembayaran: "Bulanan",
        statusCicilan: "Tidak",
        nominal: 600000,
        metodePembayaran: "",
        namaBank: "",
      },
      {
        jenisPembayaran: "Makan Siang",
        waktuPembayaran: "Bulanan",
        statusCicilan: "Tidak",
        nominal: 200000,
        metodePembayaran: "",
        namaBank: "",
      },
    ]
  },
  {
    label: "Cici",
    value: "Cici",
    kelas: '2-C',
    nis: '123591',
    daftarTagihan: [
      {
        jenisPembayaran: "DPP",
        waktuPembayaran: "1x",
        statusCicilan: "Ya",
        nominal: 15000000,
        metodePembayaran: "",
        namaBank: "",
      },
      {
        jenisPembayaran: "Makan Siang",
        waktuPembayaran: "Bulanan",
        statusCicilan: "Tidak",
        nominal: 200000,
        metodePembayaran: "",
        namaBank: "",
      },
      {
        jenisPembayaran: "Jemputan",
        waktuPembayaran: "Bulanan",
        statusCicilan: "Tidak",
        nominal: 150000,
        metodePembayaran: "",
        namaBank: "",
      },
      {
        jenisPembayaran: "Kamping",
        waktuPembayaran: "Tahunan",
        statusCicilan: "Ya",
        nominal: 1500000,
        metodePembayaran: "",
        namaBank: "",
      },
    ]
  },
  {
    label: "Dodi",
    value: "Dodi",
    kelas: '5-D',
    nis: '123592',
    daftarTagihan: [
      {
        jenisPembayaran: "DPP",
        waktuPembayaran: "1x",
        statusCicilan: "Ya",
        nominal: 15000000,
        metodePembayaran: "",
        namaBank: "",
      },
      {
        jenisPembayaran: "SPP",
        waktuPembayaran: "Bulanan",
        statusCicilan: "Tidak",
        nominal: 600000,
        metodePembayaran: "",
        namaBank: "",
      },
    ]
  },
  {
    label: "Euis",
    value: "Euis",
    kelas: '6-E',
    nis: '123593',
    daftarTagihan: [
      {
        jenisPembayaran: "DPP",
        waktuPembayaran: "1x",
        statusCicilan: "Ya",
        nominal: 15000000,
        metodePembayaran: "",
        namaBank: "",
      },
      {
        jenisPembayaran: "SPP",
        waktuPembayaran: "Bulanan",
        statusCicilan: "Tidak",
        nominal: 600000,
        metodePembayaran: "",
        namaBank: "",
      },
      {
        jenisPembayaran: "Makan Siang",
        waktuPembayaran: "Bulanan",
        statusCicilan: "Tidak",
        nominal: 200000,
        metodePembayaran: "",
        namaBank: "",
      },
    ]
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
  namaSiswa: z.string({
    required_error: "Nama siswa harus dipilih",
  }),
  tanggalTransaksi: z.date({
    required_error: "Tanggal transaksi tidak boleh kosong",
  }),
})

type PaymentItem = {
  jenisPembayaran: string;
  waktuPembayaran: string;
  statusCicilan: "Ya" | "Tidak" | "";
  nominal: number;
  metodePembayaran: string;
  namaBank: string;
};

export default function PenerimaanDanaForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [paymentItems, setPaymentItems] = useState<PaymentItem[]>([
    // Boleh awali dengan 1 baris “kosong” atau sesuai kebutuhan
    {
      jenisPembayaran: "",
      waktuPembayaran: "",
      statusCicilan: "",
      nominal: 0,
      metodePembayaran: "",
      namaBank: "",
    },
  ]);
  
  const form = useForm<penerimaanDanaFormValues>({
    resolver: zodResolver(penerimaanDanaSchema),
    defaultValues: {
      namaSiswa: "",
      tanggalTransaksi: new Date(),
    },
  })

  // how to get daftartagihan from exampleData based on namaSiswa?
  // can you use usestate?
  const [daftarTagihan, setDaftarTagihan] = useState<PaymentItem[]>([])

  const handleAddRow = () => {
    setPaymentItems((prev) => [
      ...prev,
      {
        jenisPembayaran: "",
        waktuPembayaran: "",
        statusCicilan: "",
        nominal: 0,
        metodePembayaran: "",
        namaBank: "",
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

  const handleMetodePembayaranChange = (index: number, value: string) => {
    setPaymentItems((prev) => {
      const newItems = [...prev];
      newItems[index].metodePembayaran = value;
      return newItems;
    });
  }

  const handleNamaBankChange = (index: number, value: string) => {
    setPaymentItems((prev) => {
      const newItems = [...prev];
      newItems[index].namaBank = value;
      return newItems;
    });
  }

  const handleNominalChange = (index: number, value: string) => {
    const parsed = parseInt(value) || 0;
    setPaymentItems((prev) => {
      const newItems = [...prev];
      newItems[index].nominal = parsed;
      return newItems;
    });
  };

  function onSubmit(values: penerimaanDanaFormValues) {
    setIsLoading(true)
    console.log("Form Values:", values)
    console.log("Data Tagihan:", paymentItems)
    router.push('/penerimaan-dana?status=add-success')
  }

  return (
    <Card className="md:mx-4 mt-4 px-4 md:px-10 py-4">
      <CardHeader className="px-0">
        <div className="flex flex-row justify-start items-center gap-4">
          <Link href="/penerimaan-dana">
            <ArrowLeft />
          </Link>
          <span 
            className="text-md md:text-lg font-bold"
          >
            Formulir Penambahan Data Pembayaran Biaya Pendidikan
          </span>
        </div>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            {/* AUTO COMPLETE SEARCH SISWA */}
            <FormField
              control={form.control}
              name="namaSiswa"
              render={({ field }) => {
                const { error } = useFormField()
                return (
                  <div className="flex flex-col w-full">
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
                                "w-full justify-between",
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
                                      // @ts-ignore
                                      setDaftarTagihan(siswa.daftarTagihan)
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
                  </div>
                )
              }}
            />

            <FormField
              control={form.control}
              name="tanggalTransaksi"
              render={({ field }) => {
                const { error } = useFormField()
                return (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel
                      className={cn(
                        error ? "text-destructive": "text-muted-foreground",
                        "text-lg font-bold"
                      )}
                    >
                      Tanggal Transaksi <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value || undefined}
                        onChange={(date) => field.onChange(date || null)}
                        minDate={new Date("1900-01-01")}
                        maxDate={new Date()}
                        placeholder="Pilih Tanggal Transaksi"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>

          
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* JUDUL DAFTAR TAGIHAN YANG SUDAH DITAMBAHKAN */}
            <div className="flex flex-col gap-2 w-full">
              <h2 className="font-bold mb-2">
                Daftar Tagihan
              </h2>

              {/* TABEL DAFTAR TAGIHAN YANG DITAMBAHKAN - READ ONLY */}
              <div className="table-container">
                <table className="w-full border text-left text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50 text-sm font-semibold">
                      <th className="p-2 text-center">Jenis Pembayaran</th>
                      <th className="p-2 text-center">Waktu Pembayaran</th>
                      <th className="p-2 text-center">Status Cicilan</th>
                      <th className="p-2 text-center">Nominal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {daftarTagihan.map((item, index) => {
                      const formatted = formatToIDR(item.nominal)
                      return (
                        <tr key={index} className="border-b">
                          <td className="p-2">
                            {item.jenisPembayaran ? item.jenisPembayaran : "-"}
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
                            {item.nominal ? formatted : "-"}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* TOTAL PEMBAYARAN */}
            <div className="flex flex-col justify-start items-start lg:min-w-[200px] xl:min-w-[300px]">
              <h2 className="font-bold">
                Total Pembayaran
              </h2>
              <p>
                {formatToIDR(
                  paymentItems.reduce((acc, item) => acc + item.nominal, 0)
                )}
              </p>
            </div>
          </div>

          {/* TOMBOL TAMBAH BARIS */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold">
              Daftar Transasi Pembayaran
            </h2>
            <Button variant="primary-red" onClick={handleAddRow} type="button" disabled={isLoading}>
              <Plus />
            </Button>
          </div>

          {/* TABEL INPUT DATA TAGIHAN BIAYA PENDIDIKAN */}
          <div className="table-container">
            <table className="w-full border text-left text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-sm font-semibold">
                  <th className="p-2 text-center">Jenis Pembayaran</th>
                  <th className="p-2 text-center">Waktu Pembayaran</th>
                  <th className="p-2 text-center">Status Cicilan</th>
                  <th className="p-2 text-center">Nominal</th>
                  <th className="p-2 text-center">Metode Pembayaran</th>
                  <th className="p-2 text-center">Nama Bank</th>
                  <th className="p-2 text-center sticky right-0 z-10">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paymentItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    {/* Pilih Jenis Pembayaran */}
                    <td className="p-2 flex justify-center flex-col">
                      <Select
                        value={item.jenisPembayaran}
                        onValueChange={(val) =>
                          handleSelectJenisPembayaran(index, val)
                        }
                        required
                        disabled={isLoading}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Salah Satu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pilih Salah Satu">Pilih Salah Satu</SelectItem>
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
                      {item.jenisPembayaran === "" && (
                        <span className="text-xs text-destructive">Jenis pembayaran wajib diisi</span>
                      )}
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
                    <td className="p-2 flex flex-col justify-center">
                      <Input
                        type="number"
                        min={0}
                        className="w-full"
                        value={item.nominal || ""}
                        onChange={(e) => handleNominalChange(index, e.target.value)}
                        disabled={isLoading}
                      />
                      <span>
                        {item.nominal === 0 && (
                          <span className="text-xs text-destructive">Nominal wajib diisi</span>
                        )}
                        {item.nominal < 0 && (
                          <span className="text-xs text-destructive">Nominal tidak boleh kurang dari 0</span>
                        )}
                      </span>
                    </td>

                    {/* Metode Pembayaran */}
                    <td>
                      <div className="flex justify-center">
                        <Select
                          value={item.metodePembayaran}
                          onValueChange={(val) => 
                            handleMetodePembayaranChange(index, val)
                          }
                          disabled={isLoading}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Salah Satu" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pilih Salah Satu">Pilih Salah Satu</SelectItem>
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
                      </div>
                      {item.metodePembayaran === "" && (
                        <span className="text-xs text-destructive">Metode pembayaran wajib diisi</span>
                      )}
                    </td>

                    {/* Nama Bank */}
                    <td className="p-2 flex flex-col justify-center">
                      {/* Jika metode pembayaran adalah transfer, tampilkan pilihan nama bank */}
                      {item.metodePembayaran === "transfer" ? (
                        <div>
                          <Select
                            value={item.namaBank}
                            onValueChange={(val) => 
                              handleNamaBankChange(index, val)
                            }
                            disabled={isLoading}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih Salah Satu" />
                            </SelectTrigger>
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
                          {item.namaBank === "" && (
                            <span className="text-xs text-destructive">Nama bank wajib diisi</span>
                          )}
                        </div>
                      ): (
                        <div></div>
                      )}
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
            <Link href={"/penerimaan-dana"}>
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
