"use client"

import { Card } from "@/components/ui/card";
import { useUserStore } from "@/hooks/use-user";

export default function DashboardPage() {
  const { role } = useUserStore();

  return (
    <Card className='flex flex-auto gap-4 md:mx-4 mt-4 shrink-0'>
      <div className="flex-1 rounded-xl bg-sidebar justify-center items-center flex py-10">
        <span className="text-2xl font-bold font-secular">
          Selamat Datang {role}
        </span>
      </div>
    </Card>
  )
}