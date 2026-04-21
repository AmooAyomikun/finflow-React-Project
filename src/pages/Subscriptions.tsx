import { motion } from "framer-motion";
import { MOCK_DATA } from "@/lib/data";
import { Plus, Bell, Calendar, CreditCard, ExternalLink, MoreVertical, Search } from "lucide-react";

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" as const },
});

const fmt = (n: number) => '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits:2 });

export default function Subscriptions() {
  const recurring = MOCK_DATA.recurring;
  const totalMonthly = recurring.reduce((s, r) => s + r.amount, 0);

  return (
    <div className="page active fade-in" id="page-subscriptions">
      <div className="page-header">
        <div>
          <h1>Subscriptions</h1>
          <div className="page-header-sub">Monitor and manage your recurring payments</div>
        </div>
        <button className="topbar-btn primary">
          <Plus className="h-4 w-4 mr-2 inline" /> Add Subscription
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div {...fadeUp(0)}>
          <div className="card" style={{ padding: '24px', height: '100%' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Monthly Total</p>
            <h3 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text)', margin: 0 }}>{fmt(totalMonthly)}</h3>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--green)', background: 'var(--bg)', display: 'inline-block', padding: '2px 8px', borderRadius: '12px', marginTop: '8px', border: '1px solid var(--border)' }}>
              Across {recurring.length} services
            </p>
          </div>
        </motion.div>

        <motion.div {...fadeUp(1)}>
          <div className="card" style={{ padding: '24px', height: '100%' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Upcoming This Week</p>
            <h3 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text)', margin: 0 }}>{fmt(42.99)}</h3>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--violet)', background: 'var(--violet-soft)', display: 'inline-block', padding: '2px 8px', borderRadius: '12px', marginTop: '8px' }}>
              3 payments due
            </p>
          </div>
        </motion.div>

        <motion.div {...fadeUp(2)}>
          <div className="card" style={{ padding: '24px', height: '100%', background: 'linear-gradient(to bottom right, var(--amber), #E65100)', color: 'white', border: 'none' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Price Alerts</p>
            <h3 style={{ fontSize: '24px', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Bell className="h-5 w-5" /> 2 Changes
            </h3>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.15)', display: 'inline-block', padding: '2px 8px', borderRadius: '12px', marginTop: '8px' }}>
              Netflix & Adobe CC updated
            </p>
          </div>
        </motion.div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
         <div className="search-box" style={{ flex: '1 1 300px' }}>
            <Search className="h-4 w-4" style={{ color: 'var(--text3)' }} />
            <input 
              type="text" 
              placeholder="Search subscriptions, categories..." 
            />
         </div>
         <div style={{ display: 'flex', gap: '8px' }}>
            <button className="topbar-btn" style={{ fontWeight: 700 }}>Active</button>
            <button className="topbar-btn" style={{ fontWeight: 700 }}>Trial</button>
            <button className="topbar-btn" style={{ fontWeight: 700 }}>Canceled</button>
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {recurring.map((item, i) => (
          <motion.div key={i} {...fadeUp(i + 3)}>
            <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ padding: '20px', flex: 1 }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <div style={{ height: '48px', width: '48px', borderRadius: '16px', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', border: '1px solid var(--border)', color: 'var(--violet)' }}>
                       <i className={item.icon} />
                    </div>
                    <button style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer' }}>
                       <MoreVertical className="h-4 w-4" />
                    </button>
                 </div>

                 <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: '0 0 4px 0' }}>{item.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                       <span className="status pending" style={{ fontSize: '9px', padding: '2px 6px' }}>Interactive</span>
                       <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase' }}>Due in 4 days</span>
                    </div>
                 </div>

                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <div>
                       <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>Plan</p>
                       <p style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text)', margin: 0 }}>{item.freq}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                       <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>Price</p>
                       <p style={{ fontSize: '14px', fontWeight: 800, color: 'var(--violet)', margin: 0 }}>{fmt(item.amount)}</p>
                    </div>
                 </div>
              </div>
              
              <div style={{ background: 'var(--bg)', padding: '12px 20px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--text2)' }}>
                    <Calendar className="h-3 w-3" /> Next: {item.nextDate}
                 </div>
                 <button style={{ background: 'none', border: 'none', fontSize: '10px', fontWeight: 800, color: 'var(--violet)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                    Manage <ExternalLink className="h-3 w-3" />
                 </button>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div {...fadeUp(recurring.length + 3)}>
           <button style={{ width: '100%', height: '100%', minHeight: '220px', borderRadius: '24px', border: '2px dashed var(--border)', background: 'rgba(255,255,255,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ height: '48px', width: '48px', borderRadius: '50%', background: 'var(--violet-soft)', color: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Plus className="h-6 w-6" />
              </div>
              <div>
                 <p style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text)', marginBottom: '4px' }}>Add New Service</p>
                 <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase' }}>Track another subscription</p>
              </div>
           </button>
        </motion.div>
      </div>

      <div className="card" style={{ background: 'var(--text)', color: 'white', padding: '32px', position: 'relative', overflow: 'hidden' }}>
         <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px' }}>
            <span className="status pending" style={{ background: 'var(--violet)', color: 'white', border: 'none', marginBottom: '16px', display: 'inline-block' }}>SAVINGS ADVISOR</span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '16px', lineHeight: 1.2 }}>
               You could save up to <span style={{ color: '#64B5F6' }}>$140.00</span> / year by canceling unused services.
            </h2>
            <p style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: '24px', lineHeight: 1.5 }}>
               Our AI detected that you haven't used <span style={{ color: 'white', fontWeight: 700 }}>Adobe CC</span> or <span style={{ color: 'white', fontWeight: 700 }}>ChatGPT Plus</span> in the last 30 days.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
               <button className="topbar-btn primary" style={{ height: '44px', padding: '0 32px' }}>Review Services</button>
               <button className="topbar-btn" style={{ height: '44px', padding: '0 24px', color: 'rgba(255,255,255,0.9)', borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)' }}>Dismiss Recommendation</button>
            </div>
         </div>
         <div style={{ position: 'absolute', right: 0, bottom: 0, top: 0, width: '30%', background: 'linear-gradient(to left, rgba(21, 101, 192, 0.4), transparent)', pointerEvents: 'none' }} />
      </div>
    </div>
  );
}
