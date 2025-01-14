"use client";

import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";
import { Globe, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import "./site.css"

const footerContent = [
  {
    icon: "/footer/Website.svg",
    url: "https://www.zaidaneducare.sch.id/"
  },
  {
    icon: "/footer/Facebook.svg",
    url: "https://www.facebook.com/ZaidanEducareBandung"
  },
  {
    icon: "/footer/Instagram.svg",
    url: "https://www.instagram.com/sekolah_zaidan_educare/"
  },
  {
    icon: "/footer/Youtube.svg",
    url: "https://www.youtube.com/channel/UCNmieE6rUWz0MUbEV13EqGA"
  }
]

export default function SiteLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const locationName: Record<string, string> = {
    '/': 'Dasbor',
    '/student': 'Master - Data Siswa',
    '/student/input': 'Master - Data Siswa',
    '/user': 'Master - Data Pengguna Aplikasi',
    '/user/input': 'Master - Data Pengguna Aplikasi',
  }

  if (/^\/student\/edit\/\d+$/.test(pathname)) {
    locationName[pathname] = 'Formulir Perubahan Data Siswa';
  }

  if (/^\/user\/edit\/\d+$/.test(pathname)) {
    locationName[pathname] = 'Formulir Perubahan Data Pengguna Aplikasi';
  }

  const handleLogout = () => {
    window.location.href = "/login"
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col w-full h-full min-h-screen">
          <div className='bg-[#F2F3F4] w-full sticky top-0 pt-1 z-30'>
            <Card 
              className="mx-4 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear 
                group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
            >
              <div className='flex justify-between items-center w-full bg-white h-full rounded-xl px-4'>
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <h1 className="text-lg font-semibold">
                    {locationName[pathname]}
                  </h1>
                </div>
                <div className='flex items-center gap-2'>
                  <img 
                    src="/images/male-user.png"
                    className="w-14"
                  />
                  <span className='font-bold'>
                    Nama Pengguna
                  </span>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <LogOut />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Anda akan keluar dari akun Anda.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batalkan</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout} className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90">Lanjutkan</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>
          </div>
          <div className="flex-1">
            {children}
          </div>
          <div className='bg-[#F2F3F4] w-full sticky bottom-0 pb-1 z-30'>
            <Card className="mx-4 mt-4 mb-1 flex h-16 shrink-0 justify-center items-center gap-2 transition-[width,height] ease-linear bg-white rounded-xl">
              <span className='mr-4'>
                Zaidan Educare @ 2025
              </span>
              <div className='flex items-center justify-center gap-2'>
                {footerContent.map((content) => (
                  <a href={content.url} key={content.url} target="_blank">
                    <img 
                      src={content.icon} 
                      alt="Footer Icon"
                      className="w-8 h-8" 
                    />
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}