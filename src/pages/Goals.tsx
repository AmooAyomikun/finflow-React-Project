import { motion } from "framer-motion";
import { celebrateGoal } from "@/lib/confetti";
import { useAppStore } from "@/store/useAppStore";
import { MOCK_DATA } from "@/lib/data";
import { Plus, Target, Calendar, ArrowRight, PartyPopper } from "lucide-react";

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" as const },
});

const fmt = (n: number) => '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits:2 });

export default function Goals() {
  const { setShowAddTransactionModal } = useAppStore();
  const goals = MOCK_DATA.goals;

  return (
    <div className="page active fade-in" id="page-goals">
      <div className="page-header">
        <div>
          <h1>Savings Goals</h1>
          <div className="page-header-sub">Track your progress toward your financial milestones</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
            <button className="topbar-btn" onClick={celebrateGoal}>
              <PartyPopper className="h-4 w-4 mr-2 inline" /> Test Celebration
            </button>
            <button 
                onClick={() => setShowAddTransactionModal(true)}
                className="topbar-btn primary"
            >
              <Plus className="h-4 w-4 mr-2 inline" /> New Goal
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((g, i) => {
          const pct = Math.round((g.saved / g.target) * 100);
          const remaining = g.target - g.saved;

          return (
            <motion.div key={g.id} {...fadeUp(i)}>
              <div className="card" style={{ padding: 0, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '32px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '32px' }}>
                    <div style={{ height: '64px', width: '64px', borderRadius: '22px', backgroundColor: 'var(--bg)', color: g.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', border: '1px solid var(--border)' }}>
                       <i className={g.icon} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text)', marginBottom: '8px', lineHeight: 1 }}>{g.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <Calendar className="h-3 w-3" />
                        <span>Deadline: {g.deadline}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                       <span style={{ fontSize: '30px', fontWeight: 800, color: g.color }}>{pct}%</span>
                    </div>
                  </div>

                  <div style={{ marginBottom: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
                       <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px' }}>Progress</p>
                       <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px' }}>{fmt(remaining)} to go</p>
                    </div>
                    <div style={{ height: '12px', borderRadius: '10px', background: 'var(--bg)', overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.3 + i * 0.05, duration: 1.2, ease: "easeOut" }}
                        style={{ height: '100%', borderRadius: '10px', backgroundColor: g.color }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                    <div>
                       <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Current Savings</p>
                       <p style={{ fontSize: '30px', fontWeight: 800, color: 'var(--text)', lineHeight: 1 }}>{fmt(g.saved)}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                       <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Target</p>
                       <p style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text3)', lineHeight: 1 }}>{fmt(g.target)}</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <button className="topbar-btn" style={{ height: '48px', justifyContent: 'center' }}>
                        Edit Detail
                      </button>
                      <button 
                        onClick={() => setShowAddTransactionModal(true)}
                        className="topbar-btn primary"
                        style={{ height: '48px', justifyContent: 'center' }}
                      >
                        Contribute <ArrowRight className="h-4 w-4 ml-2" />
                      </button>
                  </div>
                </div>
                <div style={{ padding: '16px 32px', background: 'var(--bg)', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                   <div style={{ height: '32px', width: '32px', borderRadius: '50%', backgroundColor: 'var(--card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Target className="h-4 w-4 text-[#1565C0]" />
                   </div>
                   <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text2)' }}>
                      You're on track to reach this goal by <span style={{ fontWeight: 700, color: 'var(--text)' }}>{g.deadline}</span> if you save <span style={{ fontWeight: 800, color: 'var(--green)' }}>$240.00/mo</span>.
                   </p>
                </div>
              </div>
            </motion.div>
          );
        })}

        <motion.div {...fadeUp(goals.length)}>
            <button 
              onClick={() => setShowAddTransactionModal(true)}
              style={{ width: '100%', height: '100%', minHeight: '340px', borderRadius: '28px', border: '2px dashed var(--border)', background: 'rgba(255,255,255,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', cursor: 'pointer', transition: 'all 0.2s' }}
            >
                <div style={{ height: '64px', width: '64px', borderRadius: '50%', background: 'var(--violet-soft)', color: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus className="h-8 w-8" />
                </div>
                <div>
                    <p style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)', marginBottom: '4px' }}>Create New Saving Goal</p>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase' }}>What are you dreaming of?</p>
                </div>
            </button>
        </motion.div>
      </div>
    </div>
  );
}
