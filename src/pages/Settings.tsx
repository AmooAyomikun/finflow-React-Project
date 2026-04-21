import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { User, Shield, Bell, CreditCard, Check } from "lucide-react";

export default function Settings() {
  return (
    <div className="page active fade-in" id="page-settings">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <div className="page-header-sub">Manage your account preferences and application settings</div>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '4px', height: '48px', borderRadius: '12px', marginBottom: '32px', display: 'flex', overflowX: 'auto', overflowY: 'hidden' }}>
          <TabsTrigger value="profile" style={{ borderRadius: '8px', padding: '0 24px', fontWeight: 700 }} className="data-[state=active]:bg-[#1565C0] data-[state=active]:text-white">
            <User className="h-4 w-4 mr-2" /> Profile
          </TabsTrigger>
          <TabsTrigger value="security" style={{ borderRadius: '8px', padding: '0 24px', fontWeight: 700 }} className="data-[state=active]:bg-[#1565C0] data-[state=active]:text-white">
            <Shield className="h-4 w-4 mr-2" /> Security
          </TabsTrigger>
          <TabsTrigger value="notifications" style={{ borderRadius: '8px', padding: '0 24px', fontWeight: 700 }} className="data-[state=active]:bg-[#1565C0] data-[state=active]:text-white">
            <Bell className="h-4 w-4 mr-2" /> Alerts
          </TabsTrigger>
          <TabsTrigger value="billing" style={{ borderRadius: '8px', padding: '0 24px', fontWeight: 700 }} className="data-[state=active]:bg-[#1565C0] data-[state=active]:text-white">
            <CreditCard className="h-4 w-4 mr-2" /> Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="card" style={{ padding: '32px' }}>
             <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text)', marginBottom: '24px' }}>Profile Information</h3>
             
             <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '16px', background: 'var(--bg)', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '24px' }}>
                <div style={{ height: '80px', width: '80px', borderRadius: '50%', background: 'var(--violet)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', border: '4px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontWeight: 800 }}>SA</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <button className="topbar-btn primary" style={{ width: 'fit-content', height: '40px' }}>Upload New Photo</button>
                   <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px' }}>JPG, GIF or PNG. Max size of 800K</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
                   <input className="form-input" style={{ width: '100%', height: '44px' }} defaultValue="Sade Adeyemi" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
                   <input className="form-input" type="email" style={{ width: '100%', height: '44px' }} defaultValue="sade@example.com" />
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '1px' }}>Base Currency</label>
                   <select className="form-input" style={{ width: '100%', height: '44px' }} defaultValue="usd">
                      <option value="usd">USD — Dollar</option>
                      <option value="eur">EUR — Euro</option>
                      <option value="gbp">GBP — Pound</option>
                      <option value="ngn">NGN — Naira</option>
                   </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '1px' }}>Timezone</label>
                   <select className="form-input" style={{ width: '100%', height: '44px' }} defaultValue="wat">
                      <option value="utc">UTC (Universal)</option>
                      <option value="wat">WAT (West Africa)</option>
                      <option value="est">EST (Eastern)</option>
                      <option value="pst">PST (Pacific)</option>
                   </select>
                </div>
             </div>

             <div style={{ paddingTop: '24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="topbar-btn primary" style={{ height: '44px', padding: '0 32px' }}>Save Profile</button>
             </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="card" style={{ padding: '32px' }}>
             <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text)', marginBottom: '24px' }}>Change Password</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Password</label>
                   <input className="form-input" type="password" style={{ width: '100%', height: '44px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '1px' }}>New Password</label>
                   <input className="form-input" type="password" style={{ width: '100%', height: '44px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '1px' }}>Confirm New Password</label>
                   <input className="form-input" type="password" style={{ width: '100%', height: '44px' }} />
                </div>
             </div>
             <div style={{ paddingTop: '24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="topbar-btn primary" style={{ height: '44px', padding: '0 32px' }}>Update Password</button>
             </div>
          </div>
          
          <div className="card" style={{ padding: '24px', background: 'rgba(198, 40, 40, 0.05)', border: '1px solid rgba(198, 40, 40, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
             <div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--red)', marginBottom: '4px' }}>Danger Zone</h3>
                <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text2)' }}>Permanently delete your account and all associated data.</p>
             </div>
             <button className="topbar-btn" style={{ height: '44px', padding: '0 24px', color: 'var(--red)', background: 'white' }}>Delete Account</button>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div className="card" style={{ padding: '32px' }}>
             <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text)', marginBottom: '24px' }}>Alert Preferences</h3>
             <div style={{ display: 'flex', flexDirection: 'column' }}>
               {[
                 { label: "Budget Threshold Alerts", desc: "Notify when a category exceeds 80% usage" },
                 { label: "Subscription Price Changes", desc: "Alert when a recurring cost increases" },
                 { label: "Weekly Financial Summary", desc: "Detailed breakdown of weekly cashflow" },
                 { label: "New Login Detected", desc: "Security alert for logins from new devices" },
               ].map((n, idx) => (
                 <div key={n.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: idx < 3 ? '1px solid var(--border)' : 'none', cursor: 'pointer' }}>
                   <div>
                     <p style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text)', marginBottom: '4px' }}>{n.label}</p>
                     <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text2)' }}>{n.desc}</p>
                   </div>
                   <Switch className="data-[state=checked]:bg-[#1565C0]" />
                 </div>
               ))}
             </div>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="card" style={{ padding: '32px', height: '100%' }}>
                <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px' }}>Current Plan</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <span className="status paid" style={{ fontSize: '11px', padding: '4px 12px' }}>ACTIVE</span>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)' }}>Starter Plan</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '24px' }}>
                   <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text2)' }}>Monthly cost</span>
                   <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text)' }}>$0.00 / mo</span>
                </div>
                <button className="topbar-btn" style={{ width: '100%', height: '44px', justifyContent: 'center' }}>View Invoices</button>
             </div>

             <div className="card" style={{ padding: '32px', height: '100%', background: 'linear-gradient(to bottom right, var(--violet), #0D47A1)', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'relative', zIndex: 10 }}>
                   <p style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px' }}>Upgrade to Pro</p>
                   <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
                      <span style={{ fontSize: '36px', fontWeight: 800 }}>$5</span>
                      <span style={{ fontSize: '18px', fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>/ Month</span>
                   </div>
                   <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                     {["Unlimited Accounts", "Advanced Analytics", "CSV & PDF Exports", "Custom Categories"].map((f) => (
                       <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', fontWeight: 700 }}>
                          <div style={{ height: '20px', width: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                             <Check className="h-3 w-3" style={{ color: '#64B5F6' }} />
                          </div>
                          {f}
                       </li>
                     ))}
                   </ul>
                   <button className="topbar-btn" style={{ width: '100%', height: '48px', justifyContent: 'center', background: 'white', color: 'var(--violet)' }}>
                      Go Pro Now
                   </button>
                </div>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '160px', height: '160px', background: 'white', opacity: 0.05, filter: 'blur(30px)', borderRadius: '50%', transform: 'translate(40px, -40px)' }} />
             </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
