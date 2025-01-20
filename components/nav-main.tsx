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

export function NavMain({
  items,
}: {
  items: any[]
}) {
  const { isMobile } = useSidebar()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item: any) => (
          item.items?.length ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.activeParams.some((param: string) => pathname.includes(param))}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton 
                    tooltip={item.title}
                    className="hover:bg-sidebar-item-hover data-[state=open]:bg-sidebar-item-hover data-[state=open]:text-sidebar-text-hover h-10 text-nowrap"
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
                        <SidebarMenuSubButton asChild tooltip={subItem.title} className="h-10" isActive={pathname.includes(subItem.url)}>
                          <span onClick={() => router.push(subItem.url)}>
                            <img 
                              src={subItem.icon}
                              className="w-6 h-6"
                            />
                            <span>{subItem.title}</span>
                          </span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ): (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title} className="h-10" 
              isActive={pathname === item.url}
              >
                <span onClick={() => router.push(item.url)}>
                  {/* <item.icon /> */}
                  <img 
                    src={item.icon}
                    className="w-6 h-6"
                  />
                  <span>{item.title}</span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
