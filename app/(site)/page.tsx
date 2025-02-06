"use client"

import Filter from "@/components/filter";
import { MonthPicker } from "@/components/month-picker";
import StatusMessage from "@/components/status-message";
import { TrendChart } from "@/components/trend-chart";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserStore } from "@/hooks/use-user";
import { allPaymentData, jenisPembayaranSelectOptions } from "@/lib/data";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { role } = useUserStore();
  const [isLoading, setIsLoading] = useState(false)

  const [bulanStartError, setbulanStartError] = useState(false)
  const [bulanEndError, setbulanEndError] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [jenisPembayaran, setJenisPembayaran] = useState('')
  const [bulanStart, setBulanStart] = useState<Date | undefined>()
  const [bulanEnd, setBulanEnd] = useState<Date | undefined>()

  const [jenisPembayaranQuery, setJenisPembayaranQuery] = useState('')
  const [bulanStartQuery, setBulanStartQuery] = useState<Date | undefined>()
  const [bulanEndQuery, setBulanEndQuery] = useState<Date | undefined>()

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const jenis = searchParams.get("jenisPembayaran");
    const start = searchParams.get("bulanStart");
    const end = searchParams.get("bulanEnd");

    // Tetapkan ke state *query*
    if (jenis) setJenisPembayaranQuery(jenis);
    else setJenisPembayaranQuery("all");

    if (start) {
      // parse ke Date
      setBulanStartQuery(new Date(start))
    } else {
      setBulanStartQuery(undefined);
    }
    if (end) {
      setBulanEndQuery(new Date(end))
    } else {
      setBulanEndQuery(undefined);
    }
  }, [searchParams]);
  
  const handleFilter = (e: any) => {
    setIsLoading(true)
    e.preventDefault()

    if (!bulanStart && !bulanEnd) {
      setShowError(true)
      setErrorMessage("Field Bulan dari dan Bulan sampai wajib diisi untuk melakukan pencarian")
      setIsLoading(false)
      return;
    }

    if (!bulanStart) {
      setShowError(true)
      setErrorMessage("Field Bulan dari wajib diisi untuk melakukan pencarian")
      setIsLoading(false)
      return;
    }

    if (!bulanEnd) {
      setShowError(true)
      setErrorMessage("Field Bulan sampai wajib diisi untuk melakukan pencarian")
      setIsLoading(false)
      return;
    }

    if (bulanStart && bulanEnd) {
      const query = new URLSearchParams({
        jenisPembayaran: jenisPembayaran,
        bulanStart: bulanStart?.toISOString(),
        bulanEnd: bulanEnd?.toISOString()
      })

      router.push(`/?${query.toString()}`)
      setShowError(false)

    }
    setIsLoading(false)
  }

  const handleReset = () => {
    setBulanStart(undefined)
    setBulanEnd(undefined)
    setJenisPembayaran('all')
    router.push("/")
  }

  return (
    <>
      {showError && (
        <StatusMessage 
          message={errorMessage}
          backgroundColor="bg-[#ffecec]"
          handleDelete={() => setShowError(prev => !prev)}
        />
      )}
      {(role === "Bendahara" || role === "Ketua Yayasan") && (
        <Filter>
          <form onSubmit={handleFilter}>
            <CardContent className="flex flex-col md:flex-row justify-center items-center gap-4">
              <div className="w-full flex flex-col space-y-2">
                <Label htmlFor="bulanStart" className="text-md">
                  Bulan dari <span className="text-destructive">*</span>
                </Label>
                <MonthPicker
                  value={bulanStart || undefined}
                  onChange={(date) => setBulanStart(date || undefined)}
                  placeholder="Pilih Bulan"
                  disabled={isLoading}
                />
              </div>
              <div className="w-full flex flex-col space-y-2">
                <Label htmlFor="bulanEnd" className="text-md">
                  Bulan sampai <span className="text-destructive">*</span>
                </Label>
                <MonthPicker
                  value={bulanEnd || undefined}
                  onChange={(date) => setBulanEnd(date || undefined)}
                  placeholder="Pilih Bulan"
                  disabled={isLoading}
                />
              </div>
              <div className="w-full flex flex-col space-y-2">
                <Label htmlFor="jenisPembayaran" className="text-md">Jenis Pembayaran</Label>
                <Select onValueChange={(value) => setJenisPembayaran(value)} disabled={isLoading} value={jenisPembayaran}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua Jenis Pembayaran" />
                  </SelectTrigger>
                  <SelectContent>
                    {jenisPembayaranSelectOptions.map((option) => (
                      <SelectItem value={option.value} key={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col md:flex-row justify-end gap-4">
              <Button 
                variant="ghost"
                className="hover:bg-transparent text-[#F5365C] hover:text-[#D12C50] w-full md:w-fit"
                type="button"
                onClick={handleReset}
                disabled={isLoading}
              >
                RESET
              </Button>
              <Button type="submit" variant="primary-red" className="w-full md:w-fit" disabled={isLoading}>
                <Search /> Cari
              </Button>
            </CardFooter>
          </form>
        </Filter>
      )}
      <Card className='flex flex-auto gap-4 md:mx-4 mt-4 shrink-0'>
        {role === "Administrator" && (
          <div className="flex-1 rounded-xl bg-sidebar justify-center items-center flex py-10">
            <span className="text-2xl font-bold font-secular">
              Selamat Datang {role}
            </span>
          </div>
        )}

        {(role === "Bendahara" || role === "Ketua Yayasan") && (
          bulanStartQuery !== undefined && bulanEndQuery !== undefined ? (
            <div className="flex flex-col w-full">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Trend Data Ringkasan Jumlah Transaksi
                </CardTitle>
              </CardHeader>

              {/* Menampilkan grafik untuk semua jenis pembayaran */}
              <CardContent className="w-full">
                <TrendChart
                  paymentType={jenisPembayaranQuery || 'all'}
                  label={jenisPembayaranSelectOptions.find((option) => option.value === jenisPembayaranQuery)?.label || 'Semua Jenis Pembayaran'}
                  dateStart={bulanStartQuery}
                  dateEnd={bulanEndQuery}
                  dataSource={allPaymentData}
                />
              </CardContent>
            </div>
          ) : (
            <div className="flex min-h-[50vh] w-full justify-center items-center">
              <p className="text-lg">Data Tidak Ada</p>
            </div>
          )
        )}
      </Card>
    </>
  )
}