import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const transactions = [
  { id: 1, merchant: "Whole Foods", category: "Food & Dining", account: "Chase Checking", amount: -64.32, date: "2026-04-11", icon: "🛒", type: "expense" },
  { id: 2, merchant: "Uber", category: "Transportation", account: "Chase Checking", amount: -18.50, date: "2026-04-11", icon: "🚗", type: "expense" },
  { id: 3, merchant: "Netflix", category: "Entertainment", amount: -15.99, account: "Credit Card", date: "2026-04-10", icon: "🎬", type: "expense" },
  { id: 4, merchant: "Salary - Acme Corp", category: "Salary", account: "Chase Checking", amount: 6200.00, date: "2026-04-01", icon: "💰", type: "income" },
  { id: 5, merchant: "Amazon", category: "Shopping", account: "Credit Card", amount: -89.99, date: "2026-03-30", icon: "📦", type: "expense" },
  { id: 6, merchant: "Gym Membership", category: "Health", account: "Chase Checking", amount: -49.99, date: "2026-03-28", icon: "💪", type: "expense" },
  { id: 7, merchant: "Freelance Project", category: "Freelance", account: "Savings", amount: 1500.00, date: "2026-03-25", icon: "💻", type: "income" },
  { id: 8, merchant: "Electric Bill", category: "Bills & Utilities", account: "Chase Checking", amount: -120.00, date: "2026-03-22", icon: "⚡", type: "expense" },
  { id: 9, merchant: "Spotify", category: "Entertainment", account: "Credit Card", amount: -9.99, date: "2026-03-20", icon: "🎵", type: "expense" },
  { id: 10, merchant: "Gas Station", category: "Transportation", account: "Chase Checking", amount: -45.00, date: "2026-03-18", icon: "⛽", type: "expense" },
];

export default function Transactions() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">Transactions</h1>
        <p className="text-muted-foreground">View and manage all your transactions</p>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <Card className="p-4 shadow-card border-border">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" ></i>
              <Input placeholder="Search transactions..." className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="food">Food & Dining</SelectItem>
                <SelectItem value="transport">Transportation</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="bills">Bills & Utilities</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-32"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="flex-shrink-0">
              <i className="fa-solid fa-download h-4 w-4" ></i>
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Transaction List */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Card className="shadow-card border-border overflow-hidden">
          <div className="divide-y divide-border">
            {transactions.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className="flex items-center gap-3 p-4 hover:bg-secondary/30 transition-colors cursor-pointer"
              >
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-lg flex-shrink-0">{t.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{t.merchant}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="secondary" className="text-xs font-normal">{t.category}</Badge>
                    <span className="text-xs text-muted-foreground">{t.account}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`font-semibold text-sm ${t.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                    {t.amount > 0 ? '+' : ''}{t.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
