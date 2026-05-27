"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import getProfileMe, { type ProfileMe } from "@/app/api/profileme";
import ProfileImage from "@/public/logo_1.png";
import {
  Briefcase,
  Settings,
  ChartLine,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();
  const [profile, setProfile] = useState<ProfileMe | null>(null);

  const navItems = [
    {
      title: "Jobs",
      icon: Briefcase,
      href: "/dashboard",
    },
    {
      title: "Statistiques",
      icon: ChartLine,
      href: "/statistics",
    }
  ];

  const settingsItems = [
    {
      title: "Paramètres",
      icon: Settings,
      href: "/settings",
    },
  ];

  useEffect(() => {
    let isMounted = true;

    getProfileMe()
      .then((data) => {
        if (!isMounted) {
          return;
        }

        if (data?.success && data?.user) {
          setProfile(data.user);
        }
      })
      .catch(() => {
        if (isMounted) {
          setProfile(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const displayName = [profile?.name, profile?.surname].filter(Boolean).join(" ") || "Utilisateur";
  const displayEmail = profile?.email || "";

  return (
    <Sidebar className="w-64 bg-white">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="flex items-center justify-center text-white font-bold">
            <img alt="logo" className="h-15" src={ProfileImage.src} />
          </div>
          <div className="flex flex-col gap-0.5 flex-1">
            <span className="font-bold text-xl text-[var(--app-fg)]">Road1Job</span>
          </div>
        </div>
        <SidebarSeparator />
      </SidebarHeader>

      <SidebarContent className="flex flex-col justify-between">
        <SidebarMenu className="space-y-3">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href.split('/')[1] === '' ? '/' : `/${item.href.split('/')[1]}`);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={isActive}
                  className={`h-14 text-base ${isActive ? "bg-[#4f46e5]/10 text-[#4f46e5]" : ""}`}
                >
                  <a href={item.href} className="flex items-center gap-4 px-4">
                    <item.icon className="h-6 w-6 text-[var(--app-fg)]" />
                    <span className="flex-1 font-medium text-[var(--app-fg)]">{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        <div className="border-t pt-4">
          <div className="px-2">
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                      <a href={item.href} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 text-[var(--app-fg)]" />
                        <span className="text-[var(--app-fg)]">{item.title}</span>
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
                      <span className="truncate font-semibold text-[var(--app-fg)]">{displayName}</span>
                      <span className="truncate text-xs text-[var(--app-fg)] opacity-80">{displayEmail}</span>
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
  );
}
