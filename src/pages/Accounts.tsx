import React from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { Building2, Plus, ExternalLink, RefreshCw, MoreVertical, CreditCard, Wallet, Banknote } from "lucide-react";

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" as const },
});

const fmt = (n: number) => '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits:2 });

export default function Accounts() {
  const { setShowAddTransactionModal, accounts } = useAppStore();

  return (
    <div className="page active fade-in" id="page-accounts">
      <div className="page-header">
        <div>
          <h1>Connected Accounts</h1>
          <div className="page-header-sub">Manage your bank accounts, credit cards and wallets</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {accounts.map((acc, i) => (
          <motion.div key={acc.id} {...fadeUp(i)}>
            <div className="card" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', padding: 0 }}>
              <div style={{ padding: '32px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ height: '56px', width: '56px', borderRadius: '16px', background: 'var(--bg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--violet)', position: 'relative' }}>
                              {acc.type === 'checking' ? <Building2 className="h-6 w-6" /> : acc.type === 'savings' ? <Wallet className="h-6 w-6" /> : <CreditCard className="h-6 w-6" />}
                              <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', height: '20px', width: '20px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                 <RefreshCw className="h-3 w-3" style={{ color: 'var(--green)' }} />
                              </div>
                          </div>
                          <div>
                              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text)', margin: 0 }}>{acc.name}</h3>
                              <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '2px' }}>{acc.institution || acc.type}</p>
                          </div>
                      </div>
                      <button style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', padding: '4px' }}>
                         <MoreVertical className="h-4 w-4" />
                      </button>
                  </div>
                  
                  <div>
                      <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Current Balance</p>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                         <p style={{ fontSize: '36px', fontWeight: 800, color: acc.balance >= 0 ? 'var(--text)' : 'var(--red)', margin: 0, lineHeight: 1 }}>
                             {fmt(acc.balance)}
                         </p>
                         <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase' }}>{acc.currency || 'USD'}</span>
                      </div>
                  </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '24px', padding: '24px 32px', borderTop: '1px solid var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                     <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Sync Status</span>
                     <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ height: '6px', width: '6px', borderRadius: '50%', background: 'var(--green)' }} className="animate-pulse" /> Updated Today
                     </span>
                  </div>
                  <button className="topbar-btn" style={{ color: 'var(--violet)' }}>
                     View Details <ExternalLink className="h-3 w-3 ml-1.5 inline" />
                  </button>
              </div>

              {acc.balance < 0 && (
                <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
                  <span className="status failed" style={{ fontSize: '9px', padding: '4px 8px' }}>DEBT</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        <motion.div {...fadeUp(accounts.length)}>
          <button 
            onClick={() => setShowAddTransactionModal(true)}
            style={{ width: '100%', height: '100%', minHeight: '260px', borderRadius: '24px', border: '2px dashed var(--border)', background: 'rgba(255,255,255,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', cursor: 'pointer', transition: 'all 0.2s' }}
          >
              <div style={{ height: '56px', width: '56px', borderRadius: '50%', background: 'var(--bg)', color: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Plus className="h-6 w-6" />
              </div>
              <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text)', margin: '0 0 4px 0' }}>Add Manual Account</p>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>For cash or offline assets</p>
              </div>
          </button>
        </motion.div>
      </div>

      <div className="card" style={{ background: 'var(--bg)', padding: '24px' }}>
         <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '24px' }}>
            <div style={{ height: '64px', width: '64px', borderRadius: '16px', background: 'var(--card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--violet)', flexShrink: 0 }}>
               <Banknote className="h-8 w-8" />
            </div>
            <div style={{ flex: 1, minWidth: '250px' }}>
               <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text)', marginBottom: '4px' }}>Looking for a better checking account?</h3>
               <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text2)' }}>Based on your activity, we found 3 partner cards that could save you <span style={{ color: 'var(--green)', fontWeight: 700 }}>$250/year</span> in fees.</p>
            </div>
            <button className="topbar-btn primary" style={{ height: '44px', padding: '0 32px' }}>Explore Offers</button>
         </div>
      </div>
    </div>
  );
}
