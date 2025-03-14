"use client"

import * as React from "react"
import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarMenuButton
} from "@/components/ui/sidebar"
import { ScrollArea } from "./ui/scroll-area"
import { redirect } from "next/navigation"
import { NavItem } from "@/types/nav"
import { useUserStore } from "@/hooks/use-user"
import Link from "next/link"

type Role = "Ketua Yayasan" | "Bendahara" | "Administrator"

interface DataType {
  navMain: Record<Role, NavItem[]>
}

export function AppSidebar({ ...props }) {
  // TODO: Get role from auth here
  const { role } = useUserStore()
  const currentUser = role
  const data: DataType = {
    navMain: {
      "Ketua Yayasan": [
        {
          title: "Dasbor",
          url: "/",
          icon: "/sidebar/home.svg",
        },
        {
          title: "Status Pembayaran",
          url: "/status-pembayaran",
          icon: "/sidebar/card-payment.svg"
        },
        {
          title: "Rekapitulasi",
          url: "/rekapitulasi",
          icon: "/sidebar/bar-chart.svg"
        },
        {
          title: "Progres Transaksi Penerima Dana",
          url: "/progres-transaksi-penerima-dana",
          icon: "/sidebar/combo-chart.svg"
        }
      ],
      "Bendahara": [
        {
          title: "Dasbor",
          url: "/",
          icon: "/sidebar/home.svg",
        },
        {
          title: "Tagihan Siswa",
          url: "/tagihan-siswa",
          icon: "/sidebar/bill.svg"
        },
        {
          title: "Transaksi Penerimaan Dana",
          url: "/penerimaan-dana",
          icon: "/sidebar/bill.svg"
        },
        {
          title: "Pengaturan Notifikasi",
          url: "/pengaturan-notifikasi",
          icon: "/sidebar/push-notifications.svg"
        },
        {
          title: "Status Pembayaran",
          url: "/status-pembayaran",
          icon: "/sidebar/card-payment.svg"
        },
        {
          title: "Rekapitulasi",
          url: "/rekapitulasi",
          icon: "/sidebar/bar-chart.svg"
        },
        {
          title: "Progres Transaksi Penerima Dana",
          url: "/progres-transaksi-penerima-dana",
          icon: "/sidebar/combo-chart.svg"
        }
      ],
      "Administrator": [
        {
          title: "Dasbor",
          url: "/",
          icon: "/sidebar/home.svg",
        },
        {
          title: "Data Siswa",
          url: "/siswa",
          icon: "/sidebar/database.svg"
        },
        {
          title: "Data Transaksi Penerimaan",
          url: "#",
          icon: "/sidebar/database.svg",
          activeParams: ["jenis-biaya-pendidikan", "bank-penerima-transfer"],
          items: [
            {
              title: "Jenis Biaya Pendidikan",
              url: "/jenis-biaya-pendidikan",
              icon:"/sidebar/bank-building.svg"
            },
            {
              title: "Bank Penerima Transfer Pembayaran",
              url: "/bank-penerima-transfer",
              icon: "/sidebar/books.svg"
            },
          ],
        },
        {
          title: "Data Pengguna Aplikasi",
          url: "/user",
          icon: "/sidebar/push-notifications.svg",
        },
      ]
    }
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          onClick={() => redirect("/")}
          className="hover:bg-transparent hover:text-sidebar-foreground"
        >
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex aspect-square size-8 items-center justify-center">
              <img src="/images/sidebar-logo.jpeg" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-bold text-lg">
                Zaidan Educare
              </span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea>
          {/* @ts-ignore */}
          <NavMain items={data.navMain[currentUser]} />
        </ScrollArea>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}