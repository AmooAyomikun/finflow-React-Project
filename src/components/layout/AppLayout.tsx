import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { AddTransactionModal } from "@/components/transactions/AddTransactionModal";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { useAppStore } from "@/store/useAppStore";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { MonoConnectButton } from "@/components/bank/MonoConnectButton";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Overview",
  "/accounts": "Wallets & Banks",
  "/transactions": "Transactions",
  "/budgets": "Budget Manager",
  "/goals": "Savings Goals",
  "/analytics": "Analytics",
  "/investments": "Portfolio",
  "/recurring": "Subscriptions",
  "/reports": "Reports",
  "/settings": "Settings",
  "/help": "Help Center"
};

export function AppLayout() {
  const { showAddTransactionModal, setShowAddTransactionModal } = useAppStore();
  const location = useLocation();
  const [dateStr, setDateStr] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const now = new Date();
    setDateStr(`Wed 8, Oct`); // We can make this dynamic later
  }, []);

  const pageTitle = PAGE_TITLES[location.pathname] || "Overview";

  return (
    <div className={`dashboard-body ${mobileOpen ? 'sidebar-open' : ''}`}>
      <div className="app">
        <AppSidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

        <div className="main">
          {/* TOPBAR */}
          <div className="topbar">
            <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
              <Menu size={20} />
            </button>
            <div className="topbar-title">{pageTitle}</div>
            <div className="search-box">
              <span style={{ color: "var(--text3)", fontSize: "13px" }}><i className="fa-solid fa-magnifying-glass"></i></span>
              <input type="text" placeholder="Search transactions, categories..." />
            </div>
            <div className="topbar-btn"><i className="fa-regular fa-calendar"></i> &nbsp;{dateStr}</div>
            <button 
              className="topbar-btn primary" 
              onClick={() => setShowAddTransactionModal(true)}
            >
              <i className="fa-solid fa-plus"></i> Add Transaction
            </button>
            <MonoConnectButton className="!h-[34px] !rounded-lg !px-3 sm:!px-4 !text-[11px] sm:!text-[12px] !gap-1.5" />
            <div className="icon-btn"><i className="fa-solid fa-chart-column"></i></div>
            <div className="icon-btn">
              <i className="fa-regular fa-bell"></i><span className="notif-dot"></span>
            </div>
            <div className="topbar-avatar">S</div>
          </div>

          {/* CONTENT */}
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>

      <AddTransactionModal open={showAddTransactionModal} onOpenChange={setShowAddTransactionModal} />
      <OnboardingWizard />
    </div>
  );
}
