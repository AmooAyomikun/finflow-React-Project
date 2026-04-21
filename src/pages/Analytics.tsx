import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  BarChart, Bar, Cell, PieChart, Pie
} from "recharts";
import { CATEGORY_META } from "@/lib/data";
import { Download, TrendingUp, LayoutGrid, PieChart as PieIcon, List } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" as const },
});

const fmt = (n: number) => '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits:2 });

export default function Analytics() {
  const { transactions: txs } = useAppStore();
  
  const categorySummary = Object.keys(CATEGORY_META).map(cat => {
    const amount = txs.filter(t => t.type === 'expense' && t.category === cat).reduce((s, t) => s + t.amount, 0);
    return { 
      name: CATEGORY_META[cat as keyof typeof CATEGORY_META].label, 
      value: amount, 
      color: CATEGORY_META[cat as keyof typeof CATEGORY_META].color,
      icon: CATEGORY_META[cat as keyof typeof CATEGORY_META].icon
    };
  }).filter(c => c.value > 0).sort((a,b) => b.value - a.value);

  const trendData = [
    { month: 'Feb', income: 4500, expenses: 3200 },
    { month: 'Mar', income: 5200, expenses: 3800 },
    { month: 'Apr', income: 4800, expenses: 4100 },
    { month: 'May', income: 6100, expenses: 3900 },
    { month: 'Jun', income: 5500, expenses: 4200 },
    { month: 'Jul', income: 5800, expenses: 3804 },
  ];

  return (
    <div className="page active fade-in" id="page-analytics">
      <div className="page-header">
        <div>
          <h1>Analytics</h1>
          <div className="page-header-sub">Deep dive into your spending habits and trends</div>
        </div>
        <button className="topbar-btn">
          <Download className="h-4 w-4 mr-2 inline" /> Export Report
        </button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '4px', height: '48px', borderRadius: '12px', marginBottom: '32px' }}>
          <TabsTrigger value="overview" style={{ borderRadius: '8px', padding: '0 24px', fontWeight: 700 }} className="data-[state=active]:bg-[#1565C0] data-[state=active]:text-white">
            <LayoutGrid className="h-4 w-4 mr-2" /> Overview
          </TabsTrigger>
          <TabsTrigger value="categories" style={{ borderRadius: '8px', padding: '0 24px', fontWeight: 700 }} className="data-[state=active]:bg-[#1565C0] data-[state=active]:text-white">
            <PieIcon className="h-4 w-4 mr-2" /> Categories
          </TabsTrigger>
          <TabsTrigger value="merchants" style={{ borderRadius: '8px', padding: '0 24px', fontWeight: 700 }} className="data-[state=active]:bg-[#1565C0] data-[state=active]:text-white">
            <List className="h-4 w-4 mr-2" /> Merchants
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <motion.div className="lg:col-span-2" {...fadeUp(0)}>
                <div className="card" style={{ height: '100%', padding: '24px' }}>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px' }}>Income vs Expenses Trend</p>
                    <div style={{ height: '350px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={trendData}>
                              <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
                              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--text3)', fontSize: 12, fontWeight: 600 }} dy={10} />
                              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text3)', fontSize: 12, fontWeight: 600 }} tickFormatter={(v) => `$${v}`} />
                              <Tooltip 
                                cursor={{ fill: 'var(--bg)' }}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(15,23,41,0.1)', padding: '12px' }}
                                itemStyle={{ fontWeight: 800 }}
                              />
                              <Bar dataKey="income" fill="var(--green)" radius={[6, 6, 0, 0]} barSize={24} />
                              <Bar dataKey="expenses" fill="var(--red)" radius={[6, 6, 0, 0]} barSize={24} />
                           </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
             </motion.div>

             <motion.div {...fadeUp(1)}>
                <div className="card" style={{ height: '100%', padding: '24px', background: 'linear-gradient(to bottom right, var(--violet), #0D47A1)', color: 'white' }}>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px' }}>Financial Health</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                       <div>
                          <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Net Cash Flow</p>
                          <h3 style={{ fontSize: '36px', fontWeight: 800, margin: 0, lineHeight: 1 }}>+ {fmt(1400)}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 700, marginTop: '8px', color: '#10D67E' }}>
                             <TrendingUp className="h-4 w-4" /> <span>+24% vs last month</span>
                          </div>
                       </div>
                       
                       <div>
                          <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Savings Rate</p>
                          <div style={{ display: 'flex', alignItems: 'end', gap: '8px' }}>
                             <h3 style={{ fontSize: '36px', fontWeight: 800, margin: 0, lineHeight: 1 }}>28%</h3>
                             <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 600, paddingBottom: '4px' }}>of income</span>
                          </div>
                       </div>

                       <div style={{ padding: '16px', background: 'rgba(255,255,255,0.1)', borderRadius: '16px' }}>
                          <p style={{ fontSize: '13px', fontWeight: 600, color: 'white', margin: 0 }}>You're in the top 15% of savers in your income bracket.</p>
                       </div>
                    </div>
                </div>
             </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <motion.div {...fadeUp(2)}>
                <div className="card" style={{ padding: '24px', height: '100%' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                       <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>Spending by Category</p>
                       <button className="topbar-btn" style={{ height: '32px' }}>View Details</button>
                   </div>
                   <div style={{ height: '280px', width: '100%' }}>
                      <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                            <Pie
                               data={categorySummary}
                               cx="50%"
                               cy="50%"
                               innerRadius={80}
                               outerRadius={110}
                               paddingAngle={5}
                               dataKey="value"
                               stroke="none"
                            >
                               {categorySummary.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={entry.color} />
                               ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(15,23,41,0.1)', padding: '12px' }}
                              itemStyle={{ fontWeight: 800 }}
                              formatter={(value: number) => fmt(value)}
                            />
                         </PieChart>
                      </ResponsiveContainer>
                   </div>
                </div>
             </motion.div>

             <motion.div {...fadeUp(3)}>
                <div className="card" style={{ padding: '24px', height: '100%' }}>
                   <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px' }}>Top Categories Breakdown</p>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      {categorySummary.slice(0, 5).map((cat, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                           <div style={{ height: '48px', width: '48px', borderRadius: '12px', background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <i className={`${cat.icon} text-[20px]`} style={{ color: cat.color }} />
                           </div>
                           <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                 <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text)' }}>{cat.name}</span>
                                 <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text)' }}>{fmt(cat.value)}</span>
                              </div>
                              <div style={{ height: '6px', borderRadius: '3px', background: 'var(--bg)', overflow: 'hidden' }}>
                                 <div 
                                    style={{ height: '100%', borderRadius: '3px', backgroundColor: cat.color, width: `${(cat.value / categorySummary[0].value) * 100}%` }}
                                 />
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
