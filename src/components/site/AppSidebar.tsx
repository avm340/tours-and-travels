import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Car, Route as RouteIcon, Map, ClipboardList, Phone } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

type Item =
  | { title: string; to: string; icon: typeof Home; href?: undefined }
  | { title: string; href: string; icon: typeof Home; to?: undefined };

const items: Item[] = [
  { title: "Home", to: "/", icon: Home },
  { title: "Our Fleet", href: "/#cars", icon: Car },
  { title: "Outstation", to: "/outstation", icon: RouteIcon },
  { title: "Tour Packages", to: "/packages", icon: Map },
  { title: "My Bookings", to: "/bookings", icon: ClipboardList },
  { title: "Contact", href: "/#footer", icon: Phone },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({ select: (r) => r.location.pathname });

  return (
    <Sidebar collapsible="icon" className="hidden lg:flex top-16 h-[calc(100vh-4rem)]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigate</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = item.to ? currentPath === item.to : false;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      {item.to ? (
                        <Link to={item.to} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          {!collapsed && <span>{item.title}</span>}
                        </Link>
                      ) : (
                        <a href={item.href} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          {!collapsed && <span>{item.title}</span>}
                        </a>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
