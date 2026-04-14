import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";
import { AddTransactionModal } from "@/components/transactions/AddTransactionModal";

const mobileNav = [
  { title: "Dashboard", url: "/dashboard", icon: "fa-solid fa-table-columns" },
  { title: "Transactions", url: "/transactions", icon: "fa-solid fa-right-left" },
  { title: "Budgets", url: "/budgets", icon: "fa-solid fa-piggy-bank" },
  { title: "Goals", url: "/goals", icon: "fa-solid fa-bullseye" },
  { title: "Analytics", url: "/analytics", icon: "fa-solid fa-chart-column" },
];

export function AppLayout() {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="hidden md:block">
          <AppSidebar />
        </div>

        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-14 flex items-center border-b border-border px-4 bg-card/50 backdrop-blur-sm sticky top-0 z-30">
            <SidebarTrigger className="mr-4 hidden md:flex" />
            <div className="md:hidden flex items-center gap-2">
              <div className="h-7 w-7 rounded-md finflow-gradient flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">F</span>
              </div>
              <span className="font-semibold text-foreground">FinFlow</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => setShowAddTransaction(true)}
                className="finflow-gradient text-primary-foreground shadow-fab hover:opacity-90 transition-opacity"
              >
                <i className="fa-solid fa-plus h-4 w-4 mr-1" ></i>
                <span className="hidden sm:inline">Add Transaction</span>
              </Button>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6 overflow-auto">
            <Outlet />
          </main>

          {/* Mobile bottom nav */}
          <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border flex items-center justify-around px-2 z-40">
            {mobileNav.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <NavLink
                  key={item.title}
                  to={item.url}
                  className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors text-muted-foreground"
                  activeClassName="text-primary"
                >
                  <i className={`${item.icon} text-lg`} />
                  <span className="text-[10px] font-medium">{item.title}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* FAB for mobile */}
      <button
        onClick={() => setShowAddTransaction(true)}
        className="md:hidden fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full finflow-gradient shadow-fab flex items-center justify-center text-primary-foreground hover:opacity-90 transition-all active:scale-95"
      >
        <i className="fa-solid fa-plus h-6 w-6" ></i>
      </button>

      <AddTransactionModal open={showAddTransaction} onOpenChange={setShowAddTransaction} />
    </SidebarProvider>
  );
}
