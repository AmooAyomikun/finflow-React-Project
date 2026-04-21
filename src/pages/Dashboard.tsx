import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { CATEGORY_META } from "@/lib/data";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const fmt = (n: number) => '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function Dashboard() {
  const navigate = useNavigate();
  const { transactions: txs, accounts, setShowAddTransactionModal } = useAppStore();
  
  const [chartPeriod, setChartPeriod] = useState("1M");

  // Static goals for now
  const goals = [
    { id: 1, name: 'Vacation', icon: 'fa-solid fa-plane', target: 3000, saved: 2300, deadline: 'Nov 2025', color: '#7C6EF5' },
    { id: 2, name: 'New House', icon: 'fa-solid fa-house', target: 10000, saved: 5800, deadline: 'Jul 2026', color: '#10D67E' },
    { id: 3, name: 'New Car', icon: 'fa-solid fa-car', target: 5000, saved: 1450, deadline: 'Mar 2026', color: '#F59E0B' },
    { id: 4, name: 'Emergency Fund', icon: 'fa-solid fa-shield-halved', target: 3000, saved: 1000, deadline: 'Dec 2025', color: '#FF4D6A' },
  ];

  const investments = [
    { name: 'Apple Inc.', symbol: 'AAPL', qty: 10, avgPrice: 160, current: 195, logo: 'fa-brands fa-apple', color: '#555' },
    { name: 'Tesla', symbol: 'TSLA', qty: 5, avgPrice: 400, current: 230, logo: 'fa-solid fa-bolt', color: '#E31937' },
    { name: 'Bitcoin', symbol: 'BTC', qty: 0.05, avgPrice: 22000, current: 67000, logo: 'fa-brands fa-bitcoin', color: '#F7931A' },
    { name: 'Ethereum', symbol: 'ETH', qty: 1.2, avgPrice: 1800, current: 3500, logo: 'fa-brands fa-ethereum', color: '#627EEA' },
  ];

  const totalIncome = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const netWorth = accounts.reduce((s, a) => s + a.balance, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  // Recent 5 transactions
  const recentTxs = [...txs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  const getCatSpend = (cat: string) => txs.filter(t => t.type === 'expense' && t.category === cat).reduce((s, t) => s + t.amount, 0);

  // Cash breakdown datasets
  const cashDatasets: Record<string, [number[], number[]]> = {
    '1M': [[3200, 3800, 4350], [2400, 2800, 2890]],
    '3M': [[3400, 3600, 3800, 4100, 4200, 4350], [2200, 2400, 2600, 2700, 2750, 2890]],
    '6M': [[2900, 3100, 3200, 3400, 3600, 3800, 4000, 4100, 4200, 4250, 4300, 4350], [2100, 2200, 2300, 2400, 2500, 2600, 2650, 2700, 2750, 2800, 2850, 2890]],
    '1Y': [[2500, 2700, 2900, 3100, 3200, 3400, 3600, 3800, 4000, 4100, 4200, 4350], [1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2750, 2800, 2890]]
  };
  
  const getCashLabels = () => {
    if (chartPeriod === '1M') return ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    if (chartPeriod === '3M') return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return MONTHS;
  };

  const currentDataset = cashDatasets[chartPeriod] || cashDatasets['1M'];

  const barChartData = {
    labels: getCashLabels(),
    datasets: [
      { label: 'Income', data: currentDataset[0], backgroundColor: 'rgba(16,214,126,.7)', borderRadius: 5, borderSkipped: false },
      { label: 'Expenses', data: currentDataset[1], backgroundColor: 'rgba(124,110,245,.7)', borderRadius: 5, borderSkipped: false },
    ]
  };

  const donutData = {
    labels: ['Essentials', 'Lifestyle', 'Medical'],
    datasets: [{
      data: [40, 35, 25],
      backgroundColor: ['#7C6EF5', '#10D67E', '#F59E0B'],
      borderWidth: 3,
      borderColor: '#151827',
      hoverOffset: 6
    }]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' as const, labels: { color: '#8B9CC8', font: { size: 11 }, usePointStyle: true, pointStyleWidth: 8 } },
      tooltip: { backgroundColor: '#1C2035', borderColor: '#222640', borderWidth: 1, titleColor: '#F0F4FF', bodyColor: '#8B9CC8', callbacks: { label: (c: any) => ' ' + fmt(c.parsed.y) } }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#4A5680', font: { size: 11 } } },
      y: { grid: { color: 'rgba(255,255,255,.04)' }, ticks: { color: '#4A5680', font: { size: 11 }, callback: (v: any) => '$' + v / 1000 + 'k' } }
    }
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#1C2035', borderColor: '#222640', borderWidth: 1, titleColor: '#F0F4FF', bodyColor: '#8B9CC8' }
    }
  };

  return (
    <div className="page active fade-in" id="page-overview">
      {/* Quick Actions */}
      <div className="quick-actions">
        <div className="qa-btn primary" onClick={() => setShowAddTransactionModal(true)}>
          <span className="qa-icon"><i className="fa-solid fa-plus"></i></span> Add Funds
        </div>
        <div className="qa-btn" onClick={() => setShowAddTransactionModal(true)}>
          <span className="qa-icon"><i className="fa-solid fa-credit-card"></i></span> Pay Bill
        </div>
        <div className="qa-btn" onClick={() => navigate('/reports')}>
          <span className="qa-icon"><i className="fa-solid fa-file-invoice"></i></span> Reports
        </div>
        <div className="qa-btn" onClick={() => navigate('/analytics')}>
          <span className="qa-icon"><i className="fa-solid fa-chart-line"></i></span> Analytics
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="stat-cards">
        <div className="stat-card revenue">
          <div className="stat-label">
            <div className="stat-icon c-green"><i className="fa-solid fa-sack-dollar"></i></div> Total Income
          </div>
          <div className="stat-value">{fmt(totalIncome)}</div>
          <div className="stat-trend up"><i className="fa-solid fa-arrow-up"></i> 6.4% <span className="stat-trend-lbl">from last month</span></div>
        </div>
        <div className="stat-card expenses">
          <div className="stat-label">
            <div className="stat-icon c-red"><i className="fa-solid fa-money-bill-transfer"></i></div> Total Expenses
          </div>
          <div className="stat-value">{fmt(totalExpense)}</div>
          <div className="stat-trend down"><i className="fa-solid fa-arrow-down"></i> 0.11% <span className="stat-trend-lbl">from last month</span></div>
        </div>
        <div className="stat-card rate">
          <div className="stat-label">
            <div className="stat-icon c-violet"><i className="fa-solid fa-chart-column"></i></div> Savings Rate
          </div>
          <div className="stat-value">{savingsRate.toFixed(1)}%</div>
          <div className="stat-trend up"><i className="fa-solid fa-arrow-up"></i> 0.8% <span className="stat-trend-lbl">from last month</span></div>
        </div>
      </div>

      {/* ROW 2: Cash Breakdown + Wallet */}
      <div className="grid-70-30 mb-16">
        {/* Cash Breakdown Chart */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Cash Breakdown</span>
            <div className="card-actions">
              <div className="tabs" style={{ marginBottom: 0, width: "auto" }}>
                {['1M', '3M', '6M', '1Y'].map(pd => (
                  <div key={pd} className={`tab ${chartPeriod === pd ? 'active' : ''}`} onClick={() => setChartPeriod(pd)}>
                    {pd}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="chart-wrap chart-h200">
            <Bar data={barChartData} options={barOptions} />
          </div>
        </div>

        {/* Personal Wallet */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Personal Wallet</span>
            <span className="see-all" onClick={() => navigate('/accounts')}>View All ›</span>
          </div>
          <div style={{ fontSize: "11px", color: "var(--text2)", marginBottom: "6px" }}>Monthly Spending Progress</div>
          <div style={{ fontSize: "11px", color: "var(--text2)", marginBottom: "8px" }}>Almost there! Only 28% of budget left.</div>
          <div className="progress mb-16">
            <div className="progress-fill" style={{ width: "72%", background: "var(--violet)" }}></div>
          </div>
          <div className="account-cards-grid">
            <div className="wallet-card" style={{ background: "linear-gradient(135deg,#1A1A3E,#2D1B69)" }}>
              <div className="wc-label">GTBANK</div>
              <div className="wc-balance">$8,420</div>
              <div className="wc-chip">✓ Checking</div>
              <div className="wc-number">•••• 6541</div>
            </div>
            <div className="wallet-card" style={{ background: "linear-gradient(135deg,#0D2818,#0F4C2A)" }}>
              <div className="wc-label">UBA SAVINGS</div>
              <div className="wc-balance">$12,300</div>
              <div className="wc-chip c-green">↑ +2.1%</div>
              <div className="wc-number">•••• 2290</div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", paddingTop: "10px", borderTop: "1px solid var(--border)" }}>
            <div className="mini-stat" style={{ flex: 1, marginRight: "6px" }}>
              <div className="mini-stat-lbl">Total Accounts</div>
              <div className="mini-stat-val">3</div>
            </div>
            <div className="mini-stat" style={{ flex: 1 }}>
              <div className="mini-stat-lbl">Net Worth</div>
              <div className="mini-stat-val" style={{ color: "var(--green)" }}>{fmt(netWorth)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 3: Budget + Transactions + Spending Donut */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        {/* Budget Allocation */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Total Budgets</span>
            <span className="see-all" onClick={() => navigate('/budgets')}>Manage ›</span>
          </div>
          <div style={{ fontFamily: "var(--font-d)", fontSize: "24px", color: "var(--text)", marginBottom: "4px" }}>$6,400</div>
          <div style={{ fontSize: "11px", color: "var(--text2)", marginBottom: "8px" }}>Expenses <i className="fa-solid fa-chevron-down border-0 ml-1"></i></div>
          <div className="alloc-bar">
            <div className="alloc-seg" style={{ flex: 2.8, background: "#7C6EF5" }}></div>
            <div className="alloc-seg" style={{ flex: 2, background: "#10D67E" }}></div>
            <div className="alloc-seg" style={{ flex: 1.6, background: "#F59E0B" }}></div>
            <div className="alloc-seg" style={{ flex: 2, background: "#FF4D6A" }}></div>
          </div>
          <div className="budget-rows">
            {[
              { name: 'Essentials', icon: <i className="fa-solid fa-cart-shopping"></i>, spent: 1050, limit: 2800, color: 'var(--violet)', bg: 'rgba(124,110,245,.15)', pct: 62 },
              { name: 'Lifestyles', icon: <i className="fa-solid fa-shoe-prints"></i>, spent: 1100, limit: 2000, color: 'var(--green)', bg: 'rgba(16,214,126,.15)', pct: 45 },
              { name: 'Occasional', icon: <i className="fa-solid fa-gift"></i>, spent: 430, limit: 1600, color: 'var(--amber)', bg: 'rgba(245,158,11,.15)', pct: 73 },
            ].map(b => (
              <div className="budget-row" key={b.name}>
                <div className="budget-row-icon" style={{ background: b.bg }}>{b.icon}</div>
                <div style={{ flex: 1 }}>
                  <div className="budget-row-name">{b.name}</div>
                  <div className="budget-row-sub">-$1,050 spent</div>
                </div>
                <div className="budget-row-right">
                  <div className="budget-row-val" style={{ color: b.color }}>{fmt(b.limit - b.spent)} <span style={{ fontSize: "10px", color: "var(--text2)" }}>({b.pct}%)</span></div>
                  <div className="budget-row-lim">Budget {fmt(b.limit)}</div>
                  <div className="budget-mini-bar">
                    <div className="budget-mini-fill" style={{ width: `${b.pct}%`, background: b.color }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Transactions</span>
            <span className="see-all" onClick={() => navigate('/transactions')}>See all ›</span>
          </div>
          <div className="tx-list">
            {recentTxs.map(tx => {
              const meta = CATEGORY_META[tx.category] || { icon: 'fa-solid fa-box', color: '#555', label: tx.category };
              const isInc = tx.type === 'income';
              const iconChar = meta.icon.includes('food') ? <i className="fa-solid fa-burger" /> : meta.icon.includes('cart') ? <i className="fa-solid fa-bag-shopping" /> : meta.icon.includes('car') ? <i className="fa-solid fa-car" /> : <i className="fa-solid fa-box" />;
              
              return (
                <div className="tx-row" key={tx.id}>
                  <div className="tx-icon" style={{ background: `${meta.color}22`, color: meta.color }}>
                    {iconChar}
                  </div>
                  <div>
                    <div className="tx-name">{tx.merchant}</div>
                    <div className="tx-cat">{tx.category}</div>
                  </div>
                  <div>
                    <span className={`tx-tag ${isInc ? 'tag-essential' : 'tag-lifestyle'}`}>{tx.category.split(' ')[0]}</span>
                  </div>
                  <div className="tx-right">
                    <div className={`tx-amt ${isInc ? 'inc' : 'exp'}`}>
                      {isInc ? '+' : '-'}{fmt(tx.amount)}
                    </div>
                    <div className="tx-date">{tx.date}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Spending Donut */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Spending This Month</span>
            <div className="dots-btn">···</div>
          </div>
          <div style={{ fontFamily: "var(--font-d)", fontSize: "22px", color: "var(--text)", marginBottom: "12px" }}>$350.00</div>
          <div className="donut-wrap chart-h140" style={{ height: "140px" }}>
            <Doughnut data={donutData} options={donutOptions} />
            <div className="donut-center">
              <div className="donut-center-val">$350</div>
              <div className="donut-center-lbl">Total</div>
            </div>
          </div>
          <div className="legend" style={{ marginTop: "12px" }}>
            <div className="legend-item"><div className="legend-dot" style={{ background: "var(--violet)" }}></div><span className="legend-label">Essentials</span><span className="legend-val">40%</span></div>
            <div className="legend-item"><div className="legend-dot" style={{ background: "var(--green)" }}></div><span className="legend-label">Lifestyle</span><span className="legend-val">35%</span></div>
            <div className="legend-item"><div className="legend-dot" style={{ background: "var(--amber)" }}></div><span className="legend-label">Lab/Medical</span><span className="legend-val">25%</span></div>
          </div>
        </div>
      </div>

      {/* ROW 4: Goals + Investments + Schedule */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
        {/* Goals */}
        <div className="card">
          <div className="card-header">
            <span className="card-title"><i className="fa-solid fa-bullseye mr-1"></i> Goals</span>
            <span className="see-all" onClick={() => navigate('/goals')}>See all ›</span>
          </div>
          <div className="goals-list">
            {goals.map(g => {
              const pct = Math.min(Math.round((g.saved / g.target) * 100), 100);
              return (
                <div className="goal-row" key={g.id}>
                  <div className="goal-emoji"><i className={g.icon}></i></div>
                  <div style={{ flex: 1 }}>
                    <div className="goal-name">{g.name}</div>
                    <div className="goal-amounts">{fmt(g.saved)} / {fmt(g.target)}</div>
                  </div>
                  <div style={{ textAlign: "center", width: "60px" }}>
                    <div className="goal-bar"><div className="goal-fill" style={{ width: `${pct}%`, background: g.color }}></div></div>
                    <div className="goal-pct">{pct}%</div>
                  </div>
                  <div className="goal-deadline"><i className="fa-regular fa-calendar"></i> {g.deadline}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Investments / Portfolio */}
        <div className="card">
          <div className="card-header">
            <span className="card-title"><i className="fa-solid fa-chart-pie mr-1"></i> Investments</span>
            <span className="see-all">See all ›</span>
          </div>
          <div className="inv-list">
            {investments.map(inv => {
              const change = ((inv.current - inv.avgPrice) / inv.avgPrice * 100).toFixed(1);
              const isUp = Number(change) > 0;
              const val = inv.qty * inv.current;
              return (
                <div className="inv-row" key={inv.symbol}>
                  <div className="inv-icon" style={{ background: inv.color }}><i className={inv.logo}></i></div>
                  <div style={{ flex: 1 }}>
                    <div className="inv-name">{inv.symbol}</div>
                    <div className="inv-ticker">{inv.name}</div>
                  </div>
                  <div className={`inv-change ${isUp ? 'up' : 'down'}`}>{isUp ? '+' : ''}{change}%</div>
                  <div className="inv-val" style={{ color: isUp ? 'var(--green)' : 'var(--red)' }}>{fmt(val)}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wallet Schedule */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Insights Schedule</span>
            <div className="dots-btn">···</div>
          </div>
          <div className="schedule-list">
            {[
              { day: '15', mo: 'OCT', dot: 'var(--violet)', title: 'Spending Breakdown', sub: '70% Care, 20% Preventive' },
              { day: '20', mo: 'OCT', dot: 'var(--green)', title: 'Budget Review', sub: '60% On-budget, 40% Over' },
              { day: '25', mo: 'OCT', dot: 'var(--amber)', title: 'Expense Update', sub: 'Spent $1,390 of $1,600' },
              { day: '30', mo: 'OCT', dot: 'var(--red)', title: 'Monthly Summary', sub: 'Total Expenses: $2,890' },
              { day: '01', mo: 'NOV', dot: 'var(--cyan)', title: 'Nov 2025 Report', sub: 'Scheduled for Nov 1, 2025' },
            ].map((s, i) => (
              <div className="schedule-item" key={i}>
                <div className="sched-date">
                  <div className="sched-day">{s.day}</div>
                  <div className="sched-month">{s.mo}</div>
                </div>
                <div className="sched-dot" style={{ background: s.dot }}></div>
                <div>
                  <div className="sched-title">{s.title}</div>
                  <div className="sched-sub">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
            <span className="see-all" onClick={() => navigate('/reports')}>View All Schedules ›</span>
          </div>
        </div>
      </div>
    </div>
  );
}
