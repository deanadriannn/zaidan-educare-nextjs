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
import { usePathname } from "next/navigation"

export function NavMain({
  items,
}: {
  items: any[]
}) {
  const { isMobile } = useSidebar()
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item: any) => (
          item.items?.length ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={location.pathname.includes(item.activeParams)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton 
                    tooltip={item.title}
                    className="hover:bg-sidebar-item-hover data-[state=open]:bg-sidebar-item-hover data-[state=open]:text-sidebar-text-hover h-10 text-nowrap"
                    isActive={location.pathname.includes(item.activeParams)}
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
                        <SidebarMenuSubButton asChild tooltip={subItem.title} className="h-10">
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ): (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title} className="h-10" isActive={location.pathname === item.url}>
                <a href={item.url}>
                  {/* <item.icon /> */}
                  <img 
                    src={item.icon}
                    className="w-6 h-6"
                  />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
