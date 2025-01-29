'use client'

import { Card, CardContent } from "@/components/ui/card";
import { pesanNotifikasiPenagihan } from "@/lib/data";
import { CardNotificationMessage } from "@/components/card-notification-message";
import { useSearchParams } from "next/navigation";
import StatusMessage from "@/components/status-message";

export default function PengaturanNotifikasiPenagihanPage() {
  const searchParams = useSearchParams()
  
  return (
    <>
      {searchParams.get('status') === 'edit-success' && (
        <StatusMessage 
          message="Pesan Notifikasi Berhasil Diperbarui"
          backgroundColor="bg-[#DEF7EC]"
          backUrl="/pengaturan-notifikasi"
        />
      )}
      <Card className="rounded-lg border md:mx-4 mt-4 shrink-0 flex flex-col gap-4 pt-4">
        <CardContent className="flex flex-col gap-4 font-spartan">
          <CardNotificationMessage
            label={pesanNotifikasiPenagihan.label}
            value={pesanNotifikasiPenagihan.value}
          />
        </CardContent>
      </Card>
    </>
  )
}