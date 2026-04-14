import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
});

const spendingData = [
  { name: "Food & Dining", value: 850, color: "#1565C0" },
  { name: "Transportation", value: 420, color: "#2E7D32" },
  { name: "Shopping", value: 680, color: "#E65100" },
  { name: "Bills", value: 1200, color: "#C62828" },
  { name: "Entertainment", value: 320, color: "#7B1FA2" },
  { name: "Other", value: 377, color: "#00838F" },
];

const monthlyData = [
  { month: "Jul", income: 5800, expenses: 3200 },
  { month: "Aug", income: 6000, expenses: 3800 },
  { month: "Sep", income: 5500, expenses: 3100 },
  { month: "Oct", income: 6200, expenses: 4100 },
  { month: "Nov", income: 5900, expenses: 3500 },
  { month: "Dec", income: 6200, expenses: 3847 },
];

const budgets = [
  { category: "Food & Dining", spent: 850, limit: 1000 },
  { category: "Shopping", spent: 680, limit: 600 },
  { category: "Transportation", spent: 420, limit: 500 },
  { category: "Entertainment", spent: 320, limit: 400 },
  { category: "Bills & Utilities", spent: 1200, limit: 1500 },
];

const recentTransactions = [
  { merchant: "Whole Foods", category: "Food & Dining", amount: -64.32, date: "Today", icon: "🛒" },
  { merchant: "Uber", category: "Transportation", amount: -18.50, date: "Today", icon: "🚗" },
  { merchant: "Netflix", category: "Entertainment", amount: -15.99, date: "Yesterday", icon: "🎬" },
  { merchant: "Salary - Acme Corp", category: "Salary", amount: 6200.00, date: "Apr 1", icon: "💰" },
  { merchant: "Amazon", category: "Shopping", amount: -89.99, date: "Mar 30", icon: "📦" },
  { merchant: "Gym Membership", category: "Health", amount: -49.99, date: "Mar 28", icon: "💪" },
];

const goals = [
  { name: "Emergency Fund", target: 10000, saved: 6500, icon: "🛡️", color: "#1565C0" },
  { name: "New Laptop", target: 2000, saved: 1400, icon: "💻", color: "#2E7D32" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.div {...fadeUp(0)}>
        <h1 className="text-2xl md:text-3xl font-bold">Good morning! 👋</h1>
        <p className="text-muted-foreground">Here's your financial overview for April 2026</p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: "Net Worth", value: "$24,580", change: "+3.2%", up: true, icon: "fa-solid fa-wallet" },
          { title: "Income (Apr)", value: "$6,200", change: "+5.1%", up: true, icon: "fa-solid fa-arrow-trend-up" },
          { title: "Expenses (Apr)", value: "$3,847", change: "-2.4%", up: false, icon: "fa-solid fa-arrow-trend-down" },
        ].map((stat, i) => (
          <motion.div key={stat.title} {...fadeUp(i + 1)}>
            <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-300 border-border">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">{stat.title}</span>
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${stat.up ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                    <i className={`${stat.icon} h-4 w-4`} />
                  </div>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${stat.up ? 'text-success' : 'text-destructive'}`}>
                  {stat.up ? <i className="fa-solid fa-arrow-up-right-dots h-3 w-3" ></i> : <i className="fa-solid fa-arrow-down h-3 w-3" ></i>}
                  {stat.change} vs last month
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Income vs Expenses */}
        <motion.div {...fadeUp(4)}>
          <Card className="shadow-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Income vs Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlyData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}
                  />
                  <Bar dataKey="income" fill="#2E7D32" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="#C62828" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Spending Donut */}
        <motion.div {...fadeUp(5)}>
          <Card className="shadow-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie data={spendingData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                      {spendingData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-2">
                  {spendingData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="font-medium">${item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Budget + Transactions + Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Budgets */}
        <motion.div {...fadeUp(6)}>
          <Card className="shadow-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Budget Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {budgets.map((b) => {
                const pct = Math.round((b.spent / b.limit) * 100);
                const status = pct >= 100 ? "bg-destructive" : pct >= 80 ? "bg-warning" : "bg-success";
                return (
                  <div key={b.category}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{b.category}</span>
                      <span className="font-medium">${b.spent} / ${b.limit}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(pct, 100)}%` }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                        className={`h-full rounded-full ${status}`}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div {...fadeUp(7)}>
          <Card className="shadow-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((t, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-sm">{t.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{t.merchant}</p>
                      <p className="text-xs text-muted-foreground">{t.date}</p>
                    </div>
                    <span className={`text-sm font-semibold ${t.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                      {t.amount > 0 ? '+' : ''}{t.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Goals */}
        <motion.div {...fadeUp(8)}>
          <Card className="shadow-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Savings Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {goals.map((g) => {
                const pct = Math.round((g.saved / g.target) * 100);
                return (
                  <div key={g.name} className="p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{g.icon}</span>
                      <span className="font-medium text-sm">{g.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">{pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: g.color }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">${g.saved.toLocaleString()} of ${g.target.toLocaleString()}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
