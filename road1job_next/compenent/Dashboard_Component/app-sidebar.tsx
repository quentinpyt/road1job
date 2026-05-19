"use client"

import ProfileImage from "@/public/logo_1.png"
import {
  Briefcase,
  Settings,
  Heart,
  MapPin,
  LogOut,
  ChevronDown,
  Home,
  MoreHorizontal,
} from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppSidebar() {
  const { state } = useSidebar()

  const navItems = [
    {
      title: "Jobs",
      icon: Briefcase,
      active: true,
    },
    {
      title: "Favoris",
      icon: Heart,
    },
    {
      title: "Map",
      icon: MapPin,
    },
  ]

  const settingsItems = [
    {
      title: "Paramètres",
      icon: Settings,
    },
  ]

  return (
    <Sidebar className="w-64 bg-white">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="flex items-center justify-center text-white font-bold">
            <img alt="logo" className="h-15" src={ProfileImage.src} />
            
          </div>
          <div className="flex flex-col gap-0.5 flex-1">
            <span className="font-bold text-xl">Road1Job</span>
          </div>
        </div>
        <SidebarSeparator />
      </SidebarHeader>

      <SidebarContent className="flex flex-col justify-between">
        <SidebarMenu className="space-y-3">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={item.active}
                className={`h-14 text-base ${item.active ? "bg-[#4f46e5]/10 text-[#4f46e5]" : ""}`}
              >
                <a href="#" className="flex items-center gap-4 px-4">
                  <item.icon className="h-6 w-6" />
                  <span className="flex-1 font-medium">{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <div className="border-t pt-4">
          <div className="px-2">
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href="#" className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        </div>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/avatar.png" alt="User" />
                    <AvatarFallback className="rounded-lg">JD</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">John Doe</span>
                    <span className="truncate text-xs">john@example.com</span>
                  </div>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="top"
                align="end"
              >
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}