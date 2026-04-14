import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Progress } from "@/components/ui/progress";

const budgets = [
  { category: "Food & Dining", icon: "🍔", spent: 850, limit: 1000 },
  { category: "Shopping", icon: "🛍️", spent: 680, limit: 600 },
  { category: "Transportation", icon: "🚗", spent: 420, limit: 500 },
  { category: "Entertainment", icon: "🎬", spent: 320, limit: 400 },
  { category: "Bills & Utilities", icon: "💡", spent: 1200, limit: 1500 },
  { category: "Health & Fitness", icon: "💪", spent: 50, limit: 200 },
  { category: "Education", icon: "📚", spent: 0, limit: 300 },
];

const totalBudget = budgets.reduce((a, b) => a + b.limit, 0);
const totalSpent = budgets.reduce((a, b) => a + b.spent, 0);

export default function Budgets() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Budgets</h1>
          <p className="text-muted-foreground">April 2026 • ${totalSpent.toLocaleString()} of ${totalBudget.toLocaleString()}</p>
        </div>
        <Button className="finflow-gradient text-primary-foreground">
          <i className="fa-solid fa-plus h-4 w-4 mr-1" ></i> Add Budget
        </Button>
      </motion.div>

      {/* Over budget alert */}
      {budgets.some(b => b.spent > b.limit) && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="border-destructive/30 bg-destructive/5 shadow-card">
            <CardContent className="p-4 flex items-center gap-3">
              <i className="fa-solid fa-triangle-exclamation h-5 w-5 text-destructive flex-shrink-0" ></i>
              <div>
                <p className="font-medium text-sm">Budget Alert</p>
                <p className="text-xs text-muted-foreground">Shopping is over budget by ${(680 - 600).toFixed(2)}</p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto flex-shrink-0 border-destructive/30 text-destructive">
                Adjust
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.map((b, i) => {
          const pct = Math.round((b.spent / b.limit) * 100);
          const remaining = b.limit - b.spent;
          const statusColor = pct >= 100 ? "text-destructive" : pct >= 80 ? "text-warning" : "text-success";
          const barColor = pct >= 100 ? "bg-destructive" : pct >= 80 ? "bg-warning" : "bg-success";

          return (
            <motion.div
              key={b.category}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-300 border-border cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-xl">{b.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{b.category}</p>
                      <p className={`text-xs font-medium ${statusColor}`}>
                        {pct >= 100 ? `Over by $${Math.abs(remaining).toFixed(0)}` : `$${remaining.toFixed(0)} remaining`}
                      </p>
                    </div>
                    <span className={`text-lg font-bold ${statusColor}`}>{pct}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(pct, 100)}%` }}
                      transition={{ delay: 0.3 + i * 0.06, duration: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full ${barColor}`}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>${b.spent.toLocaleString()} spent</span>
                    <span>${b.limit.toLocaleString()} limit</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
