"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { pesanNotifikasiPenagihan } from "@/lib/data";
import Link from "next/link";

const CardNotifikasi = ({
  id,
  label, 
  value 
}: {
  id: string,
  label: string,
  value: string
}) => {

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-muted-foreground text-md md:text-lg">
        {label}
      </h1>
      <div className="border-2 border-[#666666] bg-[#F9F7F7] p-2 rounded-lg relative">
        <div className="font-medium whitespace-pre-wrap">
          {value}
        </div>
        <Link href={"/pengaturan-notifikasi/edit/" + id}>
          <Button 
            className="absolute top-0 right-0 md:top-2 md:right-2"
            variant="ghost"
          >
            <Pencil className="text-yellow-500" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function PengaturanNotifikasiPenagihanPage() {
  return (
    <>
      <Card className="rounded-lg border md:mx-4 mt-4 shrink-0 flex flex-col gap-4 pt-4">
        <CardContent className="flex flex-col gap-4 font-spartan">
          {pesanNotifikasiPenagihan.map((item) => (
            <CardNotifikasi
              key={item.id}
              id={item.id}
              label={item.label}
              value={item.value}
            />
          ))}
        </CardContent>
      </Card>
    </>
  )
}