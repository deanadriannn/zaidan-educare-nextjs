"use client"

import { ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from "@/components/ui/sidebar"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

export function NavMain({
  items,
}: {
  items: any[]
}) {
  const { isMobile } = useSidebar()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <SidebarGroup className="max-w-full">
      <SidebarMenu className="max-w-full">
        {items.map((item: any) => (
          item.items?.length ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.activeParams.some((param: string) => pathname.includes(param))}
              className="group/collapsible max-w-full"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton 
                    tooltip={item.title}
                    className="hover:bg-sidebar-item-hover data-[state=open]:bg-sidebar-item-hover data-[state=open]:text-sidebar-text-hover h-10"
                    isActive={pathname.includes(item.activeParams)}
                  >
                    {/* {item.icon && <item.icon />} */}
                    <img 
                      src={item.icon}
                      className="w-6 h-6"
                    />
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem: any) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        {/* @ts-ignore */}
                        <SidebarMenuSubButton asChild tooltip={subItem.title} 
                          className="min-h-10 hover:cursor-pointer max-w-60"
                          isActive={pathname.includes(subItem.url)}
                        >
                          <Link href={subItem.url}>
                            <img 
                              src={subItem.icon}
                              className="w-6 h-6"
                            />
                            <span className="">{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ): (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title} className="h-10 hover:cursor-pointer" 
              isActive={
                item.url === "/"
                  ? pathname === "/"
                  : pathname === item.url || pathname.startsWith(`${item.url}/`)
              }
              >
                <Link href={item.url}>
                  {/* <item.icon /> */}
                  <img 
                    src={item.icon}
                    className="w-6 h-6"
                  />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
