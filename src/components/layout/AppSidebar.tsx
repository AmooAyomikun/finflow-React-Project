import { useState } from "react";
import { NavLink } from "react-router-dom";

export function AppSidebar({ isOpen, onClose }: { isOpen?: boolean, onClose?: () => void }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <nav className={`sidebar ${collapsed ? "collapsed" : ""} ${isOpen ? "open" : ""}`} id="sidebar">
      <div className="sidebar-top">
        <NavLink to="/" className="logo" onClick={onClose}>
          <div className="logo-icon"><i className="fa-solid fa-gem"></i></div>
          <span className="logo-text">FinFlow</span>
        </NavLink>
        <div className="collapse-btn collapse-arrow" onClick={toggleSidebar} title="Collapse">
           <i className="fa-solid fa-chevron-left"></i>
        </div>
      </div>

      <div className="sidebar-body">
        <div className="sidebar-section nav-label">MAIN</div>
        <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} onClick={onClose}>
          <span className="nav-icon"><i className="fa-solid fa-table-columns"></i></span>
          <span className="nav-text">Overview</span>
        </NavLink>
        <NavLink to="/accounts" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} onClick={onClose}>
          <span className="nav-icon"><i className="fa-solid fa-building-columns"></i></span>
          <span className="nav-text">Wallets & Banks</span>
        </NavLink>
        <NavLink to="/transactions" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} onClick={onClose}>
          <span className="nav-icon"><i className="fa-solid fa-right-left"></i></span>
          <span className="nav-text">Transactions</span>
          <span className="nav-badge">5</span>
        </NavLink>
        <NavLink to="/budgets" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} onClick={onClose}>
          <span className="nav-icon"><i className="fa-solid fa-chart-column"></i></span>
          <span className="nav-text">Budgets</span>
        </NavLink>
        <NavLink to="/goals" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} onClick={onClose}>
          <span className="nav-icon"><i className="fa-solid fa-bullseye"></i></span>
          <span className="nav-text">Savings Goals</span>
        </NavLink>

        <div className="sidebar-section nav-label">FEATURES</div>
        <NavLink to="/ai-insights" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} onClick={onClose}>
          <span className="nav-icon"><i className="fa-solid fa-lightbulb"></i></span>
          <span className="nav-text">AI Insights</span>
        </NavLink>
        <NavLink to="/ai-assistant" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} onClick={onClose}>
          <span className="nav-icon"><i className="fa-solid fa-wand-magic-sparkles"></i></span>
          <span className="nav-text">AI Assistant</span>
        </NavLink>
        
        <div className="sidebar-section nav-label">INSIGHTS</div>
        <NavLink to="/analytics" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} onClick={onClose}>
          <span className="nav-icon"><i className="fa-solid fa-chart-line"></i></span>
          <span className="nav-text">Analytics</span>
        </NavLink>
        <NavLink to="/investments" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} onClick={onClose}>
          <span className="nav-icon"><i className="fa-solid fa-chart-pie"></i></span>
          <span className="nav-text">Portfolio</span>
        </NavLink>
        <NavLink to="/recurring" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} onClick={onClose}>
          <span className="nav-icon"><i className="fa-solid fa-rotate"></i></span>
          <span className="nav-text">Subscriptions</span>
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} onClick={onClose}>
          <span className="nav-icon"><i className="fa-solid fa-file-invoice"></i></span>
          <span className="nav-text">Reports</span>
        </NavLink>

        <div className="sidebar-section nav-label">TOOLS</div>
        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} onClick={onClose}>
          <span className="nav-icon"><i className="fa-solid fa-gear"></i></span>
          <span className="nav-text">Settings</span>
        </NavLink>
        <NavLink to="/help" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} onClick={onClose}>
          <span className="nav-icon"><i className="fa-solid fa-circle-question"></i></span>
          <span className="nav-text">Help Center</span>
        </NavLink>
      </div>

      <div className="sidebar-footer">
        <div className="upgrade-card">
          <h4><i className="fa-solid fa-bolt text-[#6C5CE7]"></i> Upgrade to Pro</h4>
          <div className="trial-text">Free trial · 6 days left</div>
          <div className="trial-bar"><div className="trial-fill"></div></div>
          <p>Get insights on unlimited accounts and budgets. Simplify your finances.</p>
          <button className="upgrade-btn">Upgrade Now</button>
        </div>
        <div className="user-row">
          <div className="user-avatar">S</div>
          <div>
            <div className="user-name">Sade Adeyemi</div>
            <div className="user-email">sade@example.com</div>
          </div>
          <span className="user-arrow"><i className="fa-solid fa-chevron-down"></i></span>
        </div>
      </div>
    </nav>
  );
}
