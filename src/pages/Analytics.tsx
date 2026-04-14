import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, AreaChart, Area, LineChart, Line,
} from "recharts";

const categoryData = [
  { name: "Food & Dining", value: 850, color: "#1565C0" },
  { name: "Shopping", value: 680, color: "#2E7D32" },
  { name: "Bills & Utilities", value: 1200, color: "#E65100" },
  { name: "Transportation", value: 420, color: "#C62828" },
  { name: "Entertainment", value: 320, color: "#7B1FA2" },
  { name: "Health", value: 50, color: "#00838F" },
];

const trendData = [
  { month: "Nov", income: 5600, expenses: 3400 },
  { month: "Dec", income: 5800, expenses: 3200 },
  { month: "Jan", income: 6000, expenses: 3800 },
  { month: "Feb", income: 5500, expenses: 3100 },
  { month: "Mar", income: 5900, expenses: 3500 },
  { month: "Apr", income: 6200, expenses: 3847 },
];

const netWorthData = [
  { month: "Nov", worth: 20100 },
  { month: "Dec", worth: 21500 },
  { month: "Jan", worth: 22200 },
  { month: "Feb", worth: 22800 },
  { month: "Mar", worth: 23600 },
  { month: "Apr", worth: 24580 },
];

const merchantData = [
  { merchant: "Whole Foods", total: 450, count: 8 },
  { merchant: "Amazon", total: 320, count: 5 },
  { merchant: "Uber", total: 280, count: 12 },
  { merchant: "Netflix", total: 16, count: 1 },
  { merchant: "Spotify", total: 10, count: 1 },
];

const tooltipStyle = { borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: 12 };

export default function Analytics() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Understand your spending patterns</p>
        </div>
        <Button variant="outline" size="sm">
          <i className="fa-solid fa-download h-4 w-4 mr-1" ></i> Export CSV
        </Button>
      </motion.div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="merchants">Merchants</TabsTrigger>
          <TabsTrigger value="report">Monthly Report</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <Card className="shadow-card border-border">
                <CardHeader className="pb-2"><CardTitle className="text-base">Income vs Expenses Trend</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                      <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="income" fill="#2E7D32" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expenses" fill="#C62828" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <Card className="shadow-card border-border">
                <CardHeader className="pb-2"><CardTitle className="text-base">Net Worth Over Time</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={netWorthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                      <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip contentStyle={tooltipStyle} />
                      <defs>
                        <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1565C0" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#1565C0" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="worth" stroke="#1565C0" fill="url(#netWorthGradient)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="mt-4">
          <Card className="shadow-card border-border">
            <CardHeader><CardTitle className="text-base">Spending by Category — April 2026</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <ResponsiveContainer width={240} height={240}>
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                      {categoryData.map((e) => <Cell key={e.name} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-3 w-full">
                  {categoryData.map((c) => {
                    const total = categoryData.reduce((a, b) => a + b.value, 0);
                    const pct = Math.round((c.value / total) * 100);
                    return (
                      <div key={c.name} className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                        <span className="text-sm flex-1">{c.name}</span>
                        <span className="text-sm font-medium">${c.value}</span>
                        <span className="text-xs text-muted-foreground w-10 text-right">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="merchants" className="mt-4">
          <Card className="shadow-card border-border">
            <CardHeader><CardTitle className="text-base">Top Merchants by Spend</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {merchantData.map((m, i) => (
                  <motion.div
                    key={m.merchant}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/30 transition-colors"
                  >
                    <span className="text-sm font-medium w-8 text-muted-foreground">#{i + 1}</span>
                    <span className="flex-1 font-medium text-sm">{m.merchant}</span>
                    <span className="text-xs text-muted-foreground">{m.count} txns</span>
                    <span className="font-semibold text-sm">${m.total}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="report" className="mt-4">
          <Card className="shadow-card border-border">
            <CardHeader><CardTitle className="text-base">Monthly Report — April 2026</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total Income", value: "$6,200", color: "text-success" },
                  { label: "Total Expenses", value: "$3,847", color: "text-destructive" },
                  { label: "Net Savings", value: "$2,353", color: "text-primary" },
                  { label: "Savings Rate", value: "38%", color: "text-primary" },
                ].map((s) => (
                  <div key={s.label} className="text-center p-4 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                    <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3 text-sm">
                <p className="text-muted-foreground">📊 Top spending category: <strong className="text-foreground">Bills & Utilities</strong> ($1,200)</p>
                <p className="text-muted-foreground">🏆 Biggest single expense: <strong className="text-foreground">Electric Bill</strong> ($120)</p>
                <p className="text-muted-foreground">📈 Net worth grew by <strong className="text-success">+$980</strong> this month</p>
                <p className="text-muted-foreground">⚠️ Shopping budget exceeded by <strong className="text-destructive">$80</strong></p>
              </div>
              <Button className="mt-6 finflow-gradient text-primary-foreground">
                <i className="fa-solid fa-download h-4 w-4 mr-1" ></i> Export PDF Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
