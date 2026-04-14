
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: "fa-solid fa-table-columns" },
  { title: "Transactions", url: "/transactions", icon: "fa-solid fa-right-left" },
  { title: "Budgets", url: "/budgets", icon: "fa-solid fa-piggy-bank" },
  { title: "Goals", url: "/goals", icon: "fa-solid fa-bullseye" },
  { title: "Analytics", url: "/analytics", icon: "fa-solid fa-chart-column" },
  { title: "Settings", url: "/settings", icon: "fa-solid fa-gear" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <div className="p-4 flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg finflow-gradient flex items-center justify-center flex-shrink-0">
          <i className="fa-solid fa-arrow-trend-up h-4 w-4 text-primary-foreground" ></i>
        </div>
        {!collapsed && (
          <span className="text-lg font-bold tracking-tight text-foreground">FinFlow</span>
        )}
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="hover:bg-sidebar-accent/50 transition-colors duration-200"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <i className={`${item.icon} mr-2 h-4 w-4`} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-muted-foreground hover:text-destructive">
              <i className="fa-solid fa-right-from-bracket mr-2 h-4 w-4" ></i>
              {!collapsed && <span>Log out</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
