import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { CATEGORY_META } from "@/lib/data";
import { Plus, AlertTriangle, TrendingUp, Filter } from "lucide-react";

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" as const },
});

const fmt = (n: number) => '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits:2 });

export default function Budgets() {
  const { setShowAddTransactionModal, transactions: txs } = useAppStore();
  
  // Static data for now (could be moved to store later)
  const budgets = [
    { id: 1, category:'food', limit:600, color:'#1565C0' },
    { id: 2, category:'shopping', limit:400, color:'#7C6EF5' },
    { id: 3, category:'entertainment', limit:200, color:'#F59E0B' },
    { id: 4, category:'transport', limit:150, color:'#10D67E' },
    { id: 5, category:'utilities', limit:100, color:'#06B6D4' },
  ];

  const getCategorySpend = (cat: string) => {
    return txs.filter(t => t.type === 'expense' && t.category === cat).reduce((s, t) => s + t.amount, 0);
  };

  const totalBudget = budgets.reduce((a, b) => a + b.limit, 0);
  const totalSpent = budgets.reduce((a, b) => a + getCategorySpend(b.category), 0);
  const budgetStatus = totalSpent > totalBudget ? 'over' : (totalSpent / totalBudget) > 0.8 ? 'warning' : 'good';

  return (
    <div className="page active fade-in" id="page-budgets">
      <div className="page-header">
        <div>
          <h1>Budgets</h1>
          <div className="page-header-sub">Track your spending against monthly limits</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
            <button className="topbar-btn">
              <Filter className="h-4 w-4 mr-2 inline" /> Filters
            </button>
            <button 
                onClick={() => setShowAddTransactionModal(true)}
                className="topbar-btn primary"
            >
              <Plus className="h-4 w-4 mr-2 inline" /> Add Category
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         <motion.div className="lg:col-span-2" {...fadeUp(0)}>
            <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Total Budget Progress</p>
                    <h3 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text)' }}>
                        {fmt(totalSpent)} <span style={{ color: 'var(--text2)', fontSize: '18px', fontWeight: 700 }}>/ {fmt(totalBudget)}</span>
                    </h3>
                    </div>
                    <span className={`status ${budgetStatus === 'over' ? 'failed' : budgetStatus === 'warning' ? 'pending' : 'paid'}`} style={{ padding: '4px 10px', fontSize: '12px' }}>
                    {Math.round((totalSpent / totalBudget) * 100)}% Used
                    </span>
                </div>
                <div style={{ height: '12px', width: '100%', background: 'var(--bg)', borderRadius: '10px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div 
                    style={{ 
                        height: '100%', 
                        borderRadius: '10px', 
                        transition: 'all 1s',
                        width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%`, 
                        backgroundColor: budgetStatus === 'over' ? 'var(--red)' : budgetStatus === 'warning' ? 'var(--amber)' : 'var(--green)' 
                    }} 
                    />
                </div>
                <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text2)' }}>
                    {budgetStatus === 'over' ? 'You have exceeded your total budget' : budgetStatus === 'warning' ? 'You are close to your budget limit' : 'You are well within your budget'}
                </p>
            </div>
         </motion.div>
         
         <motion.div {...fadeUp(1)}>
            <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Safe to Spend</p>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--green)' }}>{fmt(Math.max(totalBudget - totalSpent, 0))}</h3>
                <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', marginTop: '6px' }}>For the next 12 days</p>
            </div>
         </motion.div>

         <motion.div {...fadeUp(2)}>
            <div className="card" style={{ height: '100%', background: 'var(--text)', color: 'var(--base)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ position: 'relative', zIndex: 10 }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>AI Optimization</p>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--bg2)' }}>
                        <TrendingUp className="h-5 w-5 text-blue-400" /> Save $120.00
                    </h3>
                    <p style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginTop: '8px' }}>Adjusting food budget could save more.</p>
                </div>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', background: 'var(--violet)', opacity: 0.2, filter: 'blur(30px)', borderRadius: '50%', transform: 'translate(40px, -40px)' }} />
            </div>
         </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((b, i) => {
          const meta = CATEGORY_META[b.category as keyof typeof CATEGORY_META];
          const spent = getCategorySpend(b.category);
          const pct = Math.round((spent / b.limit) * 100);
          const isOver = spent > b.limit;
          const isWarn = pct >= 80;

          return (
            <motion.div key={b.id} {...fadeUp(i + 3)}>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ height: '48px', width: '48px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: `${b.color}15`, color: b.color }}>
                       <i className={`${meta?.icon || 'fa-solid fa-box'} font-lg`} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 800, fontSize: '15px', color: 'var(--text)', marginBottom: '4px' }}>{meta?.label || b.category}</p>
                      <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px', color: isOver ? 'var(--red)' : isWarn ? 'var(--amber)' : 'var(--green)' }}>
                        {isOver ? <AlertTriangle className="h-3 w-3" /> : null}
                        {isOver ? `Exceeded by ${fmt(spent - b.limit)}` : `${fmt(b.limit - spent)} left`}
                      </p>
                    </div>
                    <span style={{ fontSize: '20px', fontWeight: 800, color: isOver ? 'var(--red)' : isWarn ? 'var(--amber)' : 'var(--text)' }}>{pct}%</span>
                  </div>
                  
                  <div style={{ height: '8px', width: '100%', background: 'var(--bg)', borderRadius: '10px', overflow: 'hidden' }}>
                      <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(pct, 100)}%` }}
                          transition={{ delay: 0.3 + i * 0.05, duration: 1, ease: "easeOut" }}
                          style={{ 
                             height: '100%', 
                             borderRadius: '10px', 
                             backgroundColor: isOver ? 'var(--red)' : isWarn ? 'var(--amber)' : b.color 
                          }}
                      />
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <span>{fmt(spent)} Spent</span>
                    <span>{fmt(b.limit)} Goal</span>
                  </div>
                </div>
                <div style={{ padding: '12px 24px', background: 'var(--bg)', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                   <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text2)', textTransform: 'uppercase' }}>LAST UPDATED: TODAY</p>
                   <button style={{ background: 'none', border: 'none', fontSize: '10px', fontWeight: 800, color: 'var(--violet)', textTransform: 'uppercase', cursor: 'pointer' }}>Refine Plan</button>
                </div>
              </div>
            </motion.div>
          );
        })}

        <motion.div {...fadeUp(budgets.length + 3)}>
           <button style={{ width: '100%', height: '100%', minHeight: '200px', borderRadius: '20px', border: '2px dashed var(--border)', background: 'rgba(255,255,255,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ height: '48px', width: '48px', borderRadius: '50%', background: 'var(--violet-soft)', color: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Plus className="h-6 w-6" />
              </div>
              <div>
                 <p style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text)', marginBottom: '4px' }}>New Budget Category</p>
                 <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase' }}>Plan your spend better</p>
              </div>
           </button>
        </motion.div>
      </div>
    </div>
  );
}
