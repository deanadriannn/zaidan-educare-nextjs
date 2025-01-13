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

type Role = "Ketua Yayasan" | "Bendahara" | "Administrator"

export interface DataType {
  navMain: Record<Role, NavItem[]>
}

// TODO: Get role from auth here
const currentUser = "Administrator"
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
        url: "#",
        icon: "/sidebar/card-payment.svg"
      },
      {
        title: "Rekapitulasi Penerimaan Dana",
        url: "#",
        icon: "/sidebar/bar-chart.svg"
      },
      {
        title: "Grafik Transaksi Penerimaan Dana",
        url: "#",
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
        title: "Transaksi Tagihan Siswa",
        url: "#",
        icon: "/sidebar/bill.svg"
      },
      {
        title: "Transaksi Penerimaan Dana",
        url: "#",
        icon: "/sidebar/bill.svg"
      },
      {
        title: "Pengaturan Notifikasi Penagihan",
        url: "#",
        icon: "/sidebar/push-notifications.svg"
      },
      {
        title: "Status Pembayaran",
        url: "#",
        icon: "/sidebar/card-payment.svg"
      },
      {
        title: "Rekapitulasi Penerimaan Dana",
        url: "#",
        icon: "/sidebar/bar-chart.svg"
      },
      {
        title: "Grafik Transaksi Penerimaan Dana",
        url: "#",
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
        url: "/student",
        icon: "/sidebar/database.svg"
      },
      {
        title: "Data Transaksi Penerimaan",
        url: "#",
        icon: "/sidebar/database.svg",
        activeParams: "data",
        items: [
          {
            title: "Jenis Biaya Pendidikan",
            url: "#",
          },
          {
            title: "Bank Penerima",
            url: "#",
          },
        ],
      },
      {
        title: "Data Pengguna Aplikasi",
        url: "#",
        icon: "/sidebar/push-notifications.svg",
      },
    ]
  }
}

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          onClick={() => redirect("/")}
          className="hover:bg-transparent hover:text-sidebar-foreground"
        >
          <a href="/" className="flex items-center space-x-2">
            <div className="flex aspect-square size-8 items-center justify-center">
              <img src="/images/sidebar-logo.jpeg" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-bold text-lg">
                Zaidan Educare
              </span>
            </div>
          </a>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea>
          <NavMain items={data.navMain[currentUser]} />
        </ScrollArea>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}